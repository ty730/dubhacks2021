import './../App.css';
import React, { Component } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';

class Professor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professor: null,
      fetched: false,
    };
  }

  componentDidMount() {
    axios.post('/api/prof', {
      prof: this.props.profName //TODO REPLACE WITH PROP
    }).then((res) => {
      this.setState({professor: res.data, fetched: true});
    });
  }

  render() {
    let main;
    if (this.state.fetched) {
      main = 
        <div>
          <p><a href={this.state.professor.link}>{this.props.profName}</a></p>
          <p>Quality: {this.state.professor.quality} / 5</p>
          <p>Level Of Difficulty: {this.state.professor.difficulty} / 5</p>
          <p>{this.state.professor.takeAgain} would take again</p>
          <p>From {this.state.professor.rating}</p>
        </div>
    } else {
      main = <ScaleLoader color={"#F37C64"} loading={!this.state.fetched} size={150} />
    }
    return (
      <div>
        {main}
      </div>
    );
  }
}

export default Professor;