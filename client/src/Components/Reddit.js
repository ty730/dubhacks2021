import '../App.css';
import React, { Component } from 'react';
import axios from 'axios';
import ScaleLoader from "react-spinners/ScaleLoader";

class Reddit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      fetched: false,
    };
  }

  componentDidMount() {
    this.wrapper();
  }

  wrapper() {
    axios.post('https://uwclassify.herokuapp.com/api/reddit', {
      course: this.props.course
    }).then((res) => {
        console.log("here");
      console.log(res.data);
      this.setState({response: res.data, fetched: true});
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.course != prevProps.course)
    {
      this.wrapper();
    }
  } 

  render() {
    let main;
    if (this.state.fetched) {
      main = <div className="reddit">{this.state.response.map((redditPost, i) => {
          return (<div>
            <h2 key={i}>{redditPost.selftext}</h2>
            {redditPost.comments.map((comment, j) => {
                return (
                    <p key={i}>{comment.body}</p>
                )
            })}
            </div>
            )
      })}</div>
    } else {
      main = <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
      <ScaleLoader color={"#607D8B"} loading={!this.state.fetched} size={150} />
    </div>
    }
    return (
      <div>
        {main}
      </div>
    );
  }
}

export default Reddit;