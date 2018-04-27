import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm';
import ChoiceList from './ChoiceList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChoices: [],
      currentFocusIndex: -1,
      searchResult: null,
      searchValue: "",
    }
    this.storageKey = "test4";
  }
  // Makes sure the currentfocus index is within a certain range
  handleCurrentFocusIndex = (value) => {
    if (this.state.searchResult != null) {
      if(value === 1) {
        if (this.state.currentFocusIndex < this.state.searchResult.length-1) {
          this.updateState(value);
        }
      } else if (value === -1) {
        if(this.state.currentFocusIndex > -1) {
          this.updateState(value);
        }
      }
    }
  }
  // Increments the currentFocusIndex with specifid value
  updateState = (value) => {
    this.setState((prevState) => ({
      currentFocusIndex: prevState.currentFocusIndex + value
    }));
  }
  // Resets focus index to indicate the search bar
  resetFocusIndex = () => {
    this.setState({currentFocusIndex: -1});
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
  // Sets the new choices both to state and localStorage
  setNewChoices = (newChoices) => {
    localStorage.setItem(this.storageKey, JSON.stringify(newChoices));
    this.setState({currentChoices: newChoices});
  }
  // Handles changes to search bar, makes api request
  handleChangeSearchbar = (event) => {
    this.setState({searchValue: event.target.value}, () => {this.swapiRequest() });
  }
  // Makes request to star wars api
  swapiRequest = () => {
    if (this.state.searchValue) {
      let apiQuery = ("https://swapi.co/api/people/?search=" + this.state.searchValue);
      fetch(apiQuery)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({searchResult: responseJson.results});
      });
    } else {
      this.setState({searchResult: null})
    }
  }

  componentDidMount = () => {
    const cachedResults = localStorage.getItem(this.storageKey);
    if (cachedResults) {
      this.setState({currentChoices: JSON.parse(cachedResults)});
    }
  }


  render() {

    return (
      <div className="app">
        <header className="header">
          <div className="container header-container">
            <h1 className="app-title">Star Wars Character Search</h1>
            <SearchForm
              searchValue={this.state.searchValue}
              handleChange={this.handleChangeSearchbar}
              results={this.state.searchResult}
              handleResultClick={this.handleSearchResultClick}
              currentFocusIndex={this.state.currentFocusIndex}
              handleCurrentFocusIndex={this.handleCurrentFocusIndex}
              resetFocusIndex={this.resetFocusIndex}
            />
          </div>
        </header>
        <section className="container choices-container">
          <ChoiceList currentChoices={this.state.currentChoices}/>
        </section>
      </div>
    );
  }
}

export default App;
