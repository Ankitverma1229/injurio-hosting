import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import dotenv from "dotenv";
import {Auth0Provider} from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain = "dev-4bzr4ii18q0upu4j.us.auth0.com"
    clientId = "YgbbQeASaeAVoR4OBOdqVc7VluWMgCdJ"
    redirectUri= 'https://main--dapper-llama-40540e.netlify.app/'
  //   onRedirectCallback={(appState) => {
  //   if (appState && appState.targetUrl) {
  //     // Redirect to the target URL after login or logout
  //     window.location.href = appState.targetUrl;
  //   }
  // }}


    >
    <App />
    </Auth0Provider>
   
);

