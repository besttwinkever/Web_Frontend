import React from 'react'
import ReactDOM from 'react-dom/client'

import {store} from "./store";
import { Provider } from "react-redux";
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/Web_Frontend/service-worker.js");
  });
}