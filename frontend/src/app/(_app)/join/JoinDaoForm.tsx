"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function JoinDaoForm() {
  return (
    <Card className="p-8 rounded-none border border-neutral-700 shadow-[8px_8px_0px_0px] space-y-4 ">
      <div className=" space-y-5">
        <div className="flex items-center justify-between gap-5">
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Your name</span>
              <Input
                type="text"
                placeholder="e.g: Vitalik Buterin"
                className="bg-[#f4f3f0] rounded-none"
              />
            </Label>
          </div>
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Institution/Affiliation</span>
              <Input
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: "
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
                placeholder="e.g: "
              />
            </Label>
          </div>
          <div className="w-full">
            <Label className="space-y-2">
              <span>Research Interests:</span>
              <Input
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: "
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
              rows={5}
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: As a scientist, my passion lies in unraveling the universe's mysteries through rigorous research. I specialize in quantum mechanics, exploring quantum entanglement's implications for computing and communication. Additionally, I delve into AI, merging neuroscience with machine learning to create more advanced algorithms. I contribute to experimental research, collaborating on projects from subatomic particles to medical biomaterials. Beyond research, I'm dedicated to promoting scientific literacy and inspiring future scientists. In essence, I thrive on pushing boundaries, seeking truth, and making meaningful contributions to society through scientific inquiry and innovation."
            />
          </Label>
        </div>
        <div>
          <Label className="space-y-2">
            <span>
              Previous Research Contributions/Publications {`(if applicable)`}:
            </span>
            <Input className="bg-[#f4f3f0] rounded-none" placeholder="e.g: " />
          </Label>
        </div>
        <div>
          <Label className="space-y-2">
            <span>Social Media/Website Links {`(optional)`}</span>
            <Input className="bg-[#f4f3f0] rounded-none" placeholder="e.g: " />
          </Label>
        </div>
        <Button className="rounded-none w-full">Create Proposal</Button>
      </div>
    </Card>
  );
}
