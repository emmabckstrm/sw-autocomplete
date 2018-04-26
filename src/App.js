import React, { Component } from 'react';
import './App.css';
import SearchForm from './SearchForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChoices: [],
      items: {},
      searchResult: null,
      searchValue: "",
    }
    this.handleChangeSearchbar = this.handleChangeSearchbar.bind(this);
    this.swapiRequest = this.swapiRequest.bind(this);
  }

  handleChangeSearchbar(event) {
    this.setState({searchValue: event.target.value}, () => this.swapiRequest());
    //this.setState({searchValue: event.target.value}, function() { console.log( this.swapiRequest()) });
  }

  handleSearchResultClick(event) {
    console.log("you clicked here!",event.target);
  }

  swapiRequest() {
    let apiQuery = ("https://swapi.co/api/people/?search=" + this.state.searchValue);
    fetch(apiQuery)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      this.setState({searchResult: responseJson.results});
    });
  }


  render() {
    const currentChoices = this.state.currentChoices;
    const currentChoicesArray = [];
    for (let i=0; i<currentChoices; i++) {
      currentChoicesArray.push(<div key={i}>{currentChoices[i]}</div>);
    }

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
          <p className="intro">
            Your choices will be displayed here.
          </p>
          <p>{this.state.currentChoices}</p>
        </section>
      </div>
    );
  }
}

export default App;
