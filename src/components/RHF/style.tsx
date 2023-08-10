import {
  Input,
  styled,
  FormControl,
  FormHelperText,
  InputProps,
  InputLabel,
  TextField,
} from "@mui/material";

export const StyledInput = styled(Input)(({ theme, error }) => ({
  color: "black",
  fontFamily: "_SegoeUINormal",
  fontSize: "13px",
  ml: 0.5,
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
  "& .MuiFormLabel-root": {
    color: "black",
    fontFamily: "_SegoeUINormal",
    fontSize: "16px",
    mb: 1,
  },
  "& .MuiFormHelperText-root": {
    margin: 0,
    position: "absolute",
    top: 0,
    right: 0,
  },
}));
