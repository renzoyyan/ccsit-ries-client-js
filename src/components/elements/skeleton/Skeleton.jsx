import React, { useMemo } from "react";
import SkeletonRow from "./SkeletonRow";
import Row from "../table/Row";

export default function Skeleton({ rows = 5, columns, isLoading }) {
  const start = 1;
  let endRows = rows;
  let endCols = columns;
  return useMemo(() => {
    if (!isLoading) return null;

    return (
      <>
        {[...Array(endRows - start + 1).keys()].map((row) => (
          <Row variant="striped" key={row}>
            {[...Array(endCols - start + 1).keys()].map((col) => (
              <td key={col} className="tbl-data">
                <SkeletonRow />
              </td>
            ))}
          </Row>
        ))}
      </>
    );
  }, [isLoading, endCols, endRows]);
}
