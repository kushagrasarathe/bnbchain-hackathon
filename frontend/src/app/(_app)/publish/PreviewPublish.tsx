import React from "react";
import { PublishResearchFormValues } from "./PublishResearchForm";
import { Badge } from "@/components/ui/badge";

export default function PreviewPublish({
  title,
  institution,
  abstract,
  introduction,
  methodology,
  results,
  discussion,
  conclusion,
  references,
  fundingSource,
  acknowledgments,
  researchPaper,
}: PublishResearchFormValues) {
  const allFieldsEmpty = ([...props]) => props.every((prop) => !prop);

  const isFormEmpty = allFieldsEmpty([
    title,
    institution,
    abstract,
    introduction,
    methodology,
    results,
    discussion,
    conclusion,
    references,
    fundingSource,
    acknowledgments,
    researchPaper,
  ]);

  if (isFormEmpty) {
    return (
      <div className="">
        Please fill out the publish form fields to preview them here.
      </div>
    );
  }

  return (
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
            <div className="text-lg font-semibold">Funding {`Source(s)`}</div>
            <p>{fundingSource}</p>
          </div>
        )}

        {acknowledgments && (
          <div className="space-y-2">
            <div className="text-lg font-semibold">Acknowledgments</div>
            <p>{acknowledgments}</p>
          </div>
        )}

        {/* <div>
          <div className="text-lg font-semibold">Institution</div>
          <p>{researchPaper}</p>
        </div> */}
      </div>
    </div>
  );
}
