import React, { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {

  render() {
    const resultArray = [];
    const result = this.props.results;
    const value = this.props.searchValue;
    if (value.length > 0 && result != null) {
      const len = result.length;
      for (var i=0; i<len; i++) {
        resultArray.push(
          <li key={i} onClick={this.props.handleResultClick}>
            {result[i].name}
          </li>
        );
      }
    }


    return (
      <div className="search-form">
        <input type="text" value={this.props.searchValue} placeholder="Search ..." onChange={this.props.handleChange}/>
        <div className="search-result">
          <ul className="search-result-list">
            {resultArray}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchForm;
