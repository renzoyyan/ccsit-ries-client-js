import { classNames } from "@/utils/utils";

const Row = ({ variant = "", className = "", children }) => {
  switch (variant) {
    case "striped":
      return (
        <tr className={classNames("even:bg-white odd:bg-gray-100", className)}>
          {children}
        </tr>
      );

    default:
      return <tr className={className}>{children}</tr>;
  }
};

export default Row;
