"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { erc20Abi, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
interface ContributeForm {
  amount: number;
}
import {
  ContributorNFT_ABI,
  ContributorNFT_Contract_Address,
  DAOFunds_Contract_Address,
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

export default function Contribute() {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>();
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  );

  const contribute = async () => {
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
      if (!amount || !tokenAddress) {
        setIsLoading(false);
        console.log("Inputs missing ");
        toast.error("Inputs missing");
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
          args: [DAOFunds_Contract_Address, parseEther(amount.toString())],
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
          `Contribution comlpeted for ${amount} Tokens to the Fund contract`
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
          to: DAOFunds_Contract_Address,
          value: parseEther(amount.toString()),
        });

        console.log("Transaction Sent");
        const transaction = await publicClient.waitForTransactionReceipt({
          hash: tx,
        });

        console.log(transaction);
        setIsLoading(false);
        toast.dismiss();
        toast.success(
          `Contribution comlpeted for ${amount} Tokens to the Fund contract`
        );

        return {
          transaction,
        };
      } else {
        toast.dismiss();
        toast.error(`Invalid token address , Select a Token`);
        console.log("Invalid Token Address");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.dismiss();
      toast.error("Error Occured");
      console.log(error);
    }
  };

  const mintContributorNFT = async () => {
    try {
      if (!account) {
        console.log("No Account Detected ,Connect Wallet !!");
        return;
      }
      if (!publicClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        return;
      }
      const data = await publicClient.simulateContract({
        account,
        address: ContributorNFT_Contract_Address,
        abi: ContributorNFT_ABI,
        functionName: "safeMint",
        args: [account],
      });

      if (!walletClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        return;
      }

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-none">Contribute</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Support Researchers</DialogTitle>
        </DialogHeader>
        <div className=" space-y-5">
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Grant Amount Required</span>
              <Input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="1000"
                className="bg-[#f4f3f0] rounded-none"
              />
            </Label>
          </div>
          <Button
            disabled={isLoading}
            onClick={contribute}
            className="w-full rounded-none"
          >
            {isLoading ? <Loader /> : "Contribute"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
