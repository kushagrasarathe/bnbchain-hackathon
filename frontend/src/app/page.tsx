import Image from "next/image";
import hero from "@/assets/hero2.png";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    // bg-gradient-to-tr from-[#f9f7f2] via-[#f9f7f2] to-[#eeffca]
    <main className="d:max-w-6xl mx-auto py-16 space-y-10 flex items-center justify-center flex-col">
      <div className="font-[800] text-7xl text-center ">
        Publish Your{" "}
        <span className="drop-shadow-md">
          Research <br />
        </span>
        & <span className=" drop-shadow-md">Get</span> Grants
      </div>
      <div className=" grid grid-cols-12 gap-y-12 w-full px-20 items-center">
        <div className="relative col-span-4  w-full space-y-8 ">
          <p>
            PeerSci is a DAO for Scientists & Researchers around the world.
            Become a member, share your research and get grants from the
            community.
          </p>
          <Button
            size={"lg"}
            variant={"outline"}
            className="rounded-full text-base p-6 flex items-center gap-2"
          >
            Join Now <ArrowRight className="-rotate-45 " />
          </Button>
        </div>
        <div className=" col-span-4 flex items-center justify-center ">
          <div className="relative group max-w-sm mx-auto">
            <div className="bg-[#cdfb68] rounded-full absolute h-96 w-[320px] -bottom-1 right-6 border-4 shadow-md border-white"></div>
            <Image
              src={hero}
              alt="hero"
              className=" drop-shadow-xl max-w-[350px] rounded-br-[53%]"
            />
          </div>
        </div>
        <div className="relative col-span-4  w-full space-y-8 ">
          <div className=" flex items-center gap-16">
            <div className=" space-y-2">
              <h1 className=" text-5xl font-bold">1K +</h1>
              <div>Members</div>
            </div>
            <div className=" space-y-2">
              <h1 className=" text-5xl font-bold">$20K +</h1>
              <div>In Grants</div>
            </div>
          </div>
          <Button
            size={"lg"}
            variant={"ghost"}
            className="border border-neutral-400 rounded-full text-xl py-8 px-2 pl-8 gap-6 flex items-center"
          >
            Join Now{" "}
            <ArrowRight className="-rotate-45 bg-[#cdfb68] rounded-full size-12 p-2 " />
          </Button>
        </div>
        {/* <div className="relative col-span-4 border-t border-l w-full space-y-4 border-neutral-400 pl-8 pt-3 p-2 ">
          <div className="absolute -left-3.5 clip top-1.5 -rotate-45 w-20 border-t border-neutral-400 h-10 rounded-t-[40px] " />
          <p>
            PeerSci is a DAO for Scientists & Researchers around the world.
            Become a member, share your research and get grants from the
            community.
          </p>
          <Button size={"lg"} className="rounded-none text-base p-6">
            Join Now
          </Button>
        </div>
        <div className="relative col-span-4 border-t border-r w-full space-y-4 border-neutral-400 pr-8 pt-3 p-2 flex flex-col items-center justify-center">
          <div className="absolute -right-3.5 clip top-1.5 rotate-45 w-20 border-t border-neutral-400 h-10 rounded-t-[40px] " />
          <p className=" text-right">
            PeerSci is a DAO for Scientists & Researchers around the world.
            Become a member, share your research and get grants from the
            community.
          </p>
          <Button size={"lg"} className="rounded-none text-base p-6 ml-auto">
            Join Now
          </Button>
        </div>
        <div className="relative col-span-12 border-b border-x w-full space-y-4 border-neutral-400 pr-8 pt-3 pb-6 ">
          <div className="absolute -right-3.5 clip bottom-1.5 rotate-[135deg] w-20 border-t border-neutral-400 h-10 rounded-t-[40px]  " />
          <div className="absolute -left-3.5 clip bottom-1.5 -rotate-[135deg] w-20 border-t border-neutral-400 h-10 rounded-t-[40px] " />
          <p className="text-center">
            PeerSci is a DAO for Scientists & Researchers around the world.
            Become a member, share your research and get grants from the
            community.
          </p>
        </div> */}
      </div>
    </main>
  );
}
