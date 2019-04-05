import React, { Component } from "react";

class Header extends Component {
  state = {};

    urlToPagenameCorelation = [
        {
            url: "/",
            name: "Main Page"
        },
        {
            url: "/decklist",
            name: "Decklists"
        },
        {
            url: "/stats",
            name: "Server statistics"
        },
        {
            url: "/contact",
            name: "Contact"
        }
        
    ];

    currentPath = "default";
    previousPath = "";

    renderPageName () {
        const pageName = this.urlToPagenameCorelation.find((el) => {
            return el.url === this.props.location.pathname
        }).name;
        console.log(this.props.location);
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
