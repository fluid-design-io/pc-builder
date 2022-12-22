import * as React from "react";

import clsxm from "../../lib/clsxm";
import UnstyledLink, { UnstyledLinkProps } from "./UnstyledLink";

const HeaderLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          "inline-flex items-center",
          "font-medium text-gray-700 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300",
          "focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default HeaderLink;
