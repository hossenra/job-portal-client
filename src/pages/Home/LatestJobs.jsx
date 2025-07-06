import { useEffect, useState } from "react";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
        {jobs.map((job) => (
          <LatestJobCard key={job._id} job={job}></LatestJobCard>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
