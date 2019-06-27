import React, { Component } from "react";
import Axios from 'axios';
import LoadingIcon from "../../Shared/LoadingIcon/LoadingIcon";
import SimpleButton from "../../Shared/SimpleButton/SimpleButton";
import BasicLineRechart from './../../Shared/Recharts/BasicLineRechart';

class BanlistPage extends Component {
  state = {
    banlist: {
      banlistId: 0,
      name: "Loading...",

      bannedCards: {},
      limitedCards: {},
      semiLimitedCards: {},

      statistics: [],
      releaseDate: "",
      gamesTotal: 0,
      format: "",
    },
    banlistLoaded: false,
    banlistNotFound: false
  };

  componentDidMount() {
    Axios.get("https://localhost:44326/api/banlist/" + this.props.location.search.split('=')[1]
    )
    .then(res => {
      let gamesTotal = 0;

      let newDeckState = {
        banlistId: res.data.banlistId,
        name: res.data.name.split("_")[0],
        bannedCards: res.data.bannedCards,
        limitedCards: res.data.limitedCards,
        semiLimitedCards: res.data.semiLimitedCards,

        statistics: res.data.statistics.map(el => {
          gamesTotal += el.howManyTimesWasUsed;

          return {
            date: this.prettifyDate(el.fromDate),
            uses: el.howManyTimesWasUsed
          }
        }),

        gamesTotal: gamesTotal,
        format: res.data.format,
        releaseDate: this.prettifyDate(res.data.releaseDate)
      }
      this.setState({
        banlist: newDeckState,
        banlistLoaded: true,
        banlistNotFound: false
      })

    },() => {
      this.setState({
        banlistLoaded: true,
        banlistNotFound: true
      });
    });    
  }

  prettifyDate(dateString) {
    const date = new Date(dateString);

    return date.getDay() + "." + date.getMonth() + "." + date.getFullYear()
  }

  checkIfProperDeckId() {
    if(!this.props.location.search)
        this.props.history.push("/banlistlist");
  }

  //changes string like "loremIpsumDolor" into "Lorem Ipsum Dolor" (adds spaces and makes first letter uppercased)
  prietifyCardTypeString(inputString) {
    let newString = inputString[0].toUpperCase();
    for (let i = 1; i < inputString.length; i++) {
      if(inputString[i] === inputString[i].toUpperCase()) newString += " ";
      newString += inputString[i];
    }

    return newString;
  }

  //creates jsx table content using structured data in form of object that contains objects that contains table
  createCardsTable(banlist) {
    let cardTable = [];//result variable
    
    //foreach that goes after every object in object "banlist"
    Object.keys(banlist).forEach((type,i) => {
      let cards = [];
      let duplicateCounter = 1;//counting if there are duplicates on cecklist
      banlist[type].forEach((card,j,subDeckArray) => {
        if(subDeckArray[j+1] && subDeckArray[j+1].name === card.name) duplicateCounter++;//checks if next card is duplicate of the current
        else {
          //if there are duplicated card it will print them as single one with multiplication sign 
          const cardName = duplicateCounter > 1 ? card.name + " x " + duplicateCounter : card.name;
          //if card's passcode lenght has 9 digits, then adds beta icon next to card name
          const betaIcon = []
          if(card.passCode.toString().length === 9) betaIcon.push(<i key="beta" className="fas fa-bold"></i>);
          cards.push(<div className="card" key={i + "-" + j}>{betaIcon}{cardName}</div>);
          duplicateCounter = 1;
        }
      });
      if(cards.length > 0) {
        let row = [];
        row.push(<th key={type + "name"}>{this.prietifyCardTypeString(type)}</th>);
        row.push(<th key={type + "content"}>{cards}</th>);
        cardTable.push(<tr key={type}>{row}</tr>);
      }
    });
    
    return cardTable;
  }

  goToPreviousPage() {
    this.props.history.goBack();
  }

  render() {
    this.checkIfProperDeckId();

    const bannedCardsContent = this.createCardsTable(this.state.banlist.bannedCards);
    const limitedCardsContent = this.createCardsTable(this.state.banlist.limitedCards);
    const semiLimitedCardsContent = this.createCardsTable(this.state.banlist.semiLimitedCards);

    const bannedCardsTable = bannedCardsContent.length ? (
      <table className="cardsList bannedCards">
            <thead><tr><td colSpan="2">Banned Cards</td></tr></thead>
            <tbody>
              {bannedCardsContent}
            </tbody>
          </table>
    ) : ("");
    const limitedCardsTable = limitedCardsContent.length ? (
      <table className="cardsList limitedCards">
            <thead><tr><td colSpan="2">Limited Cards</td></tr></thead>
            <tbody>
              {limitedCardsContent}
            </tbody>
          </table>
    ) : ("");
    const semiLimitedCardsTable = semiLimitedCardsContent.length ? (
      <table className="cardsList semiLimitedCards">
            <thead><tr><td colSpan="2">Semi Limited Cards</td></tr></thead>
            <tbody>
              {semiLimitedCardsContent}
            </tbody>
          </table>
    ) : ("");

    if(!this.state.banlistLoaded)
      return (
        <div className="Banlist">
          <LoadingIcon visible={true} />
        </div>
      )
    else if(this.state.banlistNotFound)
      return (
        <div className="Banlist">
          <div className="centredFlexContainer">
            <h1>Decklist not Found :(</h1>
            <SimpleButton clickHandler={() => {this.goToPreviousPage()}}>Go back</SimpleButton>
          </div>
        </div>
        )
    else    
      return (
        <div className="Banlist">
            <div className="banlistName">{this.state.banlist.name}</div>

          <table className="info">
            <tbody>
              <tr>
                <th>Format</th>
                <th>{this.state.banlist.format}</th>
              </tr>
              <tr>
                <th>Release date</th>
                <th>{this.state.banlist.releaseDate}</th>
              </tr>
              <tr>
                <th>Games total</th>
                <th>{this.state.banlist.gamesTotal}</th>
              </tr>

            </tbody>
          </table>

          <BasicLineRechart data={this.state.banlist.statistics} dataKeyName="date" dataName="uses">Banlist usage</BasicLineRechart>

          {bannedCardsTable}
          {limitedCardsTable}
          {semiLimitedCardsTable}

        </div>
      );
  }
}

export default BanlistPage;
