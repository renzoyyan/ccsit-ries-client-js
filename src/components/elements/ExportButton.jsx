import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "./Button";

const ExportButton = ({ pdfRef, exportCallback }) => {
  return (
    <div className="text-right">
      <a ref={pdfRef} />
      <Button
        className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white rounded-md shadow-sm bg-bc-primary gap-x-2 hover:opacity-90"
        onClick={exportCallback}
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        <span>Export</span>
      </Button>
    </div>
  );
};

export default ExportButton;
