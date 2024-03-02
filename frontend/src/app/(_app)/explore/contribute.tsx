"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContributeForm {
  amount: number;
}

const initialFormValues: ContributeForm = {
  amount: 0,
};

export default function Contribute() {
  const [formValues, setFormValues] =
    useState<ContributeForm>(initialFormValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-none">Contribute</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Support Researchers</DialogTitle>
        </DialogHeader>
        <div className=" space-y-5">
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
          <Button className="w-full rounded-none">Contribute</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
