import { getJobs, getMyJobs } from "@/Api/api";
import useFetch from "@/Hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/job-card";
import { getCompanies } from "@/Api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, seLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  
  const {
    fn: fnJobs,
    data: jobs = [], // Ensure jobs are initialized as an empty array
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const {
    fn: fnCompanies,
    data: companies = [], // Ensure companies are initialized as an empty array
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };
  const handleFilter = () => {
    setCompany_id("");
    seLocation("");
    setSearchQuery("");
  };
  
  return (
    <div>
      <h1 className="gradient-title text-6xl text-center sm:text-7xl pb-8 font-extrabold">
        Latest Jobs
      </h1>
      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-4 items-center mb-4"
      >
        <Input
          type="text"
          placeholder="Search Job by title..."
          className="h-full flex-1 px-4 text-md"
          name="search-query"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => seLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location.." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("PK").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company.." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="destructive" className="sm:w-1/2" onClick={handleFilter}>
          Clear Filters
        </Button>
      </div>

      {/* Loader for loading jobs */}
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {/* Jobs listing */}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-2 gap-4">
          {jobs.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              
              />
            ))
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
