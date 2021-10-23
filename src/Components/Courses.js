import './../App.css';
import React, { Component } from 'react';

import axios from 'axios';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
        persons: null,
    };
  }

  componentDidMount() {
     // Simple GET request using fetch
     axios.get("/api/list").then(res => console.log(res));
  }

  render() {
    return (
      <div className="courses">
      </div>
    );
  }
}

export default Courses;