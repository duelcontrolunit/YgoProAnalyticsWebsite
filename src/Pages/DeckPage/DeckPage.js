import React, { Component } from "react";
// import BasicLineRechart from './../../Shared/Recharts/BasicLineRechart';
// import BasicRadarChart from "../../Shared/Recharts/BasicRadarChart";
import StackedBarChart from './../../Shared/Recharts/StackedBarChart';
import Axios from 'axios';
import LoadingIcon from "../../Shared/LoadingIcon/LoadingIcon";
import SimpleButton from "../../Shared/SimpleButton/SimpleButton";

class DeckPage extends Component {
  state = {
    // deckInfo: {
    //   name: "Deck Cool Name",
    //   type: "Interesting Type",
    //   master: "Master player",
    //   submissionDate: "1 april 2019",
    //   author: "niceGuyWithProperNickname"
    // },
    // cardsList: {
    //     monsters: ["Ricardo","Big chungus","Dat boi"],
    //     spells: ["random spell", "spell 2"],
    //     traps: ["lorem", "ipsum", "dolor"],
    //     extra: ["qwerty", "uiop"],
    //     side: ["no idea", "what to write"]
    // },
    // popularityOnTime: [
    //   {time: "april 23", popularity: 2},
    //   {time: "april 24", popularity: 3},
    //   {time: "april 25", popularity: 5},
    //   {time: "april 26", popularity: 8},
    //   {time: "april 27", popularity: 5},
    //   {time: "april 28", popularity: 6},
    //   {time: "april 29", popularity: 5},
    // ],
    // radarChartData: [
    //   {
    //     "type": "Monsters",
    //     "Maindeck": 90,
    //     "Sidedeck": 50,
    //     "fullMark": 100
    //   },
    //   {
    //     "type": "Spells",
    //     "Maindeck": 80,
    //     "Sidedeck": 40,
    //     "fullMark": 100
    //   },
    //   {
    //     "type": "Traps",
    //     "Maindeck": 70,
    //     "Sidedeck": 60,
    //     "fullMark": 100
    //   },
    //   {
    //     "type": "Extra",
    //     "Maindeck": 40,
    //     "Sidedeck": 80,
    //     "fullMark": 100
    //   }
    // ],
    // deckWinRatio: [
    //   {date: "april 24", loses: 4, wins: 4},
    //   {date: "april 23", loses: 5, wins: 2},
    //   {date: "april 25", loses: 0, wins: 5},
    //   {date: "april 26", loses: 1, wins: 7},
    //   {date: "april 27", loses: 2, wins: 8},
    //   {date: "april 28", loses: 8, wins: 4},
    //   {date: "april 29", loses: 2, wins: 2},
    // ]


    deck: {
      decklistId: 0,
      name: "Loading...",
      archetype: "",
      mainDeck: {},
      sideDeck: {},
      extraDeck: {},
      statistics: [],
      firstPlayed: ""
    },
    deckLoaded: false,
    deckNotFound: false
  };

