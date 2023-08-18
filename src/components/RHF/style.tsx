import { FormLabel, Input, styled, TextField } from "@mui/material";

export const StyledLabel = styled(FormLabel)({
  color: "black",
  fontFamily: "_SegoeUINormal",
  fontSize: "12px",
});

export const StyledInput = styled(Input)(({ theme, error }) => ({
  color: "black",
  fontFamily: "_SegoeUINormal",
  fontSize: "13px",
  ml: 0.5,
  marginTop: "0 !important",

  "& .MuiSvgIcon-root": {
    fontSize: "14px",
    color: error ? theme.palette.error.main : "#A4A4A4",
  },
}));

export const StyledDateTextField = styled(TextField)(({ theme, error }) => ({
  color: "black",
  fontFamily: "_SegoeUINormal",
  ml: 0.5,
  "& .MuiSvgIcon-root": {
    fontSize: "14px",
    color: error ? theme.palette.error.main : "#A4A4A4",
  },
  "& .MuiInputBase-input": {
    fontSize: "13px",
  },
  "& .MuiFormHelperText-root": {
    margin: 0,
    position: "absolute",
    top: 0,
    right: 0,
  },
}));
