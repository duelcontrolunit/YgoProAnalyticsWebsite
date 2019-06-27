import React from 'react';

const ArchetypeResult = (props) => {
    return ( 
        <div className="ArchetypeResult" onClick={props.clickHandler}>
            <div className="name">{props.name}</div>
            <div className="gamesWinData">
                <div className="games"><div className="desc">Games:</div><div className="data">{props.games}</div></div>
                <div className="win"><div className="desc">Wins:</div><div className="data">{props.wins}</div></div>
            </div>
        </div>
     );
}
 
export default ArchetypeResult;