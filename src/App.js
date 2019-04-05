import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './style.css';
import MainPage from './Pages/Main/MainPage';
import AboutPage from './Pages/About/About';
import PageContainer from './Shared/PageContainer/PageContainer';
import Nav from './Shared/Nav/Nav';
import Header from './Shared/Header/Header';
import Statistics from './Pages/Statisctics/Statistics';

class App extends Component {
  state = {

  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route component={Header} />
          <Route component={Nav} />
          <PageContainer pageName={this.state.currentPage}>
          <Route path="/" exact component={MainPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/stats" exact component={Statistics} />
          </PageContainer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
