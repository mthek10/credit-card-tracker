import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import { WalletProvider } from './context/WalletContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
