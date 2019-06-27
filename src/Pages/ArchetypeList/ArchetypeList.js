import React, { Component } from 'react';
import SearchPanel from '../../Shared/SearchPanel/SearchPanel';
import Axios from 'axios';
import LoadingIcon from './../../Shared/LoadingIcon/LoadingIcon';
import SelectFromListField from '../../Shared/SelectFromListField/SelectFromListField';
import ArchetypeResult from './ArchetypeResult/ArchetypeResult';

class ArchetypeList extends Component {
    state = { 
        archetypesList: [],
        archetypesResultList: [],
        numberOfPages: 0,
        loadingData: true,
        errorLoading: false,        
     }

    searchParameters = {
        archetypeName: ""
    }

    searchParametersFromLocation() {
        const locParam = this.getLoactionParameters();

        Object.keys(locParam).forEach(param => {
            this.searchParameters[param] = locParam[param];
        });
    }

    changeSearchParameter(paramName,value) {
        this.searchParameters[paramName] = value;
    }

    componentDidMount() {
        this.getData();
        this.getArchetypeList();
     }

    componentWillUnmount() {
        clearTimeout(this.getArchetypeListTimeoutReference);
     }

    getArchetypeListTimeoutReference = {};

    getData() {
        this.getArchetypeListTimeoutReference = setTimeout(() => {            
            const locParam = this.getLoactionParameters();
            let query = "https://localhost:44326/api/archetype";

            Object.keys(locParam).forEach((param,i) => {
                if(locParam[param]) {
                    if(i === 0) query += "?" + param + "=" + locParam[param];
                    else query += "&" + param + "=" + locParam[param];
                } 
            });
     
            Axios.get(query)
            .then(res => {
                this.setState({
                archetypesResultList: res.data.archetypes,
                numberOfPages: res.data.totalNumberOfPages,
                loadingData: false,
                errorLoading: false
                });
            },(err) => {
                this.setState({
                    loadingData: false,
                    errorLoading: true
                });
            });
        }, 10);
    }

    getArchetypeList() {
        Axios.get("https://localhost:44326/api/Archetype/ArchetypeListWithIdsAndNames")
        .then(res => {
            const archetypeNamesList = res.data.map(el => {
                return el.name;
            });
            this.setState({archetypesList: archetypeNamesList})
        });
    }

    redirectToArchetypePage(id) {
        this.props.history.push("/archetype?id=" + id);
    }

    getPageNumber() {
        if(!this.props.location.search) return 1;

        const locationParameters = this.getLoactionParameters();
        if(locationParameters.pageNumber)
        {
            return Number(locationParameters.pageNumber);
        }
        
        return 1
    }

    getLoactionParameters() {
        const locationParameters = this.props.location.search.split('?');
        let locationConcreteValues = {};
        locationParameters.forEach(param => {
            let nameAndValue = param.split("=");
            if(nameAndValue[0])
                locationConcreteValues[nameAndValue[0]] = nameAndValue[1];
        });

        return locationConcreteValues;
    }

    newSearchPage() {
        let newLocation = "/archetypelist";
        this.setState({
            archetypesResultList: [],
            loadingData: true,
            errorLoading: false
        });        
       Object.keys(this.searchParameters).forEach(param => {
           if(this.searchParameters[param]) newLocation += "?" + param + "=" + this.searchParameters[param].replace(" ", "+");
       });
       this.props.history.push(newLocation);
       this.getData();
    }

    render() { 
        let pagesList = [];
        const currentPage = this.getPageNumber();
        const pagesOnSidesOfResult = 3;

        for (let i = 1; i <= this.state.numberOfPages; i++) {
            let classList = i === currentPage ? "pageNumber currentPage" : "pageNumber"

            if(i + 1 > currentPage + pagesOnSidesOfResult) {
                if(i < this.state.numberOfPages) 
                    pagesList.push(<i className="fas fa-ellipsis-h" key="dots2" />);
                i = this.state.numberOfPages;
            }

            const currentI = i; //in order to overcole weird js variable mechanics
            pagesList.push(
                <div className={classList} key ={i} 
                onClick={() => {
                    this.searchParametersFromLocation();
                    this.changeSearchParameter("pageNumber",currentI+"");
                    this.newSearchPage();
                    }}>
                    {i}
                </div>
            );
            
            if(i - 1 < currentPage - pagesOnSidesOfResult - 1) {
                pagesList.push(<i className="fas fa-ellipsis-h" key="dots1" />);
                i = currentPage - pagesOnSidesOfResult;
            }                
        }

        let resultList = [];
        this.state.archetypesResultList.forEach((el) => {
            resultList.push(<ArchetypeResult
             key={el.id}  
             clickHandler={() => {this.redirectToArchetypePage(el.id)}}
             name={el.name}
             games={el.howManyWasUsed}
             wins={el.howManyWon}
             />);       
        });

        const resultsOnPage = this.getLoactionParameters().numberOfResults;
        if(this.state.errorLoading) resultList = (
            <div key="err" className="centredFlexContainer">
                <h1>Error on loading list of archetypes :(</h1>
            </div>
        );
        else if (!this.state.loadingData && this.state.archetypesResultList.length === 0) resultList = (
            <div key="err" className="centredFlexContainer">
                <h1>No results were found :(</h1>
            </div>
        );
        return ( 
            <div className="ArchetypeList">
                <div className="resultsOnPage">
                    <div className="desc">Results on page:</div>
                    <div className="options">
                        <div className={ resultsOnPage === "10" ? "option active" : "option"}
                        onClick={() => {
                            this.changeSearchParameter("numberOfResults", "10");
                            this.changeSearchParameter("pageNumber","1");
                            this.newSearchPage();
                            }}>10</div>
                        <div className={ resultsOnPage === "25" ? "option active" : "option"}
                        onClick={() => {
                            this.changeSearchParameter("numberOfResults", "25");
                            this.changeSearchParameter("pageNumber","1");
                            this.newSearchPage();
                            }}>25</div>
                        <div className={ resultsOnPage === "50" ? "option active" : "option"}
                        onClick={() => {
                            this.changeSearchParameter("numberOfResults", "50");     
                            this.changeSearchParameter("pageNumber","1");                       
                            this.newSearchPage();
                            }}>50</div>
                        <div className={ resultsOnPage === "100" ? "option active" : "option"}
                            onClick={() => {
                            this.changeSearchParameter("numberOfResults", "100");
                            this.changeSearchParameter("pageNumber","1");
                            this.newSearchPage();
                            }}>100</div>
                    </div>
                </div>
                <SearchPanel>
                    <label>Minimum number of games</label>
                    <input type="number" min="0" onChange={event => {this.changeSearchParameter("minNumberOfGames", event.target.value)}} />

                    <label>Archetype</label>
                    <SelectFromListField 
                    list={this.state.archetypesList} 
                    valueChanger={value => {this.changeSearchParameter("archetypeName",value)}} />
                    
                    <label>From date</label>
                    <input type="date" onChange={event => {this.changeSearchParameter("statisticsFromDate",event.target.value)}}/>
                    
                    <label>To date</label>
                    <input type="date" onChange={event => {this.changeSearchParameter("StatisticsToDate",event.target.value)}}/>

                    <button onClick={() => {
                        this.changeSearchParameter("pageNumber","1");
                        this.newSearchPage();
                        }}>Search</button>
                </SearchPanel>
                <div className="searchResult">
                    {resultList}
                    <LoadingIcon visible={this.state.loadingData} />
                    </div>
                <div className="pagesList">{pagesList}</div>
            </div>
        );
    }
}
 
export default ArchetypeList;