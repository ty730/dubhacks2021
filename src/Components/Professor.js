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

  getQuality(quality) {
    let color = "";
    if (quality >= 4) {
      color = "great";
    } else if (quality > 3) {
      color = "good";
    } else if (quality > 2) {
      color = "okay";
    } else {
      color = "poor";
    }
    return <div className={color}>Quality: <br/> {quality} / 5</div>;
  }

  render() {
    let main;
    if (this.state.fetched) {
      main =
        <div className="professorContents">
          <h3><a href={this.state.professor.link}>{this.props.profName}</a></h3>
          <div className="quality">{this.getQuality(this.state.professor.quality)}</div>
          <p>Level Of Difficulty: {this.state.professor.difficulty} / 5</p>
          <p>{this.state.professor.takeAgain} would take again</p>
          <p>From {this.state.professor.rating}</p>
        </div>
    } else {
      main = <ScaleLoader color={"#F37C64"} loading={!this.state.fetched} size={150} />
    }
    return (
      <div className="professor">
        {main}
      </div>
    );
  }
}

export default Professor;