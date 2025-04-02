import { getCandidateApplicationsApi } from "@/api/getCandidateApplicationsApi";
import useFetchHook from "@/hooks/useFetchHook";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import ShowApplyResumes from "./ShowApplyResumes";
import ApplicationCard from "./ApplicationCard";

const ShowCandidateApplications = () => {
  const { isLoaded, user } = useUser();
  const {
    fn: getcandidateapplicationFn,
    data: applications,
    loading: getcandidateapplicationLoading,
  } = useFetchHook(getCandidateApplicationsApi, { user_id: user.id });

  useEffect(() => {
    if (isLoaded) getcandidateapplicationFn();
  }, [isLoaded]);

  if (!isLoaded || getcandidateapplicationLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }
  console.log(applications);
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Applications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications?.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              isCandidate={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowCandidateApplications;
