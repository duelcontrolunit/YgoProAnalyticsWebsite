import React from 'react';

const NumberDataDisplay = (props) => {
    return ( 
        <div className="NumberDataDisplay">
            <h2>{props.children}</h2>
            <div className="data">{props.data}</div>
        </div>
     );
}
 
export default NumberDataDisplay;