import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/Auth/AuthProvider';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const basename = 'teste'
const teste = 'teste';
root.render(
  <React.StrictMode>
    <AuthProvider>

      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
