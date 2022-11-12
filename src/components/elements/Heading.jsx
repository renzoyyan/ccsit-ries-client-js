import React from "react";
import { classNames } from "@/utils/utils";

const Header = ({ as, className, title, children, ...rest }) => {
  switch (as) {
    case "h1":
      return (
        <h1 className={classNames(className)} {...rest}>
          <span>{title}</span>
          {children}
        </h1>
      );

    case "h2":
      return (
        <h2 className={classNames(className)} {...rest}>
          <span>{title}</span>
          {children}
        </h2>
      );

    case "h3":
      return (
        <h3 className={classNames(className)} {...rest}>
          <span>{title}</span>
          {children}
        </h3>
      );

    case "h4":
      return (
        <h4 className={classNames(className)} {...rest}>
          <span>{title}</span>
          {children}
        </h4>
      );

    case "h5":
      return (
        <h5 className={classNames(className)} {...rest}>
          <span>{title}</span>
          {children}
        </h5>
      );

    case "h6":
      return (
        <h6 className={classNames(className)} {...rest}>
          <span>{title}</span>
          {children}
        </h6>
      );

    default:
      return null;
  }
};

export default Header;
