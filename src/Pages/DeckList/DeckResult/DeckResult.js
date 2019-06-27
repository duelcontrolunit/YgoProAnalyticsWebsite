import React from 'react';

const DeckResult = (props) => {
    return ( 
        <div className="DeckResult" onClick={props.clickHandler}>
            <div className="name">{props.name}</div>
            <div className="date">
                <div className="desc">First played:</div>
                <div className="data">{props.date}</div>
            </div>
            <div className="gamesWinData">
                <div className="games"><div className="desc">Games:</div><div className="data">{props.games}</div></div>
                <div className="win"><div className="desc">Wins:</div><div className="data">{props.wins}</div></div>
            </div>
        </div>
     );
}
 
export default DeckResult;