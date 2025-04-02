import { getCompaniesApi } from "@/api/getCompaniesApi";
import { getJobList } from "@/api/getJobListApi";
import JobListP from "@/components/JobListP";
import useFetchHook from "@/hooks/useFetchHook";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const JobListPage = () => {
  const { isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
  const [company_id, setcompany_id] = useState("");

  // get job
  const {
    fn: joblistFn,
    data: joblistData,
    loading: joblistLoading,
    error: joblistError,
  } = useFetchHook(getJobList, { location, searchQuery, company_id });

  // get company
  const { fn: getcompanyfn, data: companies } = useFetchHook(getCompaniesApi);

  useEffect(() => {
    if (isLoaded) getcompanyfn();
  }, [isLoaded]);

  
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements["search-query"].value.trim();
    setsearchQuery(query);
  };
  useEffect(() => {
    if (isLoaded) joblistFn();
  }, [isLoaded, location, searchQuery, company_id]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <JobListP
      joblistData={joblistData}
      joblistLoading={joblistLoading}
      joblistError={joblistError}
      handleSearch={handleSearch}
      location={location}
      setLocation={setLocation}
      companies={companies}
      company_id={company_id}
      setcompany_id={setcompany_id}
      setsearchQuery={setsearchQuery}
    />
  );
};

export default JobListPage;
