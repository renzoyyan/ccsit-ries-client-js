const Row = ({ variant, className, children }) => {
  switch (variant) {
    case "striped":
      return (
        <tr className={`${className} even:bg-white odd:bg-gray-100`}>
          {children}
        </tr>
      );

    default:
      return <tr className={className}>{children}</tr>;
  }
};

export default Row;
