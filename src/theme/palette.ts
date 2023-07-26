declare module "@mui/material/styles" {
  interface Palette {
    lighter: Palette["primary"];
    highlighter: Palette["primary"];
    prize: {
      first: string;
      second: string;
      third: string;
      normal: string;
    };
    date: {
      exam: String;
      lesson: String;
    };
    gradient: {
      light: String;
    };
  }
  interface TypeBackground {
    darker: string;
  }
  // allow configuration using `createTheme`
}

const palette = {
  primary: {
    main: "#222222",
  },
  secondary: {
    main: "#34251f",
  },
  lighter: {
    main: "#fff",
  },
  highlighter: {
    main: "#feb102",
    light: "#fee5aa",
  },
  prize: {
    first: "#feb102",
    second: "#adbece",
    third: "#e36600",
    normal: "#fff",
  },
  background: {
    default: "#9ABBC2",
    paper: "#e2e2e2",
    darker: "#f5f9fa",
  },
  date: {
    exam: "#5a7f8f",
    lesson: "#fe6c85",
  },
  gradient: {
    light: "linear-gradient(to right, #FCDC93, #f08ad3 75%)",
  },
};

export default palette;
