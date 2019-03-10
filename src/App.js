import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import MainPage from './Pages/Main/MainPage';
import AboutPage from './Pages/About/About';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={MainPage} />
          <Route path="/about" exact component={AboutPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
