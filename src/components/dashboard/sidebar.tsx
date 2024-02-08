"use client";
import { cn } from "@/lib/utils";
import { Home, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
import { Typography } from "../typography";
import { Separator } from "../ui/separator";

interface Links {
  title: string;
  path: string;
  label?: string;
  icon: LucideIcon;
}

const links: Links[] = [
  {
    title: "Home",
    icon: Home,
    path: "/dashboard",
  },
];

export function DashboardSidebar() {
  const path = usePathname();
  return (
    <div className="group flex min-h-screen flex-col items-center gap-4  bg-[#F6F6F6] py-4 dark:border-neutral-700 dark:bg-[#110E14] md:w-[90px] md:border-r lg:w-[280px] 2xl:w-[320px]">
      <div className=" block self-start px-6 md:hidden lg:block lg:px-10">
        <Link href={"/"}>
          <>
            {/* <Image
              src={logoDark}
              alt=" logo"
              className="block w-40 dark:hidden"
            />
            <Image
              src={logoLight}
              alt=" logo"
              className="hidden w-40 dark:block"
            /> */}
          </>
        </Link>
      </div>
      {/* <Image
        src={logo}
        alt="Icon"
        className="hidden w-10 md:block lg:hidden "
      /> */}
      <div className="my-auto w-full px-10 md:px-5 lg:px-6">
        <div className="flex w-full flex-col items-start gap-4 overflow-auto">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <Link
                href={link.path}
                className={cn(
                  // ${buttonVariants({
                  //   variant: path.startsWith(link.path) ? "navbar" : "ghost",
                  // })}
                  `
                  "dark:bg-muted flex items-center justify-start gap-2 self-start dark:text-white lg:w-full`,
                )}
              >
                <link.icon className="h-4 w-4" />
                <Typography
                  variant={"smallTitle"}
                  className="text-sm2xl:text-base md:hidden lg:block"
                >
                  {link.title}
                </Typography>
              </Link>
              {index < links.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
