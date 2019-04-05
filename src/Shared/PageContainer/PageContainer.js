import React from 'react';

const PageContainer = (props) => {
    return ( 
        <div className="PageContainer">
            <div className="pageContent">{props.children}</div>
        </div>
     );
}
 
export default PageContainer;