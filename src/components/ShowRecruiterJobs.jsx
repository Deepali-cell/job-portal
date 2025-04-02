import { getRecruiterPostJobsApi } from "@/api/getRecruiterPostJobsApi";
import useFetchHook from "@/hooks/useFetchHook";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { Loader2 } from "lucide-react";

const ShowRecruiterJobs = () => {
  const { isLoaded, user } = useUser();
  const {
    fn: getrecruiterpostjobFn,
    data: getrecruiterpostjob,
    loading: getrecruiterpostjobLoading,
  } = useFetchHook(getRecruiterPostJobsApi, { recruiter_id: user.id });

  useEffect(() => {
    if (isLoaded) getrecruiterpostjobFn();
  }, [isLoaded]);

  if (!isLoaded || getrecruiterpostjobLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }
  return (
    <>
      {!getrecruiterpostjobLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {getrecruiterpostjob?.length ? (
            getrecruiterpostjob.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobAction={getrecruiterpostjobFn}
                isMyJob={true}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No Jobs Found...
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShowRecruiterJobs;
