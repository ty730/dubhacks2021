import './../App.css';
import React, { Component } from 'react';
import axios from 'axios';

class Reddit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      fetched: false,
    };
  }

  componentDidMount() {
    axios.post('/api/reddit', {
      course: 'CSE 142' //TODO REPLACE WITH PROP
    }).then((res) => {
        console.log("here");
      console.log(res.data);
      //this.setState({response: res, fetched: true});
    });
  }

  render() {
    let main;
    if (this.state.fetched) {
      main = <div>{this.state.response}</div>
    } else {
      main = <div></div>
    }
    return (
      <div>
        {main}
      </div>
    );
  }
}

export default Reddit;