  componentDidMount() {
    Axios.get("https://localhost:44326/api/decklist/" + this.props.location.search.split('=')[1]
    )
    .then(res => {
      console.log(res);
      console.log(this.state);



      let newDeckState = {
        decklistId: res.data.decklistId,
        name: res.data.name.split("_")[0],
        archetype: res.data.archetype,
        mainDeck: res.data.mainDeck,
        sideDeck: res.data.sideDeck,
        extraDeck: res.data.extraDeck,

        statistics: res.data.statistics.map(el => {
          return {
            date: this.prettifyDate(el.dateWhenDeckWasUsed),
            loses: el.numberOfTimesWhenDeckWasUsed - el.numberOfTimesWhenDeckWon,
            wins: el.numberOfTimesWhenDeckWon
          }
        }),

        firstPlayed: this.prettifyDate(res.data.whenDeckWasFirstPlayed)
      }

      this.setState({
        deck: newDeckState,
        deckLoaded: true,
        deckNotFound: false
      })
      console.log(this.state);

    },() => {
      console.log("zesrane");
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

  // writeCardsArray(array) {
  //     let jsxArray =[];
  //     array.forEach(el => {
  //       jsxArray.push((<div className="card" key={el}>{el}</div>));
  //     });
  //     return(jsxArray);
  // }

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
    
    //foreach that goes after every object in object "deck"
    Object.keys(deck).forEach((type,i) => {
      let cards = [];
      let duplicateCounter = 1;//counting if there are duplicates on cecklist
      deck[type].forEach((el,j,arr) => {
        if(arr[j+1] && arr[j+1].name === el.name) duplicateCounter++;//checks if next card is duplicate of the current
        else {
          //if there are duplicated card it will print them as single one with multiplication sign 
          const cardName = duplicateCounter > 1 ? el.name + " x " + duplicateCounter : el.name;
          cards.push(<div className="card" key={i + "-" + j}>{cardName}</div>);
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
    console.log(this.props);
    this.props.history.goBack();
  }

  render() {
    this.checkIfProperDeckId();

    const mainDeckContent = this.createCardsTable(this.state.deck.mainDeck);
    const sideDeckContent = this.createCardsTable(this.state.deck.sideDeck);
    const extraDeckContent = this.createCardsTable(this.state.deck.extraDeck);

    console.log(sideDeckContent);
    const mainDeckTable = mainDeckContent.length ? (
      <table className="cardsList mainDeck">
            <thead><tr><td colSpan="2">Main Deck</td></tr></thead>
            <tbody>
              {mainDeckContent}
            </tbody>
          </table>
    ) : ("");
    const sideDeckTable = sideDeckContent.length ? (
      <table className="cardsList sideDeck">
            <thead><tr><td colSpan="2">Side Deck</td></tr></thead>
            <tbody>
              {sideDeckContent}
            </tbody>
          </table>
    ) : ("");
    const extraDeckTable = extraDeckContent.length ? (
      <table className="cardsList extraDeck">
            <thead><tr><td colSpan="2">Extra Deck</td></tr></thead>
            <tbody>
              {extraDeckContent}
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
        <div className="DeckPage">
            <div className="deckName">{this.state.deck.name}</div>

          <table className="info">
            <tbody>
              <tr>
                <th>Archetype</th>
                <th>{this.state.deck.archetype}</th>
              </tr>
              <tr>
                <th>First played</th>
                <th>{this.state.deck.firstPlayed}</th>
              </tr>
            </tbody>
          </table>

          {/* <BasicLineRechart data={this.state.popularityOnTime} dataKeyName="time" dataName="popularity" >Deck popularity</BasicLineRechart>

          <BasicRadarChart data={this.state.radarChartData} dataKeyName="type" domainValue={[0,100]} specificDataKeyNames={["Maindeck","Sidedeck"]} >Cool data</BasicRadarChart>

          */}
          {/* <img src="https://ygoprodeck.com/pics/46986414.jpg" alt="ygoCard" /> */}
          <StackedBarChart data={this.state.deck.statistics} dataKeyName="date" specificDataKeyNames={["wins","loses"]}>Deck win ratio</StackedBarChart>

          {mainDeckTable}
          {sideDeckTable}
          {extraDeckTable}


          {/* <table className="cardsList mainDeck">
            <thead><tr><td colSpan="2">Main Deck</td></tr></thead>
            <tbody>
              {mainDeckContent}
            </tbody>
          </table> */}

          {/* <table className="cardsList sideDeck">
          <thead><tr><td colSpan="2">Side Deck</td></tr></thead>
            <tbody>
              {sideDeckContent}
            </tbody>
          </table>

          <table className="cardsList extraDeck">
            <thead><tr><td colSpan="2">Extra Deck</td></tr></thead>
            <tbody>
              {extraDeckContent}
            </tbody>
          </table> */}

          {/* <table className="cardsList">
              <tbody>
                  <tr className="monsters">
                      <th>Monsters</th>
                      <th>{this.writeCardsArray(this.state.cardsList.monsters)}</th>
                  </tr>
                  <tr className="spells">
                      <th>Spells</th>
                      <th>{this.writeCardsArray(this.state.cardsList.spells)}</th>
                  </tr>
                  <tr className="traps">
                      <th>Traps</th>
                      <th>{this.writeCardsArray(this.state.cardsList.traps)}</th>
                  </tr>
                  <tr className="extra">
                      <th>Extra</th>
                      <th>{this.writeCardsArray(this.state.cardsList.extra)}</th>
                  </tr>
                  <tr className="side">
                      <th>Side</th>
                      <th>{this.writeCardsArray(this.state.cardsList.side)}</th>
                  </tr>
              </tbody>
          </table> */}
        </div>
      );
  }
}

export default DeckPage;
