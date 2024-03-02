import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ApplyGrantForm from "./apply-grant-form";

export default function ApplyGrantModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-none bg-[#cdfb68] hover:bg-white text-black border border-neutral-700 shadow-[3px_3px_0px_0px] space-y-4">
          Apply for Grant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for Grant</DialogTitle>
        </DialogHeader>
        <div>
          <ApplyGrantForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
