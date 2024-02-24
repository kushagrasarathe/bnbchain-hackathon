"use client";

import React, { useEffect, useState } from "react";
import {
  DAOMember_ABI,
  DAOMember_Contract_Address,
} from "@/constants/constants";
import { erc20Abi, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SupportResearchModal from "./support-research-modal";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/loader";

export default function ResearchPage({ params }: { params: { id: string } }) {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [research, setResearch] = useState<{}>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // remp
  const title = "Lorem Ipsum Title";
  const institution = "XYZ Institute";
  const abstract =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const introduction =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const methodology =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const results =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const discussion =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const conclusion =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const references =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const fundingSource =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const acknowledgments =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam laborum magni, optio sit architecto rem dolores nisi illo! Aliquid consectetur amet voluptas ea aperiam natus est harum ullam, dicta ut?";
  const researchPaper = "";

  // fetched the member.json
  const fetchIPFS = async (metadataURI: string) => {
    try {
      console.log("Fetching from IPFS ...");
      const URL = `https://orange-autonomous-clownfish-654.mypinata.cloud/ipfs/${metadataURI}`;
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  // fetch the data from the contract and then fetched the same from IPFS
  // returns an object that is then stored in the Array of request
  const fetchRequests = async (_id: bigint) => {
    try {
      setIsLoading(true);
      console.log(_id);
      const request = await publicClient?.readContract({
        account,
        address: DAOMember_Contract_Address,
        abi: DAOMember_ABI,
        functionName: "getResearch",
        args: [_id],
      });
      if (!request) {
        console.log("No request found");
        return;
      }
      console.log(request);
      console.log(request.researchPaperURI);
      const _date = new Date(
        Number(request.dateOfPublication)
      ).toLocaleString();
      console.log(_date);
      const response = await fetchIPFS(request.researchPaperURI);
      console.log(response);
      const parsedRequest = {
        Id: _id,
        // Title: response.Name,
        // Description: response.Description,
        // Content: response.Content,
        // Publisher: request.researcher,
        // DoP: _date,
        CID: request.researchPaperURI,
        ...response,
      };
      console.log(parsedRequest);
      setResearch(parsedRequest);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id && !research && !isLoading) {
      fetchRequests(BigInt(params.id));
    }
  }, [params.id]);

  // if (true) {
  //   return <Loading />;
  // }

  return (
    <div className="md:py-12 py-5 flex items-start md:flex-row flex-col justify-between gap-8 relative">
      <Card className="p-6 md:p-8 rounded-none border border-neutral-700 shadow-[5px_5px_0px_0px] space-y-4 ">
        <div>
          <div className="space-y-5">
            <div className="flex items-center w-full justify-between flex-wrap gap-3">
              {title && (
                <h1 className="text-xl md:text-3xl font-semibold">{title}</h1>
              )}
              {institution && (
                <Badge variant={"outline"} className="font-semibold text-sm">
                  Institution: {institution}
                </Badge>
              )}
            </div>

            {abstract && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Abstract</div>
                <p>{abstract}</p>
              </div>
            )}

            {introduction && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Introduction</div>
                <p>{introduction}</p>
              </div>
            )}

            {methodology && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Methodology</div>
                <p>{methodology}</p>
              </div>
            )}

            {results && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Results</div>
                <p>{results}</p>
              </div>
            )}

            {discussion && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Discussion</div>
                <p>{discussion}</p>
              </div>
            )}

            {conclusion && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Conclusion</div>
                <p>{conclusion}</p>
              </div>
            )}

            {references && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">References</div>
                <p>{references}</p>
              </div>
            )}

            {fundingSource && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">
                  Funding {`Source(s)`}
                </div>
                <p>{fundingSource}</p>
              </div>
            )}

            {acknowledgments && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Acknowledgments</div>
                <p>{acknowledgments}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
      <div className="md:sticky top-14 w-full md:w-3/5 space-y-8">
        <Card className="p-6 rounded-none border border-neutral-700 shadow-[5px_5px_0px_0px] space-y-4">
          <div className="space-y-2">
            <div className=" text-xl font-semibold">Support This Research</div>
            <p>
              Liked this research paper? Consider donating to support more
              science!
            </p>
          </div>
          <SupportResearchModal />
        </Card>
        <div className="space-y-3">
          <div className=" text-xl font-semibold">More Resarch Papers</div>
          <div className="space-y-2.5">
            <MoreReseachPaperCard
              id="8h3899hknfjsd"
              title="Title of Paper 1"
              description="Description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga adipisci in est? Fuga ullam natus dolore quasi accusantium itaque cupiditate debitis beatae, nostrum nemo ipsam possimus distinctio numquam, totam necessitatibus."
            />
            <Separator />
            <MoreReseachPaperCard
              id="8h3899hknfjsd"
              title="Title of Paper 1"
              description="Description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga adipisci in est? Fuga ullam natus dolore quasi accusantium itaque cupiditate debitis beatae, nostrum nemo ipsam possimus distinctio numquam, totam necessitatibus."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const MoreReseachPaperCard = ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) => {
  return (
    <Card className="p-6 rounded-none border border-neutral-700 shadow-[5px_5px_0px_0px] space-y-4">
      <div className="flex flex-col items-start justify-normal gap-2">
        <h2 className="text-base pb-0 text-neutral-700 font-[600] break-all line-clamp-1">
          {title}
        </h2>
        <p className=" line-clamp-2">{description}</p>
        <Link
          href={`/explore/${id}`}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "rounded-none text-sm py-2 px-3 w-full mt-1.5"
          )}
        >
          Read Research
        </Link>
      </div>
    </Card>
  );
};
