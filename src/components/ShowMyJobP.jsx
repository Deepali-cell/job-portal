import { useUser } from "@clerk/clerk-react";
import React from "react";
import ShowCandidateApplications from "./ShowCandidateApplications";
import ShowRecruiterJobs from "./ShowRecruiterJobs";

const ShowMyJobP = () => {
  const { user } = useUser();
  return (
    <>
      <div>
        {user?.unsafeMetadata?.role === "candidate" ? (
          <ShowCandidateApplications />
        ) : (
          <ShowRecruiterJobs />
        )}
      </div>
    </>
  );
};

export default ShowMyJobP;
