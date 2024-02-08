import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function DashboardContainer({
  children,
  className,
}: ComponentProps<"div">) {
  return <div className={cn(" ", className)}>{children}</div>;
}

export function Container({ children, className }: ComponentProps<"div">) {
  return <div className={cn("", className)}>{children}</div>;
}
