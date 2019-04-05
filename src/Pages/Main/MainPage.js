import React, { Component } from 'react';
import BasicLineRechart from '../../Shared/Recharts/BasicLineRechart';
import NumberDataDisplay from './../../Shared/Recharts/NumberDataDisplay';

class MainPage extends Component {
    state = {  }

    usersOnServerData = [
        {data1: '8:00', activeUsers: 400},
        {data1: '10:00', activeUsers: 500},
        {data1: '12:00', activeUsers: 400},
        {data1: '14:00', activeUsers: 350},
        {data1: '16:00', activeUsers: 220},
        {data1: '18:00', activeUsers: 500},
    ];

    uniqueDecksNumber = 666;

    render() { 
        return ( 
            <div className="MainPage">
                <div className="siteDescription">
                    Welcome to YGO Analitics!
                </div>
                
            <BasicLineRechart data={this.usersOnServerData} />
            <NumberDataDisplay data={this.uniqueDecksNumber}>Number of unique decks in database:</NumberDataDisplay>

            </div>
         );
    }
}
 
export default MainPage;