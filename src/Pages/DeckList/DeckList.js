import React, { Component } from 'react';
import SearchBar from '../../Shared/SearchBar/SearchBar';
import SearchPanel from '../../Shared/SearchPanel/SearchPanel';
import DeckResult from './DeckResult/DeckResult';
import Axios from 'axios';
import LoadingIcon from './../../Shared/LoadingIcon/LoadingIcon';
import SelectFromListField from '../../Shared/SelectFromListField/SelectFromListField';

class DeckList extends Component {
    state = { 
        // searchResult: [
        //     {id: 1, name: "name1", proto: "very nice prototype", date: "2 april 2019", author: "niceGuy77"},
        //     {id: 15,name: "name5", proto: "d", date: "4 september 2019", author: "niceGuy77"},
        //     {id: 2,name: "name2", proto: "a", date: "6 april 2019", author: "niceGuy77"},
        //     {id: 3,name: "name3", proto: "bbbbbbbbbb", date: "12 may 2019", author: "niceGuy77"},
        //     {id: 5,name: "name5", proto: "d", date: "4 september 2019", author: "niceGuy77"},
        //     {id: 4,name: "name4", proto: "cc cccc", date: "6 april 2019", author: "niceGuy77"},
        //     {id: 6, name: "name1", proto: "very nice prototype", date: "2 april 2019", author: "niceGuy77"},
        //     {id: 11, name: "name1", proto: "very nice prototype", date: "2 april 2019", author: "niceGuy77"},
        //     {id: 10,name: "name5", proto: "d", date: "4 september 2019", author: "niceGuy77"},
        //     {id: 7,name: "name2", proto: "a", date: "6 april 2019", author: "niceGuy77"},
        //     {id: 8,name: "name3", proto: "bbbbbbbbbb", date: "12 may 2019", author: "niceGuy77"},
        //     {id: 13,name: "name3", proto: "bbbbbbbbbb", date: "12 may 2019", author: "niceGuy77"},
        //     {id: 9,name: "name4", proto: "cc cccc", date: "6 april 2019", author: "niceGuy77"},
        //     {id: 12,name: "name2", proto: "a", date: "6 april 2019", author: "niceGuy77"},
        //     {id: 14,name: "name4", proto: "cc cccc", date: "6 april 2019", author: "niceGuy77"},
        // ],
        // numberOfPages: 15


        archetypesList: ["Velma","Cruz","Suarez","Lamb","Mccarty","Mcclain","Annie","Walls","Williams","Allyson","Ella","Christensen","Tammy","Woodard","Wilkinson","Jeri","Patti","Preston","Young","Mayo","Vera","Georgette","Saunders","Barrera","Corrine","Bruce","Woodward","Martina","Mcneil","Hull","Leah","Hattie","Hilary","Ferguson","Humphrey","Reyes","Tanya","Graves","Leslie","Watts","Goldie","Morris","Boyd","Hebert","Oliver","Goodman","Fitzpatrick","Brenda","Justine","Dena","Short","Casandra","Pam","Shaffer","Jones","Nell","Fitzgerald","Rosie","Pansy","Pollard","Crosby","Arlene","Eileen","Rosetta","Aisha","Natalie","Cherie","Celina","Foley","Tina","Page","Chasity","Wall","Jimmie","Leola","Estes","Helena","Ina","Larson","Margaret","Arnold","Cline","Sanford","Maritza","Phillips","Norman","Alexandra","Hale","Shannon","Hopper","Claudette","Oneal","Adele","Queen","Hughes","Beverley","Hooper","Holloway","Duffy","Becky","Key","Buckley","Rena","Clarissa","Lopez","Butler","Browning","Lynn","Carmen","Britt","Randi","Etta","Moses","Estelle","Wallace","Bernice","Sofia","Savage","Rosalind","Sophie","Durham","Susan","Latonya","Allison","Brandi","Cara","Crystal","Rocha","Mcdowell","Gilliam","Allison","Madge","Madden","Nannie","Bette","Kristen","Roslyn","Salazar","Cook","Roberts","Marion","Puckett","Jessie","Mejia","Tammie","Higgins","Gale","Jewell","Brennan","Sheri","Diane","James","Marta","Charlene","Marcia","Abby","Aida","Jo","Snider","Mcguire","Marisa","Jami","Hoover","Camille","Margery","Gracie","Miriam","Jamie","Bettie","Joanna","Wilma","Melton","Floyd","Mcbride","Robinson","Booth","Reilly","Genevieve","Mcmahon","Jennifer","Warren","Perry","Kari","Irene","Pugh","David","Greta","Traci","Isabelle","Grimes","Kenya","Dana","Beatrice","Araceli","Alison","Olson","Vaughan","Medina","Jacqueline","Laurel","Brittany","Penny","Small","Meghan","Viola","Howell","Crawford","Randolph","Giles","Russo","Kayla","Christian","Ochoa","Lessie","Wendy","Hannah","Watson","Soto","Hayden","Brady","Faulkner","Massey","Shawna","Wiggins","Merle","Huber","Perez","Angel","Lottie","Chan","Deloris","Gomez","Hendrix","Marsh","Mona","Talley","Latasha","Della","Irma","Ramos","Ericka","Marissa","Heather","Powell","Jefferson","Ramirez","Greer","Janet","Kelly","Schneider","Gibbs","Susanne","Mae","Herman","Cooper","Long","Beasley","Saundra","Blackburn","Harvey","Robles","Bryant","Julianne","Mabel","Brittney","Gail","Duran","Lauren","Chandler","Jacquelyn","Robertson","Harriet","Ginger","Reid","Campos","Sears","Kristi","Serrano","Jenifer","Nora","Nikki","Robert","Gaines","Terrie","Chase","Hanson","Malinda","Teri","Simon","Ellison","Cote","Morales","Collier","Selma","Mullen","Holder","Rutledge","Coleen","Moran","Le","Roberta","Chen"],


        decklistList: [],
        numberOfPages: 0,
        loadingDecklists: true
     }

