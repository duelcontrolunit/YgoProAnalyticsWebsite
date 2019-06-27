import React, { Component } from 'react';

class AboutPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="About">
                <div className="info">
                    <div className="paragraph">YGOProAnalytics was created to give Yu-Gi-Oh players a proper insight into meta, deckbuilding.</div>
                    <div className="paragraph">This tool is helpful for both beginners looking for new deck as well as pro players looking for a detailed insight of the meta on YGOPro servers.</div>
                    <div className="paragraph">We hope our project will give players tons of valuable data in a simple and easy to understand way.</div>
                    <div className="paragraph">If you wish lo learn more, visit our GitHub page:</div>
                    <div className="paragraph"><a href="https://github.com/duelcontrolunit">https://github.com/duelcontrolunit</a></div>
                </div>
            </div>
         );
    }
}
 
export default AboutPage;