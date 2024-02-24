"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SupportResearchModal() {
  const [donationAmount, setDonationAmount] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"default"}
          type="button"
          className="rounded-none text-base py-3 px-4 w-full  bg-[#c4fd49] hover:bg-[#c4fd49]/90  text-black "
        >
          Donate
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader className="">
          <DialogTitle>Supprt Science</DialogTitle>
          <DialogDescription>
            Your donation will go directly to a researchers account and will
            support their work.
          </DialogDescription>

          <div className="space-y-5 pt-5">
            <Label className=" block space-y-2">
              <div>Donation Amount</div>
              <Input
                type="number"
                placeholder="e.g. $50"
                value={donationAmount || ""}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="bg-[#f4f3f0] rounded-none w-full"
              />
            </Label>
            <Button
              size={"sm"}
              variant={"default"}
              type="button"
              className="rounded-none text-base py-3 px-4 w-full "
            >
              Donate
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
