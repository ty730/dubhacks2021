import './../App.css';
import React, { Component } from 'react';

import axios from 'axios';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
        foundCourse: {num: "no course number found", name: "no course name found"}
    };
  }

  componentDidMount() {
     axios.get("/api/list").then((result) => this.setState({ courseList: result }, this.parseCourseList));
  }

  parseCourseList() {
      let searched = "CSE 142";
      let courseArr = this.state.courseList.data;
      for (let i = 0; i < courseArr.length; i++) {

          let num = courseArr[i].course.num;
          let courseNum = num.split(/(\s+)/).filter( e => e.trim().length > 0).join(" ");
          if (courseNum === searched) {
              this.setState({ foundCourse: courseArr[i].course });
              console.log(courseArr[i]);
          }
      }
  }

  render() {
    return (
      <div className="courses">
          <h2>{ this.state.foundCourse.num }</h2>
          <h2>{ this.state.foundCourse.name }</h2>
      </div>
    );
  }
}

export default Courses;