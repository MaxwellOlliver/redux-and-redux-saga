import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';

import './config/reactotronConfig';

import Globals from './styles/global';
import Header from './components/Header';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <Globals />
        <ToastContainer autoClose={6000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
