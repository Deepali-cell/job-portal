import React from "react";
import ApplicationCard from "./ApplicationCard";

const ShowApplyResumes = ({ getSingleJob }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getSingleJob?.applications?.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            getSingleJob={getSingleJob}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowApplyResumes;
