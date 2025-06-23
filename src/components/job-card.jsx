import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import useFetch from "@/Hooks/use-fetch";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Heart, MapPin, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { deleteJob, saveJob } from "@/Api/api";
import MyJobs from "@/pages/my-jobs";
import { BarLoader } from "react-spinners";

const JobCard = ({ job, isMyJob, savedInit, onJobSaved = () => {} }) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJobs,
    data: savedjobs,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, { alreadySaved: saved });
  const { user } = useUser();
  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });
  const handleSavedJob = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };
  useEffect(() => {
    if (savedjobs !== undefined) setSaved(savedjobs?.length > 0);
  }, [savedjobs]);
  return (
    <Card className="flex flex-col">
      <CardHeader>
        {loadingDeleteJob && (
          <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
        )}
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            ></Trash2Icon>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPin size={15} />
            {job.location}
          </div>
        </div>
        <hr></hr>
        {job.description}
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
            onClick={handleSavedJob}
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red"></Heart>
            ) : (
              <Heart size={20}></Heart>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
