"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "sonner";

interface PublishResearchFormValues {
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
  title: "",
  institution: "",
  abstract: "",
  introduction: "",
  methodology: "",
  results: "",
  discussion: "",
  conclusion: "",
  references: "",
  fundingSource: "",
  acknowledgments: "",
  researchPaper: "",
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

  const onSubmit = () => {
    console.log(formValues);
    toast.loading("Saving...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Saved Successfully!");
    }, 1000);
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
              value={formValues.researchPaper}
              onChange={handleChange}
              className="bg-[#f4f3f0] rounded-none"
            />
          </Label>
        </div>
        <Button onClick={onSubmit} className="rounded-none w-full">
          Publish Proposal
        </Button>
      </div>
    </Card>
  );
}
