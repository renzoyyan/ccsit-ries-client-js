import { classNames } from "@/utils/utils";

const Row = ({ variant = "", className = "", children }) => {
  switch (variant) {
    case "striped":
      return (
        <tr
          className={classNames(
            "even:bg-white odd:bg-slate-50 hover:bg-slate-100",
            className
          )}
        >
          {children}
        </tr>
      );

    default:
      return <tr className={className}>{children}</tr>;
  }
};

export default Row;
