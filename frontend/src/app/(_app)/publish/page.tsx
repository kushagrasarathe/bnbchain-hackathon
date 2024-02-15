import React from "react";
import PublishResearchForm from "./PublishResearchForm";

export default function JoinPage() {
  return (
    <div className="space-y-5 py-6">
      <div className="space-y-1">
        <h1 className=" text-2xl font-semibold">Apply to Join PeerSci</h1>
        <p>
          Complete the form below to share your research interests and
          background, and propose your entry into PeerSci.
          {/* DAO members will review and vote your proposal to grant you entry in
          PeerSci */}
        </p>
      </div>
      <PublishResearchForm />
    </div>
  );
}
