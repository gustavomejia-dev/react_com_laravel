import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LayoutPrincipal from './layout/LayoutPrincipal';

export const App = () => {
  return (
    <div className="App">
          <BrowserRouter>
           
                <Route  path="/:tenantId?" Component={LayoutPrincipal} />
            
        </BrowserRouter>
    </div>
  );
}

export default App;
