import { cn } from "@/lib/utils";
import { ButtonProps } from "../ui/button";
import { Card } from "../ui/card";

interface Props {
  children: React.ReactNode;
  className?: ButtonProps["className"];
}

export default function DashboardCard({ children, className }: Props) {
  return (
    <Card
      className={cn(
        "z-10 rounded-xl border-0 bg-[#b5b4b6]/30 px-8 py-7 backdrop-blur-md dark:bg-white/30 dark:text-white",
        className,
      )}
    >
      {children}
    </Card>
  );
}
