"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  name: string;
  about: string;
  fieldOfResearch: string;
}

export default function ApproveEntryCard({
  name,
  about,
  fieldOfResearch,
}: Props) {
  return (
    <Card className="p-5 max-w-md rounded-none border border-neutral-700 shadow-[4px_4px_0px_0px] space-y-3 ">
      <div className="flex items-center justify-between">
        <div className=" text-xl font-semibold">{name}</div>
        <Badge variant={"outline"} className="bg-[#cdfb68] px-3 py-0.5">
          {fieldOfResearch}
        </Badge>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="line-clamp-3 text-start">{about}</div>
            </TooltipTrigger>
            <TooltipContent className=" max-w-md p-4" side="bottom">
              <div className="text-start">{about}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center justify-between *:w-full gap-3 pt-1">
        <Button variant={"destructive"}>Deny</Button>
        <Button variant={"default"}>Approve</Button>
      </div>
    </Card>
  );
}
