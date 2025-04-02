import { getSaveJob } from "@/api/getSaveJob";
import JobCard from "@/components/JobCard";
import useFetchHook from "@/hooks/useFetchHook";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

const SaveJobPage = () => {
  const { isLoaded } = useUser();
  const {
    fn: getsavejobFn,
    data: getsavejobData,
    loading: getsavejobLoading,
  } = useFetchHook(getSaveJob);

  useEffect(() => {
    if (isLoaded) getsavejobFn();
  }, [isLoaded]);

  if (!isLoaded || getsavejobLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <>
      {!getsavejobLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 px-6">
          {getsavejobData && getsavejobData.length > 0 ? (
            getsavejobData.map((saveJob) => (
              <JobCard
                key={saveJob.id}
                job={saveJob?.job}
                savedInit={true}
                onJobAction={getsavejobFn}
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

export default SaveJobPage;
