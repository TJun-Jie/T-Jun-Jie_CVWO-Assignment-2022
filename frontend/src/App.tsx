import React from 'react';
import './App.css';
import theme from "./layouts/basicTheme";
import MainRouter from "./MainRouter";
import {ThemeProvider} from "@mui/material/styles";
import history from "./history";
import {Auth0Provider} from "./react-auth0-spa";
import config from "./auth_config.json";

// @ts-ignore
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
}

function App() {
    return (
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            // onRedirectCallback={onRedirectCallback}
        >
            <ThemeProvider theme={theme}>
                <MainRouter/>
            </ThemeProvider>
        </Auth0Provider>
    );
}

export default App;
