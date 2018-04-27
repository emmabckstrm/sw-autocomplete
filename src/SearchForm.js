import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {

  onKeyPress = (event) => {
    console.log("this key was pressed",event.key);
    if (event.key === "ArrowDown") {
      this.props.handleCurrentFocusIndex(1);
    } else if (event.key === "ArrowUp") {
      this.props.handleCurrentFocusIndex(-1);
    } else if (event.key === "Enter") {
      this.props.handleResultClick(event);
    }
  }

  render() {
    const resultArray = [];
    const result = this.props.results;
    const value = this.props.searchValue;
    if (value.length > 0 && result != null) {
      const len = result.length;
      for (let i=0; i<len; i++) {
        resultArray.push(
          <SearchResultItem
            key={i}
            index={i}
            title={result[i].name}
            currentFocusIndex={this.props.currentFocusIndex}
            onKeyPress={this.onKeyPress}
            onClick={this.props.handleResultClick}/>
        );
      }
    }


    return (
      <div className="search-form">
        <SearchBar
          value={this.props.searchValue}
          index={(-1)}
          currentFocusIndex={this.props.currentFocusIndex}
          handleChange={this.props.handleChange}
          onKeyPress={this.onKeyPress}
        />
        <div className="search-result">
          <div className="search-result-list">
            {resultArray}
          </div>
        </div>
      </div>
    );
  }
}

class SearchBar extends Component {
  componentDidMount = () => {
    this.searchBar.focus();
  }
  handleFocus = (element) => {
    if(element && this.props.currentFocusIndex === this.props.index) {
      element.focus();
    }
  }
  render() {
    return(
      <input type="text" placeholder="Search ..."
        value={this.props.searchValue}
        onChange={this.props.handleChange}
        onKeyDown={this.props.onKeyPress}
        ref={input => {this.searchBar=input}}
      />
    )
  }
}

class SearchResultItem extends Component {

  render() {
    this.handleFocus = (element) => {
      if(element && this.props.currentFocusIndex === this.props.index) {
        element.focus();
      }
    }
    return(
      <button
        onClick={this.props.handleResultClick}
        ref={this.handleFocus}
        onKeyDown={this.props.onKeyPress}
      >
        {this.props.title}
      </button>
    )
  }
}

export default SearchForm;
