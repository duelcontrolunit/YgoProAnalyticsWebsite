import React from 'react';

const PageContainer = (props) => {
    return ( 
        <div className="PageContainer">
            {/* <div className="pageName">{props.pageName}</div> */}
            <div className="pageContent">{props.children}</div>
        </div>
     );
}
 
export default PageContainer;