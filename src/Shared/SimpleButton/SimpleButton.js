import React from 'react';

const SimpleButton = props => {
    return ( 
        <button className="SimpleButton" onClick={props.clickHandler}>
            {props.children}
        </button>
     );
}
 
export default SimpleButton;