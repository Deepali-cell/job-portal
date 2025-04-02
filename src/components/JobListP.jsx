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
      searchInputRef.current.value = ""; // Clear input field
    }
  };

  return (
    <div className="px-6">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Latest Jobs
        </h1>
      </div>

      {/* Search Form */}
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 mb-6 w-full"
        >
          <Input
            ref={searchInputRef}
            type="text"
            name="search-query"
            placeholder="Search jobs..."
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Search
          </Button>
        </form>

        {/* Filters & Clear Button in One Row */}
        <div className="flex flex-wrap items-center justify-between mb-6 w-full">
          {/* Location Filter */}
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full md:w-64 border-gray-300 shadow-sm focus:ring-blue-500">
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

          {/* Company Filter */}
          <Select value={company_id} onValueChange={setcompany_id}>
            <SelectTrigger className="w-full md:w-64 border-gray-300 shadow-sm focus:ring-blue-500">
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

          {/* Clear Filters Button */}
          <Button
            onClick={clearQueries}
            className="bg-red-500 hover:bg-red-600 text-white"
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

      {/* Job Listings */}
      {!joblistLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
