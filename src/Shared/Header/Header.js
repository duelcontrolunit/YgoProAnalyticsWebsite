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
            name: "Statistics"
        },
        {
            url: "/contact",
            name: "Contact"
        }
        
    ]

    renderPageName () {
        const pageName = this.urlToPagenameCorelation.find((el) => {
            return el.url === this.props.location.pathname
        }).name;
        return pageName || "Page not found";
    }

  render() {
    return (
      <div className="Header">
        <div className="headerBg" />
        <div className="pageName">{this.renderPageName()}</div>
      </div>
    );
  }
}

export default Header;
