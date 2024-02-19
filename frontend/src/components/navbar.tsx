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
      {/* 
      <div className="flex items-center justify-center gap-10 text-lg">
        <Link href={"/join"}>Join</Link>
        <Link href={"/join"}>Contribute</Link>
        <Link href={"/join"}>Explore</Link>
        <Link href={"/publish"}>Publish</Link>
      </div> */}

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
      <DropdownMenuTrigger>
        <Button variant={"outline"}>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
