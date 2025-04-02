import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import useFetchHook from "@/hooks/useFetchHook";
import { candidateJobStatusApi } from "@/api/CandidateJobStatusApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ApplicationCard = ({
  getSingleJob,
  application,
  isCandidate = false,
}) => {
  const { fn: updateCandidateJobStatusfn } = useFetchHook(
    candidateJobStatusApi,
    {
      job_id: application.job_id,
    }
  );

  const handlecandidateapplicationstatus = (status) => {
    updateCandidateJobStatusfn(status);
  };
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-200 rounded-xl p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
          {isCandidate ? (
            <span>
              {getSingleJob ? getSingleJob?.title : application?.job?.title} at{" "}
              {getSingleJob
                ? getSingleJob?.company?.name
                : application?.job?.company?.name}
            </span>
          ) : (
            <span>{application.name}</span>
          )}
        </CardTitle>
        <p className="text-gray-500 text-sm">{application.education}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium">
          Experience: {application.experience} years
        </p>
        <p className="text-sm font-medium">Skills: {application.skills}</p>
        {isCandidate ? (
          <p className="text-sm font-medium flex items-center">
            Status:{" "}
            <Badge variant="secondary" className="ml-2">
              {application.status}
            </Badge>
          </p>
        ) : (
          <Select
            defaultValue={application.status}
            onValueChange={handlecandidateapplicationstatus}
          >
            <SelectTrigger
              className={` w-full md:w-64 border-gray-300 shadow-sm focus:ring-blue-500`}
            >
              <SelectValue placeholder="Application status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"applied"}>applied</SelectItem>
              <SelectItem value={"interviewed"}>interviewed</SelectItem>
              <SelectItem value={"rejected"}>rejected</SelectItem>
              <SelectItem value={"hired"}>hired</SelectItem>
            </SelectContent>
          </Select>
        )}

        <a
          href={application.resume}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Resume
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
