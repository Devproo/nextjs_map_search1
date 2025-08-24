// components/JobsList.tsx
"use client";

import { Job, JobsListData } from "@/shared/Jobs";

type jobsListProps = {
  jobs?: Job[];
};
export default function JobsList({ jobs = JobsListData }: jobsListProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Available Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow rounded-xl p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
            <p className="mt-2 font-medium text-blue-600">{job.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
