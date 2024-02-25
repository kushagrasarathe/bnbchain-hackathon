import React from "react";
import PublishResearchForm from "./PublishResearchForm";

export default function JoinPage() {
  return (
    <div className="space-y-5 py-6">
      <div className="space-y-1">
        <h1 className=" text-2xl font-semibold">Publish Your Research Work</h1>
        <p>
          Fill out the form below to publish your research paper on PeerSci.
        </p>
      </div>
      <PublishResearchForm />
    </div>
  );
}
