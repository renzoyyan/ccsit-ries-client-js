import React from "react";

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
