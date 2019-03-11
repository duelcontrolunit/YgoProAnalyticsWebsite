import React, { Component } from 'react';
import NavButton from './NavButton';

class Nav extends Component {
    state = { 
        navCollapsed: true
     }

     toggleNavBar() {
         console.log(this.props);
         console.log("Nav changed");
         this.setState({
             navCollapsed: !this.state.navCollapsed
         });
     }

     navBtnClick(url) {
        this.props.history.push(url);
        this.setState({
            navCollapsed: true
        });
     }


    render() { 
        return ( 
            <div className={"Nav " + (this.state.navCollapsed ? "collapsed" : "")}>
                <NavButton clickHandler={() => {this.toggleNavBar()}} ><i className="fas fa-bars"></i></NavButton>

                <NavButton clickHandler={() => {this.navBtnClick("/")}} >Main Page</NavButton>
                <NavButton clickHandler={() => {this.navBtnClick("/decklist")}} >Decklist</NavButton>
                <NavButton clickHandler={() => {this.navBtnClick("/stats")}} >Statistics</NavButton>
                <NavButton clickHandler={() => {this.navBtnClick("/contact")}} >Contact</NavButton>                
            </div>
         );
    }
}
 
export default Nav;