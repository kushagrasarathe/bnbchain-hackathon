"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import React, { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function JoinDaoForm() {
  const [name, setName] = useState<string>();
  const [Institution, setInstitution] = useState<string>();
  const [foR, setFoR] = useState<string>();
  const [researchInterests, setResearchInterests] = useState<string>();
  const [about, setAbout] = useState<string>();
  const [previousResearch, setPreviousResearch] = useState<File>();
  const [socialMedia, setSocialMedia] = useState<string>();

  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const createProposal = async () => {
    try {
      // prepare the data
      const memberData = {
        name,
        Institution,
        fieldofReseasrch: foR,
        researchInterests,
        about,

        socialMedia,
      };

      // store the user info via the API
      const res = await fetch("/api/pinata/storeJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      console.log(await res.json());

      const memberDataCID = (await res.json()).response;

      // store the research via the API

      // const formData = new FormData();
      // formData.append("file", previousResearch);

      // const res = await fetch("/api/pinata/storeFile", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: formData,
      // });

      // console.log(await res.json());

      const researchCID =
        "ipfs://bafkreifxtpdf5lcmkqjqmpe4wjgfl4rbov23ryn5merejridxk27pfzufq";

      // take the CID and call the contract
      if (!publicClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        return;
      }
      const data = await publicClient.simulateContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "addRequest",
        args: [memberDataCID, [researchCID]],
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
    <Card className="p-8 rounded-none border border-neutral-700 shadow-[8px_8px_0px_0px] space-y-4 ">
      <div className=" space-y-5">
        <div className="flex items-center justify-between gap-5">
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Your name</span>
              <Input
                type="text"
                value={name}
                placeholder="e.g: Ada Lovelace"
                className="bg-[#f4f3f0] rounded-none"
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
          </div>
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Institution/Affiliation</span>
              <Input
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: University of Cambridge"
                onChange={(e) => setInstitution(e.target.value)}
              />
            </Label>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="w-full">
            <Label className="space-y-2">
              <span>Field of Research</span>
              <Input
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: Quantum Physics"
                onChange={(e) => setFoR(e.target.value)}
              />
            </Label>
          </div>
          <div className="w-full">
            <Label className="space-y-2">
              <span>Research Interests:</span>
              <Input
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: Quantum Computing, Artificial Intelligence"
                onChange={(e) => setResearchInterests(e.target.value)}
              />
            </Label>
          </div>
        </div>
        <div>
          <Label className="space-y-2">
            <span>
              Tell us a bit about yourself{" "}
              <span className="text-xs">{`( atleast 150 words )`}</span>
            </span>
            <Textarea
              rows={4}
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: As a passionate advocate for the marriage of mathematics and technology, I've embarked on a journey to unlock the potential of computing. From my early fascination with numbers to my groundbreaking work alongside Charles Babbage, I've dedicated my life to pushing the boundaries of what's possible. My vision extends beyond mere calculations; I aspire to weave creativity and logic into the fabric of our digital world. Join me on this thrilling adventure as we harness the power of technology to shape a brighter future for humanity."
              onChange={(e) => setAbout(e.target.value)}
            />
          </Label>
        </div>
        <div>
          <Label className="space-y-2">
            <span>
              Previous Research Contributions/Publications {`(if applicable)`}:
            </span>
            <Input
              type="file"
              multiple
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: Journal of Quantum Mechanics, Volume 23, Issue 4"
              // @ts-ignore
              onChange={(e) => setPreviousResearch(e.target.files[0])}
            />
          </Label>
        </div>
        <div>
          <Label className="space-y-2">
            <span>Social Media/Website Links {`(optional)`}</span>
            <Input
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: https://twitter.com/username"
              onChange={(e) => setSocialMedia(e.target.value)}
            />
          </Label>
        </div>
        <Button
          className="rounded-none w-full"
          onClick={() => createProposal()}
        >
          Create Proposal
        </Button>
      </div>
    </Card>
  );
}
