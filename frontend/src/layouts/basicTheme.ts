import {createTheme} from "@mui/material/styles";

const palette = {
    primary: {
        main: "#F3F4F8",
        contrastText: "#fff",
        dark: "#545353",
    },
    secondary: {
        main: "#3B3B3B",
        dark: "#222222",
        light: "#e1e1e1",
        contrastText: "#fff",
    },
};

const basicTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
        fontFamily: "Robotto",
    },
    palette,
});

export default basicTheme;
