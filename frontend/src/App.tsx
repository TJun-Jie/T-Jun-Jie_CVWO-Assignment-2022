import React from 'react';
import './App.css';
import theme from "./layouts/basicTheme";
import MainRouter from "./MainRouter";
import {ThemeProvider} from "@mui/material/styles";
import history from "./history";
import {Auth0Provider} from '@auth0/auth0-react';
import config from "./auth_config.json";

// @ts-ignore
const onRedirectCallback = (appState) => {
    history.replace(appState?.returnTo || window.location.pathname);
};

function App() {

    return (
        <Auth0Provider
            domain={config.domain}
            clientId={config.clientId}
            redirectUri={window.location.origin}
            audience={config.audience}
            onRedirectCallback={onRedirectCallback}
        >
            <ThemeProvider theme={theme}>
                <MainRouter/>
            </ThemeProvider>
        </Auth0Provider>
    );
}

export default App;
