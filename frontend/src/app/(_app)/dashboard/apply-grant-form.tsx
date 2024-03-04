"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Grants_ABI, Grants_Contract_Address } from "@/constants/constants";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { parseEther } from "viem";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

interface ApplyGrantFormValues {
  researchTitle: string;
  description: string;
  amount: number;
}

const initialFormValues: ApplyGrantFormValues = {
  researchTitle: "Quantum Computing and its applications in AI",
  description:
    "Quantum Computing is the future of AI and ML. This research aims to explore the potential of Quantum Computing in AI and ML. We will be using IBM's Quantum Computing platform for this research. We are looking for a grant of $1000 to cover the costs of the research.",
  amount: 0,
};

export default function ApplyGrantForm() {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] =
    useState<ApplyGrantFormValues>(initialFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const applyGrant = async () => {
    try {
      setIsLoading(true);
      toast.loading("Storing Grant Data ...");
      const grantData = {
        researchTitle: formValues.researchTitle,
        description: formValues.description,
      };

      console.log(grantData);
      const resGrant = await axios.post("/api/pinata/storeJSON", grantData);

      // console.log(await res.json());
      console.log(await resGrant.data);

      // const memberDataCID = (await res.json()).response;
      const grantDataCID = (await resGrant.data).IpfsHash;
      console.log(grantDataCID);

      toast.dismiss();
      toast.success(`Grant Stored on IPFS with CID : ${grantDataCID}`);

      setIsLoading(true);
      if (!publicClient) {
        console.log("No Wallet Detected");
        setIsLoading(false);
        toast.dismiss();
        toast.error("No Wallet Detected");
        return;
      }

      const data = await publicClient.simulateContract({
        account,
        address: Grants_Contract_Address,
        abi: Grants_ABI,
        functionName: "requestGrant",
        args: [grantDataCID, parseEther(formValues.amount.toString())],
      });

      if (!walletClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        setIsLoading(false);
        toast.dismiss();
        toast.error("No Wallet Detected");
        return;
      }
      toast.dismiss();
      toast.loading("Creating the proposal in the contract");

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
        `Grant Proposal Created in the Contract with ID : ${data.result}`
      );
      return {
        transaction,
        data,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" space-y-5">
      <div className=" w-full">
        <Label className="space-y-2">
          <span>Proposed Research Title</span>
          <Input
            type="text"
            name="researchTitle"
            value={formValues.researchTitle}
            onChange={handleChange}
            placeholder="e.g: Quantum Computing and its applications in AI"
            className="bg-[#f4f3f0] rounded-none"
          />
        </Label>
      </div>
      <div className=" w-full">
        <Label className="space-y-2">
          <span>Proposed Research Title</span>
          <Textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Describe what your research is about"
            className="bg-[#f4f3f0] rounded-none"
          />
        </Label>
      </div>
      <div className=" w-full">
        <Label className="space-y-2">
          <span>Grant Amount Required</span>
          <Input
            type="number"
            name="amount"
            value={formValues.amount}
            onChange={handleChange}
            placeholder="1000"
            className="bg-[#f4f3f0] rounded-none"
          />
        </Label>
      </div>
      <Button
        disabled={isLoading}
        onClick={applyGrant}
        className="w-full rounded-none"
      >
        {isLoading ? <Loader /> : "Apply"}
      </Button>
    </div>
  );
}
