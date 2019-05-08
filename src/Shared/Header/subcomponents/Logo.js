import React from 'react';
import { ReactComponent as LogoSvg } from "./ygoProLogo.svg";

const Logo = () => {
    return ( 
        <div className="Logo">
            <LogoSvg className="svg" />
        </div>
     );
}
 
export default Logo;