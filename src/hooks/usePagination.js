import React, { useState } from "react";

const usePagination = (limitNumber = 10) => {
  const [page, setPage] = useState(1);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  let limit = limitNumber;

  return {
    page,
    handlePagination,
    limit,
  };
};

export default usePagination;
