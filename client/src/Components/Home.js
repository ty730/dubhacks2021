import '../App.css';
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className="home">
        <h1 className='homeHeadings'>About this project</h1>
        <p className='homeText'>
          This project is aimed to help alleviate the pressures and pains of course-planning at UW.
          <br/>
          Using our site, students can search for their desired courses and review the course's professor,
          content, and general ratings.
          <br/>
          We scrape data from UW’s Course Evaluation Catalog, RateMyProfessor, each course’s homepage,
          and the r/udub subreddit in order to give a holistic overview of the course offering.
        </p>
        <h1 className='homeHeadings'>How to use</h1>
        <p className='homeText'>
          Using the search bar in the top right, type in the course code and then either select the magnifying glass or press the ENTER key.
        </p>
        <h1 className='homeHeadings'>About the team</h1>
        <p className='homeText'>
          We’re a team of four UW students, working on this project for Dubhacks ‘21.
        </p>
      </div>
    );
  }
}

export default Home;