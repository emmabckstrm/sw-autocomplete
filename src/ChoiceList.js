import React, { Component } from 'react';
import './ChoiceList.css';

class ChoiceList extends Component {

  render() {
    const currentChoices = this.props.currentChoices;
    let choiceTitle = currentChoices.length>0 ? "You have chosen these fine characters" : "Your choices will be displayed here";
    const currentChoicesArray = [];
    for (let i=0; i<currentChoices.length; i++) {
      currentChoicesArray.push(
        <li key={i} className="choice">
          <div className="title">{currentChoices[i][0]}</div>
          <div className="timestamp">
            <span className="date">{currentChoices[i][1]}</span>
            <span className="time">{currentChoices[i][2]}</span>
          </div>
        </li>
      );
    }

    return(
      <div className="choices">
        <h2>{choiceTitle}</h2>
        <ul className="choice-list">
          {currentChoicesArray}
        </ul>
      </div>
    )
  }
}

export default ChoiceList;
