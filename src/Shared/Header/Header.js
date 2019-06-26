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
        },
        {
            url: "/archetypelist",
            name: "Archetypes"
        },
        {
            url: "/banlists",
            name: "Banlists"
        }   ,
        {
            url: "/banlist",
            name: "Banlist"
        }   ,
        {
            url: "/archetype",
            name: "Archetype"
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

    redirectTo(url) {
      this.props.history.push(url);
    }

  render() {
    this.renderPageName();
    return (
      <div className="Header">
        
        <div className="headerBg" />
        <Logo clickHandler={() => {this.redirectTo("/")}} />

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
