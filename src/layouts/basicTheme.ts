import { createTheme } from "@material-ui/core";

const palette = {
  primary: {
    main: "#1c1c1c",
    contrastText: "#fff",
  },
  secondary: {
    main: "#FC4445",
    contrastText: "#fff",
  },
};

const basicTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: 'Robotto',
  },
  palette,
});

export default basicTheme;
