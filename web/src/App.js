import React from 'react';
import './config/ReactotronConfig';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Menubar from './components/MenuBar';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import Routes from './routes';
import GlobalStyle from './styles/global';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Menubar />
        <GlobalStyle />
        <Routes />
        <Footer />
        <Copyright />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
