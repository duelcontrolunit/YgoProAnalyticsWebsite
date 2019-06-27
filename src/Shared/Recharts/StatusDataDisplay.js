import React from 'react';

const StatusDataDisplay = (props) => {
    return ( 
        <div className={ props.status ? "StatusDataDisplay true" : "StatusDataDisplay false"}>
            <div className="description">{props.children}</div>
            <div className="dataContainer">
                <div className="data">{props.data}</div>
            </div>
        </div>
     );
}
 
export default StatusDataDisplay;