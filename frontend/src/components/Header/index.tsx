import React, { ReactNode, useState } from 'react'
import { StyledHeader } from './style';
import { AnyComponent } from 'styled-components/dist/types';

export const Header =  ({children}:any) => {
    const [active, setMode] = useState(false);
    const toggleMode = () => {
    setMode(!active);
    }
  return (

       <StyledHeader>
            {children}
       </StyledHeader>
   
  );
}

