import React from "react";
import { Stack } from "@mui/material";
import NumberList from "./NumberList";

type PropsType = {
  id: string;
};

const CodeFilling: React.FC<PropsType> = ({ id }) => {
  return (
    <Stack direction="row">
      {id.split("").map((num, index) => (
        <NumberList key={index} value={+num} />
      ))}
    </Stack>
  );
};

export default CodeFilling;
