"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import PreviewPublish from "./PreviewPublish";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface PublishResearchFormValues {
  title: string;
  institution: string;
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  discussion: string;
  conclusion: string;
  references: string;
  fundingSource: string;
  acknowledgments: string;
  researchPaper: string;
}

const initialFormValues: PublishResearchFormValues = {
  title: "Quantum Entanglement and Its Applications",
  institution: "University of Cambridge",
  abstract:
    "This research explores the phenomenon of quantum entanglement and its potential applications in quantum computing, cryptography, and teleportation.",
  introduction:
    " Introduction provides background information and context for the research.",
  methodology:
    "Methodology describes the methods and techniques used in the research.",
  results: "Results present the data, analyses, and interpretations.",
  discussion:
    "Discussion discusses the significance of the results, implications, and future directions.",
  conclusion:
    "Conclusion summarizes the main findings and conclusions of the research.",
  references: "Journal of Quantum Mechanics Volume 23 Issue 4",
  fundingSource: "National Science Foundation",
  acknowledgments:
    "Acknowledge individuals or organizations that contributed to the research but are not listed as authors.",
  researchPaper: "",
};

export default function PublishResearchForm() {
  const [formValues, setFormValues] =
    useState<PublishResearchFormValues>(initialFormValues);
  const [researchPaper, setResearchPaper] = useState<File>();
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const publishResearch = async () => {
    try {
      // store the research Paper File
      // store the research via the API
      console.log(researchPaper);
      // console.log(await previousResearch?.arrayBuffer());
      // const formData = new FormData();
      // formData.append("file", previousResearch?.stream());
      // console.log(formData);
      const fileBuffer = await researchPaper?.arrayBuffer();

      const resFile = await fetch("/api/pinata/storeFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: fileBuffer,
      });

      const researchPaperFileCID = (await resFile.json()).IpfsHash;

      // store the whole data
      const researchPaperData = {
        title: formValues.title,
        institution: formValues.institution,
        abstract: formValues.abstract,
        introduction: formValues.introduction,
        methodology: formValues.methodology,
        results: formValues.results,
        discussion: formValues.discussion,
        conclusion: formValues.conclusion,
        references: formValues.references,
        fundingSource: formValues.fundingSource,
        acknowledgments: formValues.acknowledgments,
        researchPaper: researchPaperFileCID,
      };
      console.log(researchPaperData);

      // store the user info via the API
      const res = await fetch("/api/pinata/storeJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(researchPaperData),
      });

      // console.log(await res.json());

      const researchPaperCID = (await res.json()).IpfsHash;
      console.log(researchPaperCID);

      // const researchPaperCID = "QmSQNQ9zyfVXvT3wwwHjWRNDL4KuJ2tF72mKv9j5DbSw6v";

      // perform the transaction
      if (!publicClient) {
        // setIsLoading(false);
        console.log("No Wallet Detected");
        return;
      }
      const data = await publicClient.simulateContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "addResearch",
        args: [researchPaperCID],
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = () => {
    console.log(formValues);
    toast.loading("Saving...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Saved Successfully!");
    }, 1000);
  };

  return (
    <>
      <Tabs defaultValue="form" className="space-y-4">
        <TabsList className="flex items-center justify-normal gap-2 p-0 rounded-none">
          <TabsTrigger value="form" className="w-full">
            Form
          </TabsTrigger>
          <TabsTrigger value="preview" className="w-full">
            Preview
          </TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="form" className="w-full">
            <Card className="p-6 md:p-8 rounded-none border border-neutral-700 shadow-[5px_5px_0px_0px] space-y-4 ">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-5">
                  <div className="w-full">
                    <Label className="space-y-2">
                      <span>Title of Research</span>
                      <Input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        placeholder="e.g: Quantum Entanglement and Its Applications"
                        className="bg-[#f4f3f0] rounded-none"
                      />
                    </Label>
                  </div>
                  <div className="w-full">
                    <Label className="space-y-2">
                      <span>Institution/Affiliation</span>
                      <Input
                        type="text"
                        name="institution"
                        value={formValues.institution}
                        onChange={handleChange}
                        placeholder="e.g: University of Cambridge"
                        className="bg-[#f4f3f0] rounded-none"
                      />
                    </Label>
                  </div>
                </div>

                <div>
                  <Label className="space-y-2">
                    <span>Abstract</span>
                    <Textarea
                      rows={3}
                      name="abstract"
                      value={formValues.abstract}
                      onChange={handleChange}
                      placeholder="e.g: This research explores the phenomenon of quantum entanglement and its potential applications in quantum computing, cryptography, and teleportation."
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>Introduction</span>
                    <Textarea
                      rows={3}
                      name="introduction"
                      value={formValues.introduction}
                      onChange={handleChange}
                      placeholder="e.g: Introduction provides background information and context for the research."
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>Methodology</span>
                    <Textarea
                      rows={3}
                      name="methodology"
                      value={formValues.methodology}
                      onChange={handleChange}
                      placeholder="e.g: Methodology describes the methods and techniques used in the research."
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>Results</span>
                    <Textarea
                      rows={3}
                      name="results"
                      value={formValues.results}
                      onChange={handleChange}
                      placeholder="e.g: Results present the data, analyses, and interpretations."
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>Discussion</span>
                    <Textarea
                      rows={3}
                      name="discussion"
                      value={formValues.discussion}
                      onChange={handleChange}
                      placeholder="e.g: Discussion discusses the significance of the results, implications, and future directions."
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>Conclusion</span>
                    <Textarea
                      rows={3}
                      name="conclusion"
                      value={formValues.conclusion}
                      onChange={handleChange}
                      placeholder="e.g: Conclusion summarizes the main findings and conclusions of the research."
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>
                      References{" "}
                      <span className="text-xs">{`(use comma to add muliple references)`}</span>
                    </span>
                    <Input
                      type="text"
                      name="references"
                      value={formValues.references}
                      onChange={handleChange}
                      placeholder="e.g: Journal of Quantum Mechanics Volume 23 Issue 4"
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>
                      Funding Source{" "}
                      <span className="text-xs">{`(use comma if there are muliple funding sources)`}</span>
                    </span>
                    <Input
                      type="text"
                      name="fundingSource"
                      value={formValues.fundingSource}
                      onChange={handleChange}
                      placeholder="e.g: National Science Foundation"
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>Acknowledgments</span>
                    <Textarea
                      rows={3}
                      name="acknowledgments"
                      value={formValues.acknowledgments}
                      onChange={handleChange}
                      placeholder="e.g: Acknowledge individuals or organizations that contributed to the research but are not listed as authors."
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <div>
                  <Label className="space-y-2">
                    <span>Upload Research Paper</span>
                    <Input
                      type="file"
                      name="researchPaper"
                      // value={formValues.researchPaper}
                      // onChange={handleChange}
                      onChange={(e) => setResearchPaper(e.target.files?.[0])}
                      className="bg-[#f4f3f0] rounded-none"
                    />
                  </Label>
                </div>
                <Button
                  onClick={() => publishResearch()}
                  className="rounded-none w-full"
                >
                  Publish Research
                </Button>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="preview" className="w-full">
            <Card className="p-6 md:p-8 rounded-none border border-neutral-700 shadow-[5px_5px_0px_0px] space-y-4 ">
              <PreviewPublish
                title={formValues.title}
                institution={formValues.institution}
                abstract={formValues.abstract}
                introduction={formValues.introduction}
                methodology={formValues.methodology}
                results={formValues.results}
                discussion={formValues.discussion}
                conclusion={formValues.conclusion}
                references={formValues.references}
                fundingSource={formValues.fundingSource}
                acknowledgments={formValues.acknowledgments}
                researchPaper={formValues.researchPaper}
              />
              <Button
                onClick={() => publishResearch()}
                className="rounded-none w-full"
              >
                Publish Research
              </Button>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
