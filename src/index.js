import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
import config, {auth0_config} from './config'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider

    // * this works but exposes the key
    domain='dev-7uyk26j2.us.auth0.com'
    clientId='ZKyDTvI7Tymi7OKJiU5VPwxi8qdQDxA7'
    redirectUri={window.location.origin}
cacheLocation='localStorage'
    >

    <GithubProvider>
      <App />
    </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

