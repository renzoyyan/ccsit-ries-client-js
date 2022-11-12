import React from "react";
import Heading from "@/components/elements/Heading";
import Logs from "./Logs";

export const timeline = [
  {
    id: 531,
    content: "Research Proposal",
    date: "Sep 15",
    datetime: "2022-09-15",
    file: true,
  },
  {
    id: 1,
    content: "In-house Review and Evaluation",
    date: "Sep 20",
    datetime: "2022-09-20",
    file: false,
  },
  {
    id: 2,
    content: "Summarized Counts and Suggestions",
    date: "Sep 22",
    datetime: "2022-09-22",
    file: true,
  },
  {
    id: 3,
    content: "Compliance Checklist",
    date: "Sep 28",
    datetime: "2022-09-28",
    file: true,
  },
];

const onGoing = [
  {
    id: 1,
    content: "Permit to Conduct",
    date: "Sep 30",
    datetime: "2022-09-30",
    file: false,
  },
];

const completed = [
  {
    id: 2,
    content: "In-house Review and Evaluation",
    date: "Sep 28",
    datetime: "2022-09-28",
    file: false,
  },
  {
    id: 3,
    content: "Compliance Checklist",
    date: "Sep 28",
    datetime: "2022-09-28",
    file: true,
  },
];

const ActivityLogs = ({ children }) => {
  return (
    <section
      aria-labelledby="project-logs-title"
      className="2xl:col-span-1 2xl:col-start-3"
    >
      <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:px-6">
        {children}
      </div>
    </section>
  );
};

export default ActivityLogs;
