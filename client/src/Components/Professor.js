import '../App.css';
import React, { Component } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';
import thumbdown from '../media/thumb-down.png';
import thumbup from '../media/thumbs-up.png';

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

  getTakeAgain(takeAgain) {
    let image = null;
    if (takeAgain > 50) {
      image = thumbup;
    } else {
      image = thumbdown;
    }
    return <div className="takeAgain">{takeAgain}% would take again<img height="15px" width="15px" src={image}/></div>
  }



  render() {
    let main;
    if (this.state.fetched) {
      main =
        <div className="professorContents">
          <h3><a href={this.state.professor.link}>{this.props.profName}</a></h3>
          <div className="quality">{this.getQuality(this.state.professor.quality)}</div>
          <p>Level Of Difficulty: {this.state.professor.difficulty} / 5</p>
          <p>{this.getTakeAgain(this.state.professor.takeAgain)}</p>
          <p>From {this.state.professor.rating}</p>
        </div>
    } else {
      main = 
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
          <ScaleLoader color={"#607D8B"} loading={!this.state.fetched} size={150} />
        </div>
    }
    return (
      <div className="professor">
        {main}
      </div>
    );
  }
}

export default Professor;