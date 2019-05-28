import React from 'react';

const SearchBar = (props) => {
    return ( 
        <div className="SearchBar">
            <input onChange={props.changeHandler} />
            <button onClick={props.clickHandler}><i className="fas fa-search"></i></button>
        </div>
     );
}
 
export default SearchBar;