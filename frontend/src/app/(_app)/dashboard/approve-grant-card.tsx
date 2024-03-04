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
  title: string;
  desc: string;
  amount: number;
}
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { Grants_ABI, Grants_Contract_Address } from "@/constants/constants";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

export default function ApproveGrantCard({ id, title, desc, amount }: Props) {
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
        toast.dismiss();
        toast.error("No Wallet Detected");
        return;
      }

      toast.loading("Processing Transaction , for voting on grant request ...");
      let vote = _vote ? 0 : 1;
      const data = await publicClient.simulateContract({
        account,
        address: Grants_Contract_Address,
        abi: Grants_ABI,
        functionName: "vote",
        args: [vote, id],
      });

      if (!walletClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        setIsLoading(false);
        toast.dismiss();
        toast.error("No Wallet Detected");
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
      toast.dismiss();
      toast.success(`Vote added in the contract for Grant Request`);
      return {
        transaction,
        data,
      };
    } catch (error) {
      setIsLoading(false);
      toast.dismiss();
      toast.error(`Error occured : ${error}`);
      console.log(error);
    }
  };
  return (
    <Card className="p-5 max-w-md rounded-none border border-neutral-700 shadow-[4px_4px_0px_0px] space-y-3 ">
      <div className="flex items-center justify-between">
        <div className=" text-xl font-semibold">{title}</div>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="line-clamp-3 text-start">{desc}</div>
            </TooltipTrigger>
            <TooltipContent className=" max-w-md p-4" side="bottom">
              <div className="text-start">{desc}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        Grant Requested: <span className="font-semibold">$ {amount}</span>
      </div>
      <div className="flex items-center justify-between *:w-full gap-3 pt-1">
        <Button
          disabled={isLoading}
          onClick={() => vote(id, true)}
          variant={"default"}
        >
          {isLoading ? <Loader /> : "Approve"}
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => vote(id, false)}
          variant={"destructive"}
        >
          {isLoading ? <Loader /> : "Deny"}
        </Button>
      </div>
    </Card>
  );
}
