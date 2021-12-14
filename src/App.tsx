import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ThemeProvider} from "@material-ui/core";
import theme from "./layouts/basicTheme";
import HomePage from "./pages/HomePage";
function App() {
  return (
      <ThemeProvider theme={theme}>
        <HomePage></HomePage>
      </ThemeProvider>
  );
}

export default App;
