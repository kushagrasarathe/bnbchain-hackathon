"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "sonner";

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

export default function JoinDaoForm() {
  const [formValues, setFormValues] =
    useState<JoinDAOFormValues>(initialFormValues);

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
              value={formValues.previousResearches}
              onChange={handleChange}
              multiple
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: Journal of Quantum Mechanics, Volume 23, Issue 4"
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
            />
          </Label>
        </div>
        <Button onClick={onSubmit} className="rounded-none w-full">
          Create Proposal
        </Button>
      </div>
    </Card>
  );
}
