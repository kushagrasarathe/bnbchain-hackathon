import TabsSection from "@/components/homepage/TabsSection";
import { Typography } from "@/components/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center space-y-20 py-6">
      <div className="z-10 space-y-9 py-12 text-center md:max-w-3xl">
        <Typography variant={"h1"} className="">
          lorem ipsum lorem lorem lorem lorem lorem lorem
        </Typography>
        <Typography variant={"h3"} className=" text-foreground-secondary">
          lorem ipsum lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem
        </Typography>
        <div className="flex items-center justify-center gap-4">
          <Link
            href={"/dashboard"}
            className={cn(`${buttonVariants({ variant: "peersci" })}`)}
          >
            Dashboard 1
          </Link>
          <Button variant={"secondary"}>Dashboard 2</Button>
        </div>
      </div>
      <TabsSection />
    </div>
  );
}
