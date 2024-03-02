"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApproveEntryCard from "./approve-entry-card";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";

export interface Entry {
  id: bigint;
  cid: string;
  Name: string;
  About: string;
  FieldofReseasrch: string;
  Institution: string;
  SocialMedia: string;
  ResearchInterests: string;
}
import ApproveGrantCard from "./approve-grant-card";
import ApplyGrantModal from "./apply-grant-modal";

export default function DashboardTabs() {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [entries, setEntries] = useState<(Entry | undefined)[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // fetched the member.json
  const fetchIPFS = async (metadataURI: string) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `https://orange-autonomous-clownfish-654.mypinata.cloud/ipfs/${metadataURI}`;
      const response = await fetch(URL);
      // console.log(response);
      const data = await response.json();
      // console.log(await data);
      return await data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // fetch the data from the contract and then fetched the same from IPFS
  // returns an object that is then stored in the Array of request
  const fetchEntry = async (_id: bigint) => {
    try {
      // filter the request from the contract on the basis of the voting time if closed then don't show

      const request = await publicClient?.readContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "getRequest",
        args: [_id],
      });
      if (!request) {
        console.log("No request found");
        return;
      }
      console.log(request);
      const response = await fetchIPFS(request.ipfsURI);
      const parsedRequest = {
        id: _id,
        cid: request.ipfsURI,
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
  const getEntries = async () => {
    try {
      // setLoading(true);
      // setMessage("Fetching data...");
      setIsLoading(true);
      console.log("starting ...");

      const data = await publicClient?.readContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "counterRequestList",
      });

      const total = Number(data);
      const promises = [];
      console.log(total);
      for (let id = 0; id < total; id++) {
        const requestsPromise = fetchEntry(BigInt(id));
        promises.push(requestsPromise);
      }
      const _entries = await Promise.all(promises);
      console.log(_entries);
      console.log("ending...");
      /// set the array of the objects of the requests is stored and can be rendered then
      setEntries(_entries);
      // setLoading(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (!entries && !isLoading) {
      getEntries();
    }
  }, []);

  return (
    <div>
      <Tabs defaultValue="voting" className="">
        <TabsList className="mt-10 *:px-5 *:-mx-1 *:w-full flex items-center justify-between border border-black rounded-none">
          <TabsTrigger value="voting">Join Proposals</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
        </TabsList>
        <div className="py-8 p-8 bg-white rounded-none border border-t-0 border-neutral-700 mx-1">
          <TabsContent value="voting" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300">
              <div className=" text-2xl font-semibold ">
                Vote DAO Joining Proposals
              </div>
            </div>
            <div className=" grid grid-cols-12 md:*:col-span-6 col-span-12 gap-10">
              {entries &&
                entries?.map((entry) => {
                  return (
                    <ApproveEntryCard
                      id={entry?.id ? entry.id : BigInt(0)}
                      name={entry?.Name ? entry.Name : "N/A"}
                      about={entry?.About ? entry.About : "N/A"}
                      fieldOfResearch={
                        entry?.FieldofReseasrch ? entry.FieldofReseasrch : "N/A"
                      }
                    />
                  );
                })}
            </div>
          </TabsContent>
          <TabsContent value="grants" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300 flex items-center justify-between">
              <div className=" text-2xl font-semibold ">
                Vote Grant Proposals
              </div>
              <ApplyGrantModal />
            </div>
            <ApproveGrantCard
              title="Proposed Research Title Here"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas."
              amount={876238}
            />
          </TabsContent>
          {/* <TabsContent value="yourResearches" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300">
              <div className=" text-2xl font-semibold ">Your Researches</div>
            </div>
          </TabsContent> */}
        </div>
      </Tabs>
    </div>
  );
}
