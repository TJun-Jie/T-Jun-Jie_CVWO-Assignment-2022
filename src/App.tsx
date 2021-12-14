import React from 'react';
import './App.css';
import {ThemeProvider} from "@material-ui/core";
import theme from "./layouts/basicTheme";
import MainRouter from "./MainRouter";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MainRouter/>
        </ThemeProvider>
    );
}

export default App;
