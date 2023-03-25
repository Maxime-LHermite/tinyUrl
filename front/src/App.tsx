import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';
import { createRoot } from 'react-dom/client';
import { Logger } from './Logger';
import { useWindowDimensionsChange } from './hooks/useResize';
import { Translation } from './ui/components/Translation';
import { injectGlobal } from '@emotion/css';
import { Fonts } from './assets/fonts/Fonts';
import { AppRoutes } from './Routes';
import { CustomBrowserRouter } from './ui/components/CustomBrowserRouter';
import { Authentication } from './ui/components/Authentication';

export const App: React.FC = () => {
    useWindowDimensionsChange();

    return (
        <Translation>
            <Authentication>
                <CustomBrowserRouter>
                    <AppRoutes />
                </CustomBrowserRouter>
            </Authentication>
        </Translation>
    );
};

const rootElement = document.getElementById('app');

if (rootElement) {
    createRoot(rootElement, {
        onRecoverableError: Logger.warnValueDebug('App'),
        identifierPrefix: 'react',
    }).render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

injectGlobal`
  #app {
    width: 100%;
    height: 100%;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url(${Fonts.Roboto.Regular}) format('truetype');;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url(${Fonts.Roboto.Bold}) format('truetype');;
  }

  body {
    font-family: 'Roboto', 'Source Sans Pro', 'Trebuchet MS', 'Lucida Grande', 'Bitstream Vera Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
    color: rgba(0, 0, 0, 0.87);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;
