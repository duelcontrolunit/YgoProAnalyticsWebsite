import React from 'react';

const LoadingIcon = props => {
    const classList = props.visible ? "LoadingIcon" : "LoadingIcon hidden";
    return ( 
        <div className={classList}>
            <div className="innerPart" />
        </div>
     );
}
 
export default LoadingIcon;