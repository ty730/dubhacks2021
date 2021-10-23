import './../App.css';
import React, { Component } from 'react';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className="banner">
        <h1>DubHacks 2021</h1>
      </div>
    );
  }
}

export default Banner;