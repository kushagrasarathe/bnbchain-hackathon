"use client";

import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import React, { useState } from "react";
import { erc20Abi, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function ContributePage() {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [receiver, setReceiver] = useState<`0x${string}`>();
  const [amount, setAmount] = useState<number>();
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
  );

  const contribute = async () => {
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
      if (!amount || !receiver || !tokenAddress) {
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
          args: [receiver, parseEther(amount.toString())],
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
          to: receiver,
          value: parseEther(amount.toString()),
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
    <div className="space-y-5 py-6">
      <div className="space-y-1">
        <h1 className=" text-2xl font-semibold">Read published researches</h1>
        <p>
          Complete the form below to share your research interests and
          background, and propose your entry into PeerSci.
        </p>
      </div>
    </div>
  );
}
