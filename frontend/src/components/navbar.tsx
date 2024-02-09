import Link from "next/link";
import { Typography } from "./typography";
import { Button } from "./ui/button";

interface Path {
  label: string;
  path: string;
}
const paths: Path[] = [];

export function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between overflow-hidden border-b border-b-foreground-secondary/40  py-4 backdrop-blur-md">
      <Link href={"/"}>
        <Typography variant={"h3"} className="">
          PeerSci
        </Typography>
      </Link>
      <div>
        <Button variant={"peersci"}>Dashboard</Button>
      </div>
    </div>
  );
}

export function DashboardHeader() {
  return null;
}
