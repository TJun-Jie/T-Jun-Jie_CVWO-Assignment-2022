import {createTheme} from '@mui/material/styles';


const palette = {
    primary: {
        main: "#F3F4F8",
        contrastText: "#fff",
    },
    secondary: {
        main: "#333333",
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
