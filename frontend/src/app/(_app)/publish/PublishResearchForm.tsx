"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface PublishResearchFormValues {
  title: string;
  authors: string;
  institution: string;
  abstract: string;
  keywords: string;
  introduction: string;
  methodology: string;
  results: string;
  discussion: string;
  conclusion: string;
  references: string;
  fundingSource: string;
  acknowledgments: string;
}

const initialFormValues: PublishResearchFormValues = {
  title: "",
  authors: "",
  institution: "",
  abstract: "",
  keywords: "",
  introduction: "",
  methodology: "",
  results: "",
  discussion: "",
  conclusion: "",
  references: "",
  fundingSource: "",
  acknowledgments: "",
};

export default function PublishResearchForm() {
  const [formValues, setFormValues] =
    useState<PublishResearchFormValues>(initialFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Card className="p-8 rounded-none border border-neutral-700 shadow-[8px_8px_0px_0px] space-y-4 ">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full">
            <Label className="space-y-2">
              <span>Title of Research</span>
              <Input
                type="text"
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
              placeholder="e.g: Journal of Quantum Mechanics, Volume 23, Issue 4"
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
              placeholder="e.g: Acknowledge individuals or organizations that contributed to the research but are not listed as authors."
              className="bg-[#f4f3f0] rounded-none"
            />
          </Label>
        </div>
        <div>
          <Label className="space-y-2">
            <span>Upload Research Paper</span>
            <Input type="file" className="bg-[#f4f3f0] rounded-none" />
          </Label>
        </div>
        <Button className="rounded-none w-full">Publish Proposal</Button>
      </div>
    </Card>
  );
}
