import { getSingleJobApi } from "@/api/getSingleJobApi";
import { updateHiringStatusApi } from "@/api/updateHiringStatusApi";
import ApplyResume from "@/components/ApplyResume";
import ShowApplyResumes from "@/components/ShowApplyResumes";
import ShowSingleJobP from "@/components/ShowSingleJobP";
import useFetchHook from "@/hooks/useFetchHook";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleJobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  // get single job
  const {
    fn: getSingleJobfn,
    data: getSingleJob,
    loading: getSingleJobLoading,
  } = useFetchHook(getSingleJobApi, { job_id: id });

  // update hiring status
  const { fn: updateJobHiringStatusfn } = useFetchHook(updateHiringStatusApi, {
    job_id: id,
  });

  const handleHiringStatus = (value) => {
    const isOpen = value === "open";
    updateJobHiringStatusfn(isOpen).then(() => getSingleJobfn());
  };

  useEffect(() => {
    if (isLoaded) getSingleJobfn();
  }, [isLoaded]);

  if (!isLoaded || getSingleJobLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-16 py-6 flex flex-col gap-10">
      {/* ✅ SINGLE JOB DETAILS */}
      <div className="w-full max-w-5xl mx-auto">
        <ShowSingleJobP
          getSingleJob={getSingleJob}
          handleHiringStatus={handleHiringStatus}
          user={user}
        />
      </div>

      {/* ✅ APPLY RESUME SECTION (Only for candidates) */}
      {getSingleJob?.recruiter_id !== user.id && (
        <div className="w-full max-w-4xl mx-auto">
          <ApplyResume
            getSingleJob={getSingleJob}
            user={user}
            getSingleJobfn={getSingleJobfn}
            applied={getSingleJob?.applications?.find(
              (app) => app.candidate_id === user.id
            )}
          />
        </div>
      )}

      {/* ✅ SHOW APPLICATIONS SECTION (Only for recruiter) */}
      {getSingleJob?.applications?.length > 0 &&
        getSingleJob?.recruiter_id === user.id && (
          <div className="w-full max-w-5xl mx-auto">
            <ShowApplyResumes getSingleJob={getSingleJob} />
          </div>
        )}
    </div>
  );
};

export default SingleJobPage;
