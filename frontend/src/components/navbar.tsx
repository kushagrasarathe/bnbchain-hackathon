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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ConnectWalletButton } from "./connect-wallet";
import { FlipHorizontal, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Navbar() {
  return (
    <div className="py-6 pt-8 px-5 md:px-0 md:max-w-6xl mx-auto flex items-center justify-between">
      <Link href={"/"} className="text-xl md:text-3xl font-bold">
        PeerSci
      </Link>

      <div className="md:hidden">
        <MobileNavMenu />
      </div>
      <div className="md:flex items-center gap-3 hidden">
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
        <Button variant={"outline"} className="h-9 rounded-none w-12 px-1 p-0">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none w-full mr-20 md:mr-24 mt-1 shadow-sm md:w-36">
        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/join"}>
          <DropdownMenuItem className="cursor-pointer">Join</DropdownMenuItem>
        </Link>
        <Link href={"/explore"}>
          <DropdownMenuItem className="cursor-pointer">
            Explore
          </DropdownMenuItem>
        </Link>
        <Link href={"/dashboard"}>
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
          </DropdownMenuItem>
        </Link>
        {/* <Link href={"/contribute"}>
          <DropdownMenuItem className="cursor-pointer">
            Contribute
          </DropdownMenuItem>
        </Link> */}
        <Link href={"/publish"}>
          <DropdownMenuItem className="cursor-pointer">
            Publish
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer md:hidden">
          <ConnectWalletButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MobileNavMenu = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            className="h-9 rounded-none w-12 px-1 p-0"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="text-start">Navigation Menu</SheetTitle>
            <Separator />
          </SheetHeader>
          <div className="flex flex-col items-start gap-4 py-6">
            <Link href={"/join"}>Join</Link>
            {/* <Link href={"/contribute"}>Contribute</Link> */}
            <Link href={"/explore"}>Explore</Link>
            <Link href={"/publish"}>Publish</Link>
            <ConnectWalletButton />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
