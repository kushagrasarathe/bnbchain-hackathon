import React from "react";
import JoinDaoForm from "./JoinDaoForm";

export default function JoinPage() {
  return (
    <div className="space-y-5 py-8">
      <div className="space-y-2">
        <h1 className=" text-3xl font-semibold">
          Create a Proposal to Join PeerSci
        </h1>
        <p>
          DAO members will review and vote your proposal to grant you entry in
          PeerSci
        </p>
      </div>
      <JoinDaoForm />
    </div>
  );
}
