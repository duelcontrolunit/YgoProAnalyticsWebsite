import React, { Component } from 'react';
import SearchBar from '../../Shared/SearchBar/SearchBar';
import SearchPanel from '../../Shared/SearchPanel/SearchPanel';
import DeckResult from './DeckResult/DeckResult';

class DeckList extends Component {
    state = { 
        searchResult: [
            {id: 1, name: "name1", proto: "very nice prototype", date: "2 april 2019", author: "niceGuy77"},
            {id: 15,name: "name5", proto: "d", date: "4 september 2019", author: "niceGuy77"},
            {id: 2,name: "name2", proto: "a", date: "6 april 2019", author: "niceGuy77"},
            {id: 3,name: "name3", proto: "bbbbbbbbbb", date: "12 may 2019", author: "niceGuy77"},
            {id: 5,name: "name5", proto: "d", date: "4 september 2019", author: "niceGuy77"},
            {id: 4,name: "name4", proto: "cc cccc", date: "6 april 2019", author: "niceGuy77"},
            {id: 6, name: "name1", proto: "very nice prototype", date: "2 april 2019", author: "niceGuy77"},
            {id: 11, name: "name1", proto: "very nice prototype", date: "2 april 2019", author: "niceGuy77"},
            {id: 10,name: "name5", proto: "d", date: "4 september 2019", author: "niceGuy77"},
            {id: 7,name: "name2", proto: "a", date: "6 april 2019", author: "niceGuy77"},
            {id: 8,name: "name3", proto: "bbbbbbbbbb", date: "12 may 2019", author: "niceGuy77"},
            {id: 13,name: "name3", proto: "bbbbbbbbbb", date: "12 may 2019", author: "niceGuy77"},
            {id: 9,name: "name4", proto: "cc cccc", date: "6 april 2019", author: "niceGuy77"},
            {id: 12,name: "name2", proto: "a", date: "6 april 2019", author: "niceGuy77"},
            {id: 14,name: "name4", proto: "cc cccc", date: "6 april 2019", author: "niceGuy77"},
        ]
     }

    inputChanged(event) {
        console.log(event.target.value);
    }

    inputSubmitted(event) {
        console.log(event.target.value);        
    }

    redirectToDecklist(id) {
        console.log(this.props);
        console.log(id);
        this.props.history.push("/deck?id=" + id);
    }

    render() { 

        let resultList = [];

        this.state.searchResult.forEach((deck) => {
            resultList.push(<DeckResult
             key={deck.id}  
             clickHandler={() => {this.redirectToDecklist(deck.id)}}
             name={deck.name}
             proto={deck.proto}
             date={deck.date}
             author={deck.author}
             />)
            
        });
        console.log(resultList);

        return ( 
            <div className="DeckList">
                <SearchBar changeHandler={this.inputChanged} clickHandler={this.inputSubmitted} ></SearchBar>
                <SearchPanel>
                    <label>Prop1</label>
                    <input type="text" />
                    <label>Prop2</label>
                    <input type="radio" />
                    <label>Prop3</label>
                    <input type="range" />
                    <label>Prop4</label>
                    <input type="date" />
                    <label>Prop5</label>
                    <input type="text" />
                    <label>Prop6</label>
                    <input type="text" />

                    <button>Search</button>
                </SearchPanel>
                <div className="searchResult">{resultList}</div>
            </div>
         );
    }
}
 
export default DeckList;