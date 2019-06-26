import React, { Component } from "react";
import StackedBarChart from './../../Shared/Recharts/StackedBarChart';
import Axios from 'axios';
import LoadingIcon from "../../Shared/LoadingIcon/LoadingIcon";
import SimpleButton from "../../Shared/SimpleButton/SimpleButton";

class ArchetypePage extends Component {
  state = {
    deck: {
      archetypeId: 0,
      name: "Loading...",
      cardsList: {},
      statistics: [],
      gamesTotal: 0,
      gamesWon: 0
    },
    deckLoaded: false,
    deckNotFound: false
  };

  componentDidMount() {
    Axios.get("https://localhost:44326/api/archetype/" + this.props.location.search.split('=')[1]
    )
    .then(res => {
        console.log(res);
      let gamesTotal = 0;
      let gamesWon = 0;  

      let newDeckState = {
        archetypeId: res.data.archetypeId,
        name: res.data.name.split("_")[0],
        archetype: res.data.archetype,
        cardsList: res.data.cardsInArchetype,


        statistics: res.data.statistics.map(el => {
          gamesTotal += el.numberOfDecksWhereWasUsed;
          gamesWon += el.numberOfTimesWhenArchetypeWon;
          return {
            date: this.prettifyDate(el.dateWhenArchetypeWasUsed),
            loses: el.numberOfDecksWhereWasUsed - el.numberOfTimesWhenArchetypeWon,
            wins: el.numberOfTimesWhenArchetypeWon
          }
        }),

        gamesTotal: gamesTotal,
        gamesWon: gamesWon,
        firstPlayed: this.prettifyDate(res.data.whenDeckWasFirstPlayed)
      }
      this.setState({
        deck: newDeckState,
        deckLoaded: true,
        deckNotFound: false
      })

    },() => {
      this.setState({
        deckLoaded: true,
        deckNotFound: true
      });
    });    
  }

  prettifyDate(dateString) {
    const date = new Date(dateString);
    return date.getDay() + "." + date.getMonth() + "." + date.getFullYear()
  }

  checkIfProperDeckId() {
    if(!this.props.location.search)
        this.props.history.push("/decklist");
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
  createCardsTable(deck) {
    let cardTable = [];//result variable
    
    // foreach that goes after every object in object "deck"
    Object.keys(deck).forEach((type,i) => {
      let cards = [];
      let duplicateCounter = 1;//counting if there are duplicates on cecklist
      deck[type].forEach((card,j,subDeckArray) => {
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

    const cardsListContent = this.createCardsTable(this.state.deck.cardsList);


    const cardsListTable = cardsListContent.length ? (
      <table className="cardsList">
            <thead><tr><td colSpan="2">Cards in Archetype</td></tr></thead>
            <tbody>
              {cardsListContent}
            </tbody>
          </table>
    ) : ("");

    if(!this.state.deckLoaded)
      return (
        <div className="DeckPage">
          <LoadingIcon visible={true} />
        </div>
      )
    else if(this.state.deckNotFound)
      return (
        <div className="DeckPage">
          <div className="centredFlexContainer">
            <h1>Decklist not Found :(</h1>
            <SimpleButton clickHandler={() => {this.goToPreviousPage()}}>Go back</SimpleButton>
          </div>
        </div>
        )
    else    
      return (
        <div className="ArchetypePage">
            <div className="name">{this.state.deck.name}</div>

          <table className="info">
            <tbody>
              <tr>
                <th>Games total</th>
                <th>{this.state.deck.gamesTotal}</th>
              </tr>
              <tr>
                <th>Games Won</th>
                <th>{this.state.deck.gamesWon}</th>
              </tr>
            </tbody>
          </table>

          <StackedBarChart data={this.state.deck.statistics} dataKeyName="date" specificDataKeyNames={["wins","loses"]}>Deck win ratio</StackedBarChart>

          {cardsListTable}

        </div>
      );
  }
}

export default ArchetypePage;
