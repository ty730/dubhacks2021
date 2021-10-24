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
      course: this.props.course //TODO REPLACE WITH PROP
    }).then((res) => {
        console.log("here");
      console.log(res.data);
      this.setState({response: res.data, fetched: true});
    });
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