import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import ChoiceList from './ChoiceList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChoices: [],
      items: {},
      searchResult: null,
      searchValue: "",
    }
  }

  handleChangeSearchbar = (event) => {
    this.setState({searchValue: event.target.value}, () => {this.swapiRequest() });
  }
  // Handles the clicked item and adds to state
  handleSearchResultClick = (event) => {
    const chosenItem = event.target.innerHTML;
    let newChoices = this.state.currentChoices.slice();
    let date = new Date();
    let localeString = date.toLocaleString();
    localeString = localeString.split(" ");
    let newItem = [chosenItem,localeString[0],localeString[1]];
    newChoices.push(newItem);
    this.setNewChoices(newChoices);
  }
  setNewChoices = (newChoices) => {
    console.log("will set these ", newChoices);
    localStorage.setItem("test2", JSON.stringify(newChoices));
    this.setState({currentChoices: newChoices});
  }
  // Makes request to star wars api
  swapiRequest = () => {
    let apiQuery = ("https://swapi.co/api/people/?search=" + this.state.searchValue);
    fetch(apiQuery)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      this.setState({searchResult: responseJson.results});
    });
  }

  componentDidMount = () => {
    const cachedResults = localStorage.getItem("test2");
    if (cachedResults) {
      console.log("get these chaced results" , JSON.parse(cachedResults));
      this.setState({currentChoices: JSON.parse(cachedResults)});
    }
  }


  render() {

    return (
      <div className="app">
        <header className="header">
          <div className="header-container">
            <h1 className="title">Search</h1>
            <SearchForm
              searchValue={this.state.searchValue}
              handleChange={this.handleChangeSearchbar}
              results={this.state.searchResult}
              handleResultClick={this.handleSearchResultClick}
            />
          </div>
        </header>
        <section className="container">
          <ChoiceList currentChoices={this.state.currentChoices}/>
        </section>
      </div>
    );
  }
}

export default App;
