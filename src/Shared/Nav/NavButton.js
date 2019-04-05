import React from 'react';

const NavButton = (props) => {
    return ( 
        <div className="NavButton" onClick={props.clickHandler}>
            <div className="text">
            {props.children}
            </div>
        </div>
     );
}
 
export default NavButton;