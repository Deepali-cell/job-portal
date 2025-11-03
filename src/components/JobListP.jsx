import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import JobCard from "./JobCard";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { State } from "country-state-city";
import { Button } from "./ui/button";

const JobListP = ({
  joblistData,
  joblistLoading,
  handleSearch,
  location,
  setLocation,
  companies,
  company_id,
  setcompany_id,
  setsearchQuery,
}) => {
  const [jobs, setJobs] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setJobs(joblistData || []);
  }, [joblistData]);

  const clearQueries = () => {
    setLocation("");
    setcompany_id("");
    setsearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-16">
      {/* Heading */}
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold 
          bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
          text-transparent bg-clip-text text-center">
          Latest Jobs
        </h1>
      </div>

      {/* Search Form */}
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6 w-full max-w-2xl"
        >
          <Input
            ref={searchInputRef}
            type="text"
            name="search-query"
            placeholder="Search jobs..."
            className="border px-4 py-2 rounded-lg w-full"
          />
          <Button type="submit" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600">
            Search
          </Button>
        </form>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-4 mb-8 w-full">

          {/* Location */}
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full md:w-64 border-gray-300 shadow-sm">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {State.getStatesOfCountry("IN").map(({ name }) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Company */}
          <Select value={company_id} onValueChange={setcompany_id}>
            <SelectTrigger className="w-full md:w-64 border-gray-300 shadow-sm">
              <SelectValue placeholder="Filter by Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies?.map(({ name, id }) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          <Button
            onClick={clearQueries}
            className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Loader */}
      {joblistLoading && (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
        </div>
      )}

      {/* Job Cards Grid */}
      {!joblistLoading && (
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6 
          mb-10"
        >
          {jobs.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.savedJob?.length > 0}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No Jobs Found...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListP;
