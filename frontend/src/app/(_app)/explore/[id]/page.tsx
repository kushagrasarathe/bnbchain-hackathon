"use client";

import React, { useEffect, useState } from "react";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import { erc20Abi, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function ResearchPage({ params }: { params: { id: string } }) {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [research, setResearch] = useState<{}>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // fetched the member.json
  const fetchIPFS = async (metadataURI: string) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `https://orange-autonomous-clownfish-654.mypinata.cloud/ipfs/${metadataURI}`;
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  // fetch the data from the contract and then fetched the same from IPFS
  // returns an object that is then stored in the Array of request
  const fetchRequests = async (_id: bigint) => {
    try {
      setIsLoading(true);
      console.log(_id);
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
      console.log(request);
      console.log(request.researchPaperURI);
      const _date = new Date(
        Number(request.dateOfPublication)
      ).toLocaleString();
      console.log(_date);
      const response = await fetchIPFS(request.researchPaperURI);
      console.log(response);
      const parsedRequest = {
        Id: _id,
        // Title: response.Name,
        // Description: response.Description,
        // Content: response.Content,
        // Publisher: request.researcher,
        // DoP: _date,
        CID: request.researchPaperURI,
        ...response,
      };
      console.log(parsedRequest);
      setResearch(parsedRequest);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id && !research && !isLoading) {
      fetchRequests(BigInt(params.id));
    }
  }, [params.id]);

  return (
    <div>
      <h1 className=" text-4xl font-semibold">{research && research.title}</h1>
    </div>
  );
}
