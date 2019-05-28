import React from 'react';
import { ReactComponent as LogoSvg } from "./ygoProLogo.svg";

const Logo = (props) => {
    return ( 
        <div className="Logo">
            <LogoSvg className="svg" onClick={props.clickHandler} />
        </div>
     );
}
 
export default Logo;