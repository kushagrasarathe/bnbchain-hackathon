import React from "react";
import sample from "@/assets/sample.jpeg";
import Image from "next/image";
import ResearchCard from "./research-card";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <div className="space-y-5 py-6">
      <div className="space-y-1">
        <h1 className=" text-2xl font-semibold">Read published researches</h1>
      </div>
      {/* <div className="flex relative hadow-[8px_8px_0px_0px] order-2 border-black">
        <div className="absolute p-10 bg-[#f9f7f2]/40 backdrop-blur-xl h-full w-3/5 clip2">
          <h1 className=" text-2xl font-semibold">Featured Research</h1>
        </div>
        <div className="">
          <Image
            src={sample}
            alt="featured"
            className="max-h-80 object-cover"
          />
        </div>
      </div> */}
      <div className="grid grid-cols-12 [&>*]:col-span-12 md:[&>*]:col-span-6 gap-10">
        <ResearchCard
          id={2332}
          title="Title Here"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          necessitatibus eum aut fuga veniam. A quia ab vitae officia alias
          corporis a."
        />
        <ResearchCard
          id={2332}
          title="Title Here"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          necessitatibus eum aut fuga veniam. A quia ab vitae officia alias
          tempora optio labore dignissimos aliquam voluptas. Numquam molestias
          corporis a."
        />
      </div>
    </div>
  );
}
