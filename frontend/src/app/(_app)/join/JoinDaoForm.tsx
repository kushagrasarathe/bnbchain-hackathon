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
                placeholder="e.g: Ada Lovelace"
                className="bg-[#f4f3f0] rounded-none"
              />
            </Label>
          </div>
          <div className=" w-full">
            <Label className="space-y-2">
              <span>Institution/Affiliation</span>
              <Input
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
                className="bg-[#f4f3f0] rounded-none"
                placeholder="e.g: Quantum Physics"
              />
            </Label>
          </div>
          <div className="w-full">
            <Label className="space-y-2">
              <span>Research Interests:</span>
              <Input
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
              className="bg-[#f4f3f0] rounded-none"
              placeholder="e.g: https://twitter.com/username"
            />
          </Label>
        </div>
        <Button className="rounded-none w-full">Create Proposal</Button>
      </div>
    </Card>
  );
}
