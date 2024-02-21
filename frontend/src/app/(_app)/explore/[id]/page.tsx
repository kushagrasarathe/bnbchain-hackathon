"use react";

import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import React, { useEffect, useState } from "react";
import { erc20Abi, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function ResearchPage({ params }: { params: { id: string } }) {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [research, setResearch] = useState<{
    Id: bigint;
    Title: any;
    Description: any;
    Content: any;
    Publisher: `0x${string}`;
    DoP: string;
  }>();

  // fetched the member.json
  const fetchIPFS = async (metadataURI: string) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `https://ipfs.io/ipfs/${metadataURI}/research.json`;
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // fetch the data from the contract and then fetched the same from IPFS
  // returns an object that is then stored in the Array of request
  const fetchRequests = async (_id: bigint) => {
    try {
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
        Title: response.Name,
        Description: response.Description,
        Content: response.Content,
        Publisher: request.researcher,
        DoP: _date,
      };
      console.log(parsedRequest);
      setResearch(parsedRequest);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id && !research) {
      fetchRequests(BigInt(params.id));
    }
  }, [params.id]);

  return (
    <div>
      <h1 className=" text-4xl font-semibold">Research Title Here</h1>
    </div>
  );
}