     componentDidMount() {
        this.getDecklists(this.getPageNumber());
     }

    getDecklists(pageNumber) {
        Axios.get("https://localhost:44326/api/decklist?minNumberOfGames=1&pageNumber=" + pageNumber)
        .then(res => {
            this.setState({
               decklistList: res.data.decklistWithNumberOfGamesAndWins,
               numberOfPages: res.data.totalNumberOfPages,
               loadingDecklists: false
            });
        });
    }

    inputChanged(event) {
        console.log(event.target.value);
    }

    inputSubmitted(event) {
        console.log(event.target.value);        
    }

    redirectToDecklist(id) {
        this.props.history.push("/deck?id=" + id);
    }

    getPageNumber() {
        if(!this.props.location.search) return 1;

        const locationParameters = this.props.location.search.split('?');
        const locationConcreteValues = [];
        locationParameters.forEach(param => {
            locationConcreteValues.push(param.split("="));
        });
        if(locationConcreteValues)
        {
            const pageParam= locationConcreteValues.find(el => {return el[0] === "page"});
            if(pageParam) return Number(pageParam[1]);
        }
        return 1

        // return Number(this.props.location.search.split('=')[pageStringIndex+1]);

        // else return Number(this.props.location.search.split('=')[1]);
    }

    goToPage(page) {
        this.props.history.push("/decklist?page=" + page);
        this.setState({
            decklistList: [],
            loadingDecklists: true
        });
        this.getDecklists(page);
    }

    render() { 
        let pagesList = [];
        const currentPage = this.getPageNumber();
        const pagesOnSidesOfResult = 3;

        for (let i = 1; i <= this.state.numberOfPages; i++) {
            let classList = i === currentPage ? "pageNumber currentPage" : "pageNumber"

            if(i+1 > currentPage + pagesOnSidesOfResult) {
                if(i < this.state.numberOfPages) 
                    pagesList.push(<i className="fas fa-ellipsis-h" key="dots2" />);
                i = this.state.numberOfPages;
            }

            const currentI = i; //in order to overcole weird js variable mechanics
            pagesList.push(
                <div className={classList} key ={i} onClick={() => {this.goToPage(currentI)}}>
                    {i}
                </div>
            );
            
            if(i-1 < currentPage - pagesOnSidesOfResult - 1) {
                pagesList.push(<i className="fas fa-ellipsis-h" key="dots1" />);
                i = currentPage - pagesOnSidesOfResult;
            }                
        }

        let resultList = [];
        this.state.decklistList.forEach((deck) => {
            const clearName = deck.name.split("_")[0];
            const date = new Date(deck.whenDecklistWasFirstPlayed);
            const clearDate = date.getDay() + "." + date.getMonth() + "." + date.getFullYear();

            resultList.push(<DeckResult
             key={deck.id}  
             clickHandler={() => {this.redirectToDecklist(deck.id)}}
             name={clearName}
             //proto={deck.proto}
             date={clearDate}
             //author={deck.author}
             />)            
        });

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
                    {/* <label>Prop5</label>
                    <input type="text" />
                    <label>Prop6</label>
                    <input type="text" /> */}
                    <SelectFromListField list={this.state.archetypesList} />

                    <button>Search</button>
                </SearchPanel>
                <div className="searchResult">
                    {resultList}
                    <LoadingIcon visible={this.state.loadingDecklists} />
                    </div>
                <div className="pagesList">{pagesList}</div>
            </div>
         );
    }
}
 
export default DeckList;