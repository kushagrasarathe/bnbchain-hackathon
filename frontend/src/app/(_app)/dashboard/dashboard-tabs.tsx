import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApproveEntryCard from "./approve-entry-card";
import ApproveGrantCard from "./approve-grant-card";
import ApplyGrantModal from "./apply-grant-modal";

export default function DashboardTabs() {
  return (
    <div>
      <Tabs defaultValue="voting" className="">
        <TabsList className="mt-10 *:px-5 *:-mx-1 *:w-full flex items-center justify-between border border-black rounded-none">
          <TabsTrigger value="voting">Join Proposals</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
        </TabsList>
        <div className="py-8 p-8 bg-white rounded-none border border-t-0 border-neutral-700 mx-1">
          <TabsContent value="voting" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300">
              <div className=" text-2xl font-semibold ">
                Vote DAO Joining Proposals
              </div>
            </div>
            <div className=" grid grid-cols-12 md:*:col-span-6 col-span-12 gap-10">
              <ApproveEntryCard
                name="Kushagra Sarathe"
                about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas."
                fieldOfResearch="Blockchain"
              />
              <ApproveEntryCard
                name="Kushagra Sarathe"
                about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas."
                fieldOfResearch="Blockchain"
              />
            </div>
          </TabsContent>
          <TabsContent value="grants" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300 flex items-center justify-between">
              <div className=" text-2xl font-semibold ">
                Vote Grant Proposals
              </div>
              <ApplyGrantModal />
            </div>
            <ApproveGrantCard
              title="Proposed Research Title Here"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, neque beatae ratione omnis provident doloribus ad repellendus facere eos quia blanditiis fugiat asperiores magnam ea voluptates similique? Accusantium, quia voluptas."
              amount={876238}
            />
          </TabsContent>
          {/* <TabsContent value="yourResearches" className="space-y-8">
            <div className="pb-3 border-b border-neutral-300">
              <div className=" text-2xl font-semibold ">Your Researches</div>
            </div>
          </TabsContent> */}
        </div>
      </Tabs>
    </div>
  );
}
