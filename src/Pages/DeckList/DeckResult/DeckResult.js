import React from 'react';

const DeckResult = (props) => {
    return ( 
        <div className="DeckResult" onClick={props.clickHandler}>
            <div className="info name">{props.name}</div>
            {/* <div className="info prototype">{props.proto}</div> */}
            <div className="info date">{props.date}</div>
            {/* <div className="info author">{props.author}</div> */}
        </div>
     );
}
 
export default DeckResult;