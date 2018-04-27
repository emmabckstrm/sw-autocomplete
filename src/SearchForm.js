import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  // Handles the event of a keypress
  onKeyPress = (event) => {
    if (event.key === "ArrowDown") {
      this.props.handleCurrentFocusIndex(1);
    } else if (event.key === "ArrowUp") {
      this.props.handleCurrentFocusIndex(-1);
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
            handleResultClick={this.props.handleResultClick}/>
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
          resetFocusIndex={this.props.resetFocusIndex}
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
  render() {
    this.handleFocus = (element) => {
      if(element && this.props.currentFocusIndex === this.props.index) {
        element.focus();
      }
    }
    return(
      <input type="text" placeholder="A character in a galaxy far, far away ..."
        value={this.props.searchValue}
        onChange={this.props.handleChange}
        onKeyDown={this.props.onKeyPress}
        onFocus={this.props.resetFocusIndex}
        ref={this.handleFocus}
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
        className="item"
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
