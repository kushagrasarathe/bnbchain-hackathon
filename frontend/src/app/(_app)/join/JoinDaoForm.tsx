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
import { toast } from "sonner";
import axios from "axios";
import { Loader } from "@/components/loader";

interface JoinDAOFormValues {
  yourName: string;
  institution: string;
  fieldOfResearch: string;
  researchInterests: string;
  aboutYourself: string;
  previousResearches: string;
  socials: string;
}

const initialFormValues: JoinDAOFormValues = {
  yourName: "",
  institution: "",
  fieldOfResearch: "",
  researchInterests: "",
  aboutYourself: "",
  previousResearches: "",
  socials: "",
};
// const initialFormValues: JoinDAOFormValues = {
//   yourName: "Ada Lovelace",
//   institution: "University of Cambridge",
//   fieldOfResearch: "Quantum Physics",
//   researchInterests: "Quantum Computing, Artificial Intelligence",
//   aboutYourself:
//     "As a passionate advocate for the marriage of mathematics and technology, I've embarked on a journey to unlock the potential of computing. From my early fascination with numbers to my groundbreaking work alongside Charles Babbage, I've dedicated my life to pushing the boundaries of what's possible. My vision extends beyond mere calculations; I aspire to weave creativity and logic into the fabric of our digital world. Join me on this thrilling adventure as we harness the power of technology to shape a brighter future for humanity.",
//   previousResearches: "",
//   socials: "https://twitter.com/username",
// };

export default function JoinDaoForm() {
  // const [name, setName] = useState<string>();
  // const [Institution, setInstitution] = useState<string>();
  // const [foR, setFoR] = useState<string>();
  // const [researchInterests, setResearchInterests] = useState<string>();
  // const [about, setAbout] = useState<string>();
  const [previousResearch, setPreviousResearch] = useState<File>();
  // const [socialMedia, setSocialMedia] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [formValues, setFormValues] =
    useState<JoinDAOFormValues>(initialFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const createProposal = async () => {
    try {
      setIsLoading(true);
      // prepare the data
      const memberData = {
        Name: formValues.yourName,
        Institution: formValues.institution,
        FieldOfResearch: formValues.fieldOfResearch,
        ResearchInterests: formValues.researchInterests,
        About: formValues.aboutYourself,
        SocialMedia: formValues.socials,
      };
      console.log(memberData);
      toast.loading("Preparing and Storing the Data on IPFS");

      // // store the user info via the API
      // const resMember = await fetch(
      //   "http://localhost:3000/api/pinata/storeJSON",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(memberData),
      //   }
      // );

      const resMember = await axios.post("/api/pinata/storeJSON", memberData);

      // console.log(await res.json());
      console.log(await resMember.data);

      // const memberDataCID = (await res.json()).response;
      const memberDataCID = (await resMember.data).IpfsHash;
      console.log(memberDataCID);

      toast.dismiss();
      toast.loading("Preparing and Storing the Previous research on IPFS");

      // store the research via the API
      console.log(previousResearch);
      // console.log(await previousResearch?.arrayBuffer());
      // const formData = new FormData();
      // formData.append("file", previousResearch?.stream());
      // console.log(formData);
      const fileBuffer = await previousResearch?.arrayBuffer();

      const resFile = await fetch("/api/pinata/storeFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: fileBuffer,
      });

      // console.log(await res.json());

      const researchCID = (await resFile.json()).IpfsHash;
      console.log(researchCID);

      toast.dismiss();
      toast.success(`Research Stored on IPFS with CID : ${researchCID}`);

      // const researchCID =
      //   "ipfs://bafkreifxtpdf5lcmkqjqmpe4wjgfl4rbov23ryn5merejridxk27pfzufq";

      // // take the CID and call the contract
      if (!publicClient) {
        setIsLoading(false);
        console.log("No Wallet Detected");
        toast.dismiss();
        toast.error("No Wallet Detected");
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
        setIsLoading(false);
        console.log("No Wallet Detected");
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

      toast.dismiss();
      toast.success(
        `Proposal Created in the contract with ID : ${data.result}`
      );
      setIsLoading(false);

      return {
        transaction,
        data,
      };
    } catch (error) {
      toast.dismiss();
      toast.error("Error Occured");
      setIsLoading(false);
      console.log(error);
    }
  };

  // const onSubmit = () => {
  //   console.log(formValues);
  //   toast.loading("Saving...");
  //   setTimeout(() => {
  //     toast.dismiss();
  //     toast.success("Saved Successfully!");
  //   }, 1000);
  // };

  return (
    <Card className="p-8 rounded-none border border-neutral-700 shadow-[8px_8px_0px_0px] space-y-4 ">
      <div className=" space-y-5">
        <div className="flex items-center justify-between gap-5">
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Your name</span>
              <Input
                type="text"
                name="yourName"
                value={formValues.yourName}
                onChange={handleChange}
                placeholder="e.g: Ada Lovelace"
                className="bg-[#f4f3f0] rounded-none"
                // onChange={(e) => setName(e.target.value)}
              />
            </Label>
          </div>
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Institution/Affiliation</span>
              <Input
                type="text"
                name="institution"
                value={formValues.institution}
                onChange={handleChange}
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: University of Cambridge"
                // onChange={(e) => setInstitution(e.target.value)}
              />
            </Label>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="w-full">
            <Label className="space-y-2">
              <span>Field of Research</span>
              <Input
                type="text"
                name="fieldOfResearch"
                value={formValues.fieldOfResearch}
                onChange={handleChange}
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: Quantum Physics"
                // onChange={(e) => setFoR(e.target.value)}
              />
            </Label>
          </div>
          <div className="w-full">
            <Label className="space-y-2">
              <span>Research Interests:</span>
              <Input
                type="text"
                name="researchInterests"
                value={formValues.researchInterests}
                onChange={handleChange}
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: Quantum Computing, Artificial Intelligence"
                // onChange={(e) => setResearchInterests(e.target.value)}
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
              name="aboutYourself"
              value={formValues.aboutYourself}
              onChange={handleChange}
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: As a passionate advocate for the marriage of mathematics and technology, I've embarked on a journey to unlock the potential of computing. From my early fascination with numbers to my groundbreaking work alongside Charles Babbage, I've dedicated my life to pushing the boundaries of what's possible. My vision extends beyond mere calculations; I aspire to weave creativity and logic into the fabric of our digital world. Join me on this thrilling adventure as we harness the power of technology to shape a brighter future for humanity."
              // onChange={(e) => setAbout(e.target.value)}
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
              name="previousResearches"
              // value={formValues.previousResearches}
              // value={previousResearch?}
              // onChange={handleChange}
              multiple
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: Journal of Quantum Mechanics, Volume 23, Issue 4"
              onChange={(e) => setPreviousResearch(e.target.files?.[0])}
            />
          </Label>
        </div>
        <div>
          <Label className="space-y-2">
            <span>Social Media/Website Links {`(optional)`}</span>
            <Input
              type="text"
              name="socials"
              value={formValues.socials}
              onChange={handleChange}
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: https://twitter.com/username"
              // onChange={(e) => setSocialMedia(e.target.value)}
            />
          </Label>
        </div>

        <Button
          disabled={isLoading}
          // onClick={onSubmit}
          className="rounded-none w-full"
          onClick={() => createProposal()}
        >
          {isLoading ? <Loader /> : "Create Proposal"}
        </Button>
      </div>
    </Card>
  );
}
