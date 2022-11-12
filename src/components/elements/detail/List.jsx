import { classNames } from "@/utils/utils";

const List = ({
  label,
  text,
  className,
  labelClassName,
  listClassName,
  children,
}) => {
  return (
    <div className={classNames(className, "sm:col-span-1")}>
      <dt className={classNames(labelClassName, "detail-label")}>{label}</dt>
      <dd
        className={classNames(
          "mt-1 capitalize",
          text !== "N/A"
            ? "text-gray-900"
            : "text-sm font-medium text-gray-600",
          listClassName ? listClassName : "capitalize"
        )}
      >
        {text}
      </dd>
      {children}
    </div>
  );
};

export default List;
