import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider as AuthProvider } from './Context/AuthContext';
import { Provider as UrlProvider } from './Context/UrlsContext';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { IconContext } from "react-icons";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UrlProvider>
        <BrowserRouter>
          <ThemeProvider>
            <CSSReset />
            <IconContext.Provider value={{ color: "blue", className: "global-class-name", style: { margin: 5, cursor: 'pointer' } }}>
              <App />
            </IconContext.Provider>
          </ThemeProvider>
        </BrowserRouter>
      </UrlProvider>
    </AuthProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
