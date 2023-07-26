import React from "react";
import { Link, LinkProps } from "@mui/material";

const CustomLink = <C extends React.ElementType>(
  props: LinkProps<C, { component?: C }>
) => {
  return <Link {...props} />;
};

export default CustomLink;
