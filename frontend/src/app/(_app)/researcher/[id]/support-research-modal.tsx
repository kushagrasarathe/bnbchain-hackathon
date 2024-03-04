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
import { toast } from "sonner";
import { Loader } from "@/components/loader";

interface SupportResearchModalProps {
  ResearcherAddress: `0x${string}`;
}

export default function SupportResearchModal({
  ResearcherAddress,
}: SupportResearchModalProps) {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  );

  const donate = async () => {
    try {
      setIsLoading(true);

      if (!publicClient) {
        setIsLoading(false);
        console.log("No Wallet Detected");
        toast.error("No Wallet Detected");
        return;
      }
      if (!walletClient) {
        setIsLoading(false);
        console.log("No Wallet Detected");
        toast.error("No Wallet Detected");
        return;
      }
      if (!donationAmount || !ResearcherAddress || !tokenAddress) {
        setIsLoading(false);
        toast.error("No Wallet Detected");
        console.log("Inputs missing ");
        return;
      }
      toast.loading("Executing contribution Transaction ...");

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
        setIsLoading(false);

        toast.dismiss();
        toast.success(
          `Contribution comlpeted for ${donationAmount} Tokens to the Fund contract`
        );
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
        setIsLoading(false);

        toast.dismiss();
        toast.success(
          `Contribution comlpeted for ${donationAmount} Tokens to the Fund contract`
        );
        return {
          transaction,
        };
      } else {
        setIsLoading(false);
        toast.dismiss();
        toast.error(`Invalid token address , Select a Token`);
        console.log("Invalid Token Address");
      }
    } catch (error) {
      setIsLoading(false);
      toast.dismiss();
      toast.error("Error Occured");
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
              disabled={isLoading}
              type="button"
              className="rounded-none text-base py-3 px-4 w-full "
              onClick={() => donate()}
            >
              {isLoading ? <Loader /> : "Donate"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
