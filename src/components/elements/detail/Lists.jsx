const DetailLists = ({ className, children, ...rest }) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export default DetailLists;
