import React, { Component } from "react";

class DeckPage extends Component {
  state = {
    deckInfo: {
      name: "Deck Cool Name",
      type: "Interesting Type",
      master: "Master player",
      submissionDate: "1 april 2019",
      author: "analDestructor666"
    },
    cardsList: {
        monsters: ["Ricardo","Big chungus","Dat boi"],
        spells: ["random spell", "spell 2"],
        traps: ["lorem", "ipsum", "dolor"],
        extra: ["qwerty", "uiop"],
        side: ["no idea", "what to write"]
    }
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
