import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApproveEntryCard from "./approve-entry-card";

export default function DashboardTabs() {
  return (
    <div>
      <Tabs defaultValue="voting" className="">
        <TabsList className="mt-10 *:px-5 *:mx-0">
          <TabsTrigger value="voting">Vote</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="yourResearches">Your Researches</TabsTrigger>
        </TabsList>
        <div className="py-8 px-1">
          <TabsContent value="voting" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300">
              <div className=" text-2xl font-semibold ">Vote Proposals</div>
            </div>
            <ApproveEntryCard
              name="Kushagra Sarathe"
              about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas."
              fieldOfResearch="Blockchain"
            />
          </TabsContent>
          <TabsContent value="grants" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300">
              <div className=" text-2xl font-semibold ">Vote Proposals</div>
            </div>
          </TabsContent>
          <TabsContent value="yourResearches" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300">
              <div className=" text-2xl font-semibold ">Vote Proposals</div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
