import "@fontsource-variable/open-sans";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans Variable', sans-serif",
    htmlFontSize: 10,
  },
  palette: {
    mode: "dark",
    text: {
      primary: "#fff",
    },
    background: {
      default: "#222831",
      paper: "#393E46",
    },
    secondary: {
      main: "#444e55",
    },
  },
  breakpoints: {
    unit: "em",
    values: {
      xs: 0,
      sm: 40,
      md: 48,
      lg: 64,
      xl: 80,
    },
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            "& .MuiFilledInput-root": {
              backgroundColor: "#222831",
            },
            "& .MuiFilledInput-root:after": {
              borderBottom: "2px solid white",
            },
            "& .MuiFilledInput-root.Mui-focused": {
              backgroundColor: "#222831",
            },
            "& .MuiFilledInput-root:hover": {
              backgroundColor: "none",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "text" },
          style: {
            color: "white",
          },
        },
      ],
    },
    MuiSelect: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            backgroundColor: "#222831",
          },
        },
      ],
    },
  },
});
