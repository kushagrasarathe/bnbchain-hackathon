import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="py-6 md:max-w-6xl mx-auto flex items-center justify-between">
      <Link href={"/"} className=" text-3xl font-bold">
        PeerSci
      </Link>

      <div className="flex items-center justify-center gap-10 text-lg">
        <Link href={"/join"}>Join</Link>
        <Link href={"/join"}>Contribute</Link>
        <Link href={"/join"}>Publishments</Link>
      </div>

      <Button size={"lg"} className="rounded-none text-base p-6">
        Connect Wallet
      </Button>
    </div>
  );
}
