"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface ApplyGrantFormValues {
  researchTitle: string;
  description: string;
  amount: number;
}

const initialFormValues: ApplyGrantFormValues = {
  researchTitle: "",
  description: "",
  amount: 0,
};

export default function ApplyGrantForm() {
  const [formValues, setFormValues] =
    useState<ApplyGrantFormValues>(initialFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
            placeholder="e.g: Ada Lovelace"
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
      <Button className="w-full rounded-none">Apply</Button>
    </div>
  );
}
