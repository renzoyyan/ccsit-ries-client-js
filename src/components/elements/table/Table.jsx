import { classNames } from "@/utils/utils";

const Table = ({ className, children }) => {
  return (
    <div className={classNames("tbl", className)}>
      <div className="flex-grow overflow-x-auto">
        <div className="inline-block h-full min-w-full align-middle">
          <div className="relative overflow-hidden border border-gray-300 rounded-md shadow">
            <table className="relative h-full min-w-full divide-y divide-gray-300">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
