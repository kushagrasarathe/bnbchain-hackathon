import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface ResearchCardProps {
  id: number;
  title: string;
  description: string;
}

export default function ResearchCard({
  id,
  title,
  description,
}: ResearchCardProps) {
  return (
    <Card className="p-5 rounded-none border border-neutral-700 shadow-[4px_5px_0px_0px] space-y-4 ">
      <div className="flex flex-col justify-between h-full gap-y-3 ">
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p>{description}</p>
        </div>
        <Link href={`/explore/${id}`} className=" block w-full">
          <Button
            size={"sm"}
            variant={"default"}
            // onClick={openChainModal}
            type="button"
            className="rounded-none text-base py-3 px-4 w-full bg-[#c4fd49] hover:bg-[#c4fd49]/90  text-black"
          >
            Read Research
          </Button>
        </Link>
      </div>
    </Card>
  );
}
