import React from 'react';

const BanlistResult = (props) => {
    return ( 
        <div className="BanlistResult" onClick={props.clickHandler}>
            <div className="name">{props.name}</div>
            <div className="date">
                <div className="desc">Release date:</div>
                <div className="data">{props.date}</div>
                
                <div className="desc">Games:</div>
                <div className="data">{props.games}</div>
            </div>
        </div>
     );
}
 
export default BanlistResult;