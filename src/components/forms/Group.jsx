import { classNames } from "@/utils/utils";

const Group = ({ className = "", children }) => {
  return <div className={classNames(className, "space-y-2")}>{children}</div>;
};

export default Group;
