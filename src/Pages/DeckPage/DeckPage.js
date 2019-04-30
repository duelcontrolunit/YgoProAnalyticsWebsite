import React, { Component } from "react";
import BasicLineRechart from './../../Shared/Recharts/BasicLineRechart';

class DeckPage extends Component {
  state = {
    deckInfo: {
      name: "Deck Cool Name",
      type: "Interesting Type",
      master: "Master player",
      submissionDate: "1 april 2019",
      author: "niceGuyWithProperNickname"
    },
    cardsList: {
        monsters: ["Ricardo","Big chungus","Dat boi"],
        spells: ["random spell", "spell 2"],
        traps: ["lorem", "ipsum", "dolor"],
        extra: ["qwerty", "uiop"],
        side: ["no idea", "what to write"]
    },
    popularityOnTime: [
      {time: "april 23", popularity: 2},
      {time: "april 24", popularity: 3},
      {time: "april 25", popularity: 5},
      {time: "april 26", popularity: 8},
      {time: "april 27", popularity: 5},
      {time: "april 28", popularity: 6},
      {time: "april 29", popularity: 5},
    ]
  };

  checkIfProperDeckId() {
    if(!this.props.location.search)
        this.props.history.push("/decklist");
  }

  writeCardsArray(array) {
      let jsxArray =[];
      array.forEach(el => {
        jsxArray.push((<div className="card" key={el}>{el}</div>));
      });
      return(jsxArray);
  }

  render() {
    console.log(this);

    this.checkIfProperDeckId();
    
    return (
      <div className="DeckPage">
          <div className="deckName">{this.state.deckInfo.name}</div>


        <table className="info">
          <tbody>
            <tr>
              <th>Deck Type</th>
              <th>{this.state.deckInfo.type}</th>
            </tr>
            <tr>
              <th>Deck Id</th>
              <th>{this.props.location.search.split('=')[1]}</th>
            </tr>
            <tr>
              <th>Deck Master</th>
              <th>{this.state.deckInfo.master}</th>
            </tr>
            <tr>
              <th>Submission Date</th>
              <th>{this.state.deckInfo.submissionDate}</th>
            </tr>
            <tr>
              <th>Author</th>
              <th>{this.state.deckInfo.author}</th>
            </tr>
          </tbody>
        </table>

        <BasicLineRechart data={this.state.popularityOnTime} dataKeyName="time" dataName="popularity" >Deck popularity</BasicLineRechart>

        <table className="cardsList">
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
        </table>

      </div>
    );
  }
}

export default DeckPage;
