import React from "react";
import {
  CustomSelect,
  StyledOption,
} from "../../components/CustomComponent/CustomSelect";
const SelectClass = () => {
  return (
    <CustomSelect defaultValue={10}>
      <StyledOption value={10}>Documentation</StyledOption>
      <StyledOption value={20}>Components</StyledOption>
      <StyledOption value={30}>Features</StyledOption>
    </CustomSelect>
  );
};

export default SelectClass;
