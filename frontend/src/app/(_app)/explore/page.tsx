"use client";
import sample from "@/assets/sample.jpeg";
import Image from "next/image";
import ResearchCard from "./research-card";
import Link from "next/link";

import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import React, { useEffect, useState } from "react";
import { erc20Abi, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import Contribute from "./Contribute.1";
import Loading from "@/components/loader";

export default function ExplorePage() {
  const { address: account, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [researches, setResearches] = useState<({} | undefined)[]>();

  // fetched the member.json
  const fetchIPFS = async (metadataURI: string) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `https://orange-autonomous-clownfish-654.mypinata.cloud/ipfs/${metadataURI}`;
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // fetch the data from the contract and then fetched the same from IPFS
  // returns an object that is then stored in the Array of request
  const fetchRequests = async (_id: bigint) => {
    try {
      const request = await publicClient?.readContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "getResearch",
        args: [_id],
      });
      if (!request) {
        console.log("No request found");
        return;
      }
      console.log(request.researchPaperURI);
      const response = await fetchIPFS(request.researchPaperURI);
      const parsedRequest = {
        id: _id,
        cid: request.researchPaperURI,
        ...response,
      };
      console.log(parsedRequest);
      return parsedRequest;
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  // fetches the no. of requests , then fetches the each request and store the result in the array of requests
  const get = async () => {
    try {
      // setLoading(true);
      // setMessage("Fetching data...");
      setIsLoading(true);
      console.log("starting ...");

      const data = await publicClient?.readContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "counterResearches",
      });

      const total = Number(data);
      const promises = [];
      console.log(total);
      for (let id = 0; id < total; id++) {
        const requestsPromise = fetchRequests(BigInt(id));
        promises.push(requestsPromise);
      }
      const _researches = await Promise.all(promises);
      console.log(_researches);
      console.log("ending...");
      /// set the array of the objects of the requests is stored and can be rendered then
      setResearches(_researches);
      // setLoading(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (!researches && !isLoading) {
      get();
    }
  }, []);
  // fetch the researches

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-5 py-6">
      <div className="flex items-center justify-between">
        <h1 className=" text-2xl font-semibold">Read published researches</h1>
        <Contribute />
      </div>
      {/* <div className="flex relative hadow-[8px_8px_0px_0px] order-2 border-black">
        <div className="absolute p-10 bg-[#f9f7f2]/40 backdrop-blur-xl h-full w-3/5 clip2">
          <h1 className=" text-2xl font-semibold">Featured Research</h1>
        </div>
        <div className="">
          <Image
            src={sample}
            alt="featured"
            className="max-h-80 object-cover"
          />
        </div>
      </div> */}
      <div className="grid grid-cols-12 [&>*]:col-span-12 md:[&>*]:col-span-6 gap-10">
        {researches &&
          researches.map((research, idx) => {
            return (
              <ResearchCard
                key={idx}
                // @ts-ignore
                id={research.id}
                // @ts-ignore
                title={research.title}
                // @ts-ignore
                description={research.abstract}
              />
            );
          })}
        {/* <ResearchCard
          id={2332}
          title="Title Here"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          necessitatibus eum aut fuga veniam. A quia ab vitae officia alias
          tempora optio labore dignissimos aliquam voluptas. Numquam molestias
          corporis a."
        /> */}
      </div>
    </div>
  );
}
