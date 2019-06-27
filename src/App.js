import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './style.css';
import MainPage from './Pages/Main/MainPage';
import AboutPage from './Pages/About/About';
import PageContainer from './Shared/PageContainer/PageContainer';
import Nav from './Shared/Nav/Nav';
import Header from './Shared/Header/Header';
import DiscordButton from './Shared/DiscordButton/DiscordButton';
import DonateButton from './Shared/DonateButton/DonateButton';
import DeckPage from './Pages/DeckPage/DeckPage';
import DeckList from './Pages/DeckList/DeckList';
import ArchetypeList from './Pages/ArchetypeList/ArchetypeList';
import ArchetypePage from './Pages/ArchetypePage/ArchetypePage';
import BanlistList from './Pages/BanlistList/BanlistList';
import BanlistPage from './Pages/BanlistPage/BanlistPage';

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
          <Route path="/decklist" exact component={DeckList} />
          <Route path="/deck" component={DeckPage} />
          <Route path="/archetypelist" exact component={ArchetypeList} />
          <Route path="/archetype" component={ArchetypePage} />
          <Route path="/banlistlist" exact component={BanlistList} />
          <Route path="/banlist" component={BanlistPage} />
          </PageContainer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
