import React, { Component } from "react";
import Logo from "./subcomponents/Logo";

class Header extends Component {
  state = {};

    urlToPagenameCorelation = [
        {
            url: "/",
            name: "Main Page"
        },
        {
            url: "/decklist",
            name: "Decklist"
        },
        {
            url: "/stats",
            name: "Server statistics"
        },
        {
            url: "/contact",
            name: "Contact"
        },
        {
            url: "/deck",
            name: "Deck"
        }        
    ];

    currentPath = "default";
    previousPath = "";

    renderPageName () {

        const corelation = this.urlToPagenameCorelation.find((el) => {
            return el.url === this.props.location.pathname
        });

        const pageName = corelation ? corelation.name : "Not Found";

        if(pageName !== this.currentPath)
        {
          this.previousPath = this.currentPath;
          this.currentPath = pageName || "Page not found";
        }
    }

  render() {
    this.renderPageName();
    return (
      <div className="Header">
        
        <div className="headerBg" />
        <Logo />

        <div className="pageName enter" key={this.currentPath}>
          <div className="innerText">{this.currentPath}</div>
        </div>

        <div className="pageName leave" key={this.previousPath}>
          <div className="innerText">{this.previousPath}</div>
        </div>

      </div>
    );
  }
}

export default Header;
