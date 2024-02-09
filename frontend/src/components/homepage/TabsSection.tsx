import artistTabImage from "@/assets/Leon.jpg";
import developerTabImage from "@/assets/Leon2.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Typography } from "../typography";

export default function TabsSection() {
  return (
    <div className=" relative  flex w-full flex-row-reverse items-start justify-between text-justify">
      <Tabs defaultValue="developers" className="w-full px-6 md:px-12">
        <TabsList className="bgprimary ext-black">
          <TabsTrigger className=" w-24" value="developers">
            Developers
          </TabsTrigger>
          <TabsTrigger className=" w-24" value="artists">
            Artists
          </TabsTrigger>
        </TabsList>
        <div className="w-full py-6 md:py-12">
          <TabsContent
            value="developers"
            className=" flex flex-col items-start justify-between gap-8 md:flex-row md:gap-12"
          >
            <Typography variant={"paragraph"}>
              lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lo
              lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lor
              lorem lorem lorem lorem lorem lorem lor lorem lorem loremlorem
              lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lor
              lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lor
              lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lor
              lorem lorem lorem lorem lorem lorem lor lorem lorem loremlorem
              lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lor
            </Typography>
            <Image
              src={artistTabImage}
              alt="artistTabImage"
              className="rounded-xl md:-mt-24 md:w-5/12"
            />
          </TabsContent>

          <TabsContent
            value="artists"
            className=" mt-0 flex flex-col items-start justify-between gap-8 md:flex-row md:gap-12"
          >
            <Typography variant={"paragraph"}>
              lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lo
              lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lor
              lorem lorem lorem lorem lorem lorem lor lorem lorem loremlorem
              lorem lorem lor
            </Typography>
            <Image
              src={developerTabImage}
              alt="developerTabImage"
              className="rounded-xl md:-mt-24 md:w-5/12"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
