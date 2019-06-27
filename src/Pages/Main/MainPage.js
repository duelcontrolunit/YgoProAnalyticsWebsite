import React, { Component } from 'react';
import BasicLineRechart from '../../Shared/Recharts/BasicLineRechart';
import NumberDataDisplay from './../../Shared/Recharts/NumberDataDisplay';
import Axios from 'axios';
import StatusDataDisplay from './../../Shared/Recharts/StatusDataDisplay';

class MainPage extends Component {
    state = { 
        usersOnServerData: [],
        microServerData: {
            numberOfClosedRooms: 0,
            numberOfOpenRooms: 0,
            numberOfPlayersInLobby: 0,
            numberOfPlayersWhichPlayNow: 0
        },
        serverIsOnline: false
     }

    uniqueDecksNumber = 666;

    microDataDownloadInterval;

    componentDidMount() {
        this.getMacroserverActivityData();
        this.getMicroserverActivityData();
        this.getCurrentServerStatus();

        this.microDataDownloadInterval = setInterval(() => {
            this.getMicroserverActivityData();
            this.getCurrentServerStatus();
        }, 1000 * 5);
    }

    componentWillUnmount() {
        clearInterval(this.microDataDownloadInterval);
    }

    getMacroserverActivityData() {
        Axios.get("https://localhost:44326/api/YgoProServerActivity")
        .then(res => {
            const newData = res.data.map(el => {
                return {
                    date: el.fromDate.split("T")[0].replace("-",".").replace("-","."),
                    numberOfGames: el.numberOfGames
                }
            });
            this.setState({usersOnServerData: newData});
        });
    }

    getMicroserverActivityData() {
        Axios.get("https://localhost:44326/api/YgoProServerActivity/ygoProServerActivityNow")
        .then(res => {
            this.setState({microServerData: res.data});
        });
    }

    getCurrentServerStatus() {
        Axios.get("https://localhost:44326/api/YgoProServerActivity/isOnline")
        .then(res => {
            console.log(res);
            this.setState({serverIsOnline: res.data});
        });
    }

    render() { 
        return ( 
            <div className="MainPage">
                <div className="siteDescription">
                    Welcome to YGO Analytics!
                </div>
                
                <BasicLineRechart data={this.state.usersOnServerData} dataKeyName="date" dataName="numberOfGames">Users live on Server</BasicLineRechart>
                <div className="simpleDataContainer">

                    <NumberDataDisplay data={this.state.microServerData.numberOfPlayersWhichPlayNow}>Players in game:</NumberDataDisplay>
                    <NumberDataDisplay data={this.state.microServerData.numberOfPlayersInLobby}>Players in lobby:</NumberDataDisplay>
                    <StatusDataDisplay data={this.state.serverIsOnline ? "online" : "offline"} status={this.state.serverIsOnline} >Server status:</StatusDataDisplay>
                    <NumberDataDisplay data={this.state.microServerData.numberOfOpenRooms}>Open server rooms:</NumberDataDisplay>
                    <NumberDataDisplay data={this.state.microServerData.numberOfClosedRooms}>Closed server rooms:</NumberDataDisplay>
                </div>
            </div>
         );
    }
}
 
export default MainPage;