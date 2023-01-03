import Button from "@/components/elements/Button";
import StatusCard from "@/components/elements/StatusCard";
import { classNames, formattedDate } from "@/utils/utils";
import LogModal from "./modal/LogModal";

const Logs = ({ logs }) => {
  return (
    <div className="space-y-6">
      <ul role="list" className="-mb-8">
        {logs?.map((log, itemIdx) => (
          <li key={log._id}>
            <div className="relative pb-8">
              {itemIdx !== logs.length - 1 ? (
                <span
                  className="absolute top-4 left-2 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      "h-4 w-4 rounded-full flex items-center justify-center ring-8 ring-white bg-bc-secondary"
                    )}
                  />
                </div>
                <div className="flex justify-between flex-1 min-w-0 space-x-4 pb-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {log.log_title}
                    </p>
                    {log?.file?.url ? (
                      <a href={log.file.url} download>
                        <button
                          type="button"
                          className="block text-xs font-medium cursor-pointer text-bc-tertiary hover:underline"
                        >
                          Download file
                        </button>
                      </a>
                    ) : null}
                  </div>

                  <div className="text-xs text-right text-gray-500 whitespace-nowrap space-y-0.5">
                    {/* <time dateTime={log.datetime}>{log.datetime}</time> */}

                    {log?.date_completion && (
                      <span>{formattedDate(log.date_completion)}</span>
                    )}
                    <h4>
                      by:{" "}
                      <span className="capitalize">
                        {`${log.created_by.first_name} ${log.created_by.last_name}`}
                      </span>
                    </h4>

                    {/* {log?.ongoing && <LogModal {isOpen} />} */}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
