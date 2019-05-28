import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './style.css';
import MainPage from './Pages/Main/MainPage';
import AboutPage from './Pages/About/About';
import PageContainer from './Shared/PageContainer/PageContainer';
import Nav from './Shared/Nav/Nav';
import Header from './Shared/Header/Header';
import Statistics from './Pages/Statisctics/Statistics';
import DiscordButton from './Shared/DiscordButton/DiscordButton';
import DonateButton from './Shared/DonateButton/DonateButton';
import DeckPage from './Pages/DeckPage/DeckPage';
import DeckList from './Pages/DeckList/DeckList';

class App extends Component {
  state = {

  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route component={Header} />
          <Route component={Nav} />
          <Route component={DiscordButton} />
          <Route component={DonateButton} />
          <PageContainer pageName={this.state.currentPage}>
          <Route path="/" exact component={MainPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/stats" exact component={Statistics} />
          <Route path="/decklist" exact component={DeckList} />
          <Route path="/deck" component={DeckPage} />
          </PageContainer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
