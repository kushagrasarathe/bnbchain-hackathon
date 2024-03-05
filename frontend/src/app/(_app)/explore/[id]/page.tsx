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

export interface PublishResearchValues {
  ID: string;
  CID: string;
  ResearcherAddress: `0x${string}`;
  DateOfPublication: string;
  title: string;
  institution: string;
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  discussion: string;
  conclusion: string;
  references: string;
  fundingSource: string;
  acknowledgments: string;
  researchPaper: string;
}

export default function ResearchPage({ params }: { params: { id: string } }) {
  const { address: account, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [research, setResearch] = useState<PublishResearchValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        Id: Number(_id),
        ResearcherAddress: request.researcher,
        DateOfPublication: new Date(
          Number(request.dateOfPublication) * 1000
        ).toDateString(),
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
    <div className="md:py-12 py-5 flex items-start  gap-8 relative">
      <Card className="md:col-span-8 p-6 md:p-8 rounded-none border border-neutral-700 shadow-[5px_5px_0px_0px] space-y-4 ">
        <div>
          <div className="space-y-5">
            <div className="flex items-center w-full justify-between flex-wrap gap-3">
              {research && (
                <h1 className="text-xl md:text-3xl font-semibold">
                  {research.title}
                </h1>
              )}
              {research && (
                <Badge variant={"outline"} className="font-semibold text-sm">
                  Institution: {research.institution}
                </Badge>
              )}
              {research && <p>{research.DateOfPublication}</p>}
            </div>

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Abstract</div>
                <p>{research.abstract}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Introduction</div>
                <p>{research.introduction}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Methodology</div>
                <p>{research.methodology}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Results</div>
                <p>{research.results}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Discussion</div>
                <p>{research.discussion}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Conclusion</div>
                <p>{research.conclusion}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">References</div>
                <p>{research.references}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">
                  Funding {`Source(s)`}
                </div>
                <p>{research.fundingSource}</p>
              </div>
            )}

            {research && (
              <div className="space-y-2">
                <div className="text-lg font-semibold">Acknowledgments</div>
                <p>{research.acknowledgments}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
      <div className="md:sticky top-14 w-full space-y-8">
        <Card className="p-6 rounded-none border border-neutral-700 shadow-[5px_5px_0px_0px] space-y-4">
          <div className="space-y-2">
            <div className=" text-xl font-semibold">Support This Research</div>
            <p>
              Liked this research paper? Consider donating to support more
              science!
            </p>
          </div>
          {research && (
            <SupportResearchModal
              ResearcherAddress={research?.ResearcherAddress}
            />
          )}
        </Card>
        <div className="space-y-3">
          <div className=" text-xl font-semibold">More Resarch Papers</div>
          <div className="space-y-2.5">
            <MoreReseachPaperCard
              id="2"
              title="Exploring the Impact of Climate Change on Biodiversity Hotspots"
              description="This research investigates the effects of climate change on biodiversity hotspots, focusing on the tropics and other vulnerable regions. Through a combination of field observations, remote sensing data analysis, and ecological modeling, the study assesses changes in species distribution, habitat loss, and ecosystem dynamics. "
            />
            <Separator />
            <MoreReseachPaperCard
              id="0"
              title="Quantum Entanglement and Its Applications"
              description="This research explores the phenomenon of quantum entanglement and its potential applications in quantum computing, cryptography, and teleportation."
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
        <p className=" line-clamp-2">
          {description && description.slice(0, 200)}
        </p>
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
