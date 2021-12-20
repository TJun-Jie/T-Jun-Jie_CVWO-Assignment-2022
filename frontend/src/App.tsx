import React from 'react';
import './App.css';
import theme from "./layouts/basicTheme";
import MainRouter from "./MainRouter";
import {ThemeProvider} from "@mui/material/styles";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MainRouter/>
        </ThemeProvider>

    );
}

export default App;
