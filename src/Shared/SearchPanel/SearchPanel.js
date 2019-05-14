import React, { Component } from 'react';

class SearchPanel extends Component {
    state = { 
        contentState: ""
     }

    toggleContent() {
        if(this.state.contentState === "") this.setState({contentState: "active"});
        else this.setState({contentState: ""});
    }

    render() { 
        return ( 
            <div className="SearchPanel">
                <div className="toggleButton" onClick={() => {this.toggleContent()}} >Search properties</div>

                <div className={"content " + this.state.contentState}>
                    {this.props.children}
                </div>
            </div>
         );
    }
}
 
export default SearchPanel;