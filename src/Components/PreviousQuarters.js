import './../App.css';
import React, { Component } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';

class PreviousQuarters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousQuarters: null,
      fetched: false,
    };
  }

  componentDidMount() {
    this.wrapper();
  }

  wrapper() {
    axios.post('/api/prev_quarters', {
      course: this.props.course
    }).then((res) => {
      this.setState({previousQuarters: res.data, fetched: true});
    });
 }

  componentDidUpdate(prevProps) {
    if(this.props.course != prevProps.course)
    {
      this.wrapper();
    }
  } 

  render() {
    let main = [];
    if (this.state.fetched) {
      this.state.previousQuarters.forEach((obj) => {
        console.log(obj.prof);
        main.push(
          <div>
            <a href={obj.link}>{obj.term}</a>
            <span> with professor(s) {obj.prof.replace('(','').replace(')','')} </span>
          </div>
        );
      });
    } else {
      main = <ScaleLoader color={"#607D8B"} loading={!this.state.fetched} size={150} />
    }
    return (
      <div className="prev_quarter">
        <h2>Previous Quarter Pages</h2>
        {main}
      </div>
    );
  }
}

export default PreviousQuarters;