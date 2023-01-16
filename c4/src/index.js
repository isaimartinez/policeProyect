import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App_Old';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'react-h5-audio-player/lib/styles.css';
import { Provider } from 'react-redux'
import {store} from 'redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);

