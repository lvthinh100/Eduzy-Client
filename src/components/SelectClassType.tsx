import React from "react";
import { CustomSelect, StyledOption } from "./CustomComponent/CustomSelect";

const SelectClassType = () => {
  return (
    <CustomSelect value={1}>
      <StyledOption value={1}>Luyện Thi</StyledOption>
      <StyledOption value={2}>Lớp 12 </StyledOption>
      <StyledOption value={3}>Lớp 11 </StyledOption>
      <StyledOption value={3}>Lớp 10 </StyledOption>
    </CustomSelect>
  );
};

export default SelectClassType;
