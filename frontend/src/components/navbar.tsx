import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConnectWalletButton } from "./connect-wallet";
import { FlipHorizontal, Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="py-6 pt-8 md:max-w-6xl mx-auto flex items-center justify-between">
      <Link href={"/"} className=" text-3xl font-bold">
        PeerSci
      </Link>

      <div className="flex items-center gap-3">
        <ConnectWalletButton />
        <NavMenu />
      </div>
    </div>
  );
}

export const NavMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className=" h-9 rounded-none w-12 px-1 p-0">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none mr-24 mt-1 shadow-sm w-36">
        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/join"}>
          <DropdownMenuItem className="cursor-pointer">Join</DropdownMenuItem>
        </Link>
        <Link href={"/contribute"}>
          <DropdownMenuItem className="cursor-pointer">
            Contribute
          </DropdownMenuItem>
        </Link>
        <Link href={"/explore"}>
          <DropdownMenuItem className="cursor-pointer">
            Explore
          </DropdownMenuItem>
        </Link>
        <Link href={"/publish"}>
          <DropdownMenuItem className="cursor-pointer">
            Publish
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
