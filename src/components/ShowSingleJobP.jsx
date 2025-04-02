import React from "react";
import {
  Briefcase,
  Building,
  MapPin,
  FileText,
  ListChecks,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ShowSingleJobP = ({ getSingleJob, handleHiringStatus, user }) => {
  if (!getSingleJob) return <p>No job details found.</p>;

  const {
    recruiter_id,
    title,
    company,
    location,
    requirements,
    description,
    isOpen,
    applications,
  } = getSingleJob;

  return (
    <div className=" mx-auto px-6 pb-6 shadow-lg rounded-lg ml-20 text-white">
      {/* Top Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Job Title */}
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-blue-600" size={24} />
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>

          {/* Company Details */}
          <div className="flex items-center gap-3 mb-4">
            {company?.logo_url && (
              <img
                src={company.logo_url}
                alt={company.name}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div className="flex items-center gap-2">
              <Building className="text-gray-400" size={20} />
              <span className="text-lg font-medium">{company?.name}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <MapPin className="text-red-500" size={20} />
            <span>{location}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Job Status */}
          <div className="flex items-center gap-2 text-gray-400">
            {isOpen ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
            <span className="text-lg">
              {isOpen ? "Job is Open" : "Job is Closed"}
            </span>
          </div>
          {recruiter_id === user.id && (
            <Select onValueChange={handleHiringStatus}>
              <SelectTrigger
                className={` w-full md:w-64 ${
                  isOpen ? "bg-green-800" : "bg-red-800"
                } border-gray-300 shadow-sm focus:ring-blue-500`}
              >
                <SelectValue
                  placeholder={
                    "Hiring Status" + (isOpen ? "Job is Open" : "Job is Closed")
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"open"}>Open</SelectItem>
                <SelectItem value={"close"}>Close</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Applicants Count */}
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="text-yellow-500" size={20} />
            <span className="text-lg">{applications.length} Applicants</span>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="mt-6 space-y-6">
        {/* Description */}
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <FileText className="text-green-500" size={20} />
            <h2 className="text-lg font-semibold">Job Description</h2>
          </div>
          <p className="text-gray-300">{description}</p>
        </div>

        {/* Requirements */}
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <ListChecks className="text-purple-500" size={20} />
            <h2 className="text-lg font-semibold">Requirements</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            {requirements.split("\n").map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowSingleJobP;
