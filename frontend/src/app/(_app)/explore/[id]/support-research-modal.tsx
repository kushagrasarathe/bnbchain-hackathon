"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { erc20Abi, parseEther } from "viem";

interface SupportResearchModalProps {
  ResearcherAddress: `0x${string}`;
}

export default function SupportResearchModal({
  ResearcherAddress,
}: SupportResearchModalProps) {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  );

  const donate = async () => {
    try {
      if (!publicClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        return;
      }
      if (!walletClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        return;
      }
      if (!donationAmount || !ResearcherAddress || !tokenAddress) {
        console.log("Inputs missing ");
        return;
      }

      if (
        tokenAddress &&
        tokenAddress !== "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      ) {
        const data = await publicClient.simulateContract({
          account,
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "transfer",
          args: [ResearcherAddress, parseEther(donationAmount.toString())],
        });

        const tx = await walletClient.writeContract(data.request);
        console.log("Transaction Sent");
        const transaction = await publicClient.waitForTransactionReceipt({
          hash: tx,
        });
        console.log(transaction);
        console.log(data.result);
        // setIsLoading(false);
        return {
          transaction,
          data,
        };
      } else if (
        tokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      ) {
        const tx = await walletClient.sendTransaction({
          account,
          to: ResearcherAddress,
          value: parseEther(donationAmount.toString()),
        });

        console.log("Transaction Sent");
        const transaction = await publicClient.waitForTransactionReceipt({
          hash: tx,
        });

        console.log(transaction);
        // setIsLoading(false);
        return {
          transaction,
        };
      } else {
        console.log("Invalid Token Address");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"default"}
          type="button"
          className="rounded-none text-base py-3 px-4 w-full  bg-[#c4fd49] hover:bg-[#c4fd49]/90  text-black "
        >
          Donate
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader className="">
          <DialogTitle>Supprt Science</DialogTitle>
          <DialogDescription>
            Your donation will go directly to a researchers account and will
            support their work.
          </DialogDescription>

          <div className="space-y-5 pt-5">
            <Label className=" block space-y-2">
              <div>Donation Amount</div>
              <Input
                type="text"
                placeholder="e.g. $50"
                value={donationAmount || ""}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="bg-[#f4f3f0] rounded-none w-full"
              />
            </Label>
            <Button
              size={"sm"}
              variant={"default"}
              type="button"
              className="rounded-none text-base py-3 px-4 w-full "
              onClick={() => donate()}
            >
              Donate
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
