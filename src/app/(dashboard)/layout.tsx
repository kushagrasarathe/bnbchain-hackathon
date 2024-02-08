import { DashboardContainer } from "@/components/Container";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardContainer>{children}</DashboardContainer>;
}
