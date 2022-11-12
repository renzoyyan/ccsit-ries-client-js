const Header = ({ className, title, children }) => {
  return (
    <th scope="col" className={className}>
      {title}
      {children}
    </th>
  );
};

export default Header;
