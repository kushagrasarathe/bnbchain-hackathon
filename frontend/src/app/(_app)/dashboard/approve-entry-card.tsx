"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  id: bigint;
  name: string;
  about: string;
  fieldOfResearch: string;
}
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";

export default function ApproveEntryCard({
  id,
  name,
  about,
  fieldOfResearch,
}: Props) {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const vote = async (id: bigint, _vote: boolean) => {
    try {
      setIsLoading(true);
      if (!publicClient) {
        console.log("No Wallet Detected");
        setIsLoading(false);
        return;
      }
      let vote = _vote ? 0 : 1;
      const data = await publicClient.simulateContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "vote",
        args: [vote, id],
      });

      if (!walletClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        setIsLoading(false);
        return;
      }

      const tx = await walletClient.writeContract(data.request);
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: tx,
      });
      console.log(transaction);
      console.log(data.result);
      setIsLoading(false);
      return {
        transaction,
        data,
      };
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };
  return (
    <Card className="p-5 md:max-w-xl rounded-none border border-neutral-700 shadow-[4px_4px_0px_0px] space-y-3 ">
      <div className="flex items-center justify-between">
        <div className=" text-xl font-semibold">{name}</div>
        <Badge variant={"outline"} className="bg-[#cdfb68] px-3 py-0.5">
          {fieldOfResearch}
        </Badge>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="line-clamp-3 text-start">{about}</div>
            </TooltipTrigger>
            <TooltipContent className=" max-w-md p-4" side="bottom">
              <div className="text-start">{about}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center justify-between *:w-full gap-3 pt-1">
        <Button onClick={() => vote(id, true)} variant={"default"}>
          Approve
        </Button>
        <Button onClick={() => vote(id, false)} variant={"destructive"}>
          Deny
        </Button>
      </div>
    </Card>
  );
}
