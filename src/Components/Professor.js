import './../App.css';
import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

class Professor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      fetched: false,
    };
    this.grabRMP();
  }

  grabRMP() {
    
    fetch('https://google.com', {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => res.text()).then(text => console.log(text));
    // axios.get('http://google.com', {
    //   mode: 'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   }
    // }).then((res) => {
    //   this.setState({response: res, fetched: true});
    // });
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

export default Professor;