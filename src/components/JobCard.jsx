import { Heart, Loader2, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { JobSaveCheckApi } from "@/api/JobSaveCheckApi";
import useFetchHook from "@/hooks/useFetchHook";
import { deleteJobApi } from "@/api/deleteJobApi";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const {
    loading: loadingSavedJob,
    fn: fnSavedJob,
    data: savedJob,
  } = useFetchHook(JobSaveCheckApi);

  const handleSaveJob = async () => {
    if (!user || !job) {
      console.error("User or Job is missing!");
      return;
    }

    const saveData = {
      user_id: user?.id,
      job_id: job?.id,
    };

    if (!saveData.user_id || !saveData.job_id) {
      console.error("Error: Missing user_id or job_id!", saveData);
      return;
    }

    try {
      const result = await fnSavedJob(saveData, {});

      if (result !== null) {
        const isStillSaved = result.some(
          (entry) => entry.user_id === user?.id && entry.job_id === job?.id
        );

        setSaved(isStillSaved);

        if (!isStillSaved) {
          console.log("Job unsaved, refreshing list...");
          onJobAction(); // 🔥 Ensure the list updates when job is unsaved
        }
      }
    } catch (error) {
      console.error("Error in handleSaveJob:", error);
    }
  };

  const {
    fn: deletejobfn,
    error: deletejobError,
    loading: deletejobLoading,
  } = useFetchHook(deleteJobApi, { job_id: job.id });

  const handleDeleteJob = async () => {
    await deletejobfn();
    onJobAction();
  };
  useEffect(() => {
    if (savedJob !== undefined && user) {
      // Check if the current user has saved this job
      const isSavedByCurrentUser =
        Array.isArray(savedJob) &&
        savedJob.some(
          (savedEntry) =>
            savedEntry.user_id === user?.id && savedEntry.job_id === job?.id
        );

      setSaved(isSavedByCurrentUser);
    }
  }, [savedJob, user, job]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {deletejobLoading && (
            <div className="flex items-center justify-center h-screen ">
              <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
            </div>
          )}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}.
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
