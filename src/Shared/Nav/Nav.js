import React, { Component } from 'react';
import NavButton from './NavButton';

class Nav extends Component {
    state = { 
        navCollapsed: true
     }

     toggleNavBar() {
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

                <NavButton clickHandler={() => {this.navBtnClick("/decklist")}} >Decklist</NavButton>
                <NavButton clickHandler={() => {this.navBtnClick("/archetypelist")}} >Archetypes</NavButton>                
                <NavButton clickHandler={() => {this.navBtnClick("/banlistlist")}} >Banlists</NavButton>                
                <NavButton clickHandler={() => {this.navBtnClick("/about")}} >About us</NavButton>                
            </div>
         );
    }
}
 
export default Nav;