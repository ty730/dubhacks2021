import './../App.css';
import React, { Component } from 'react';

import axios from 'axios';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
        foundCourse: {num: "no course number found", name: "no course name found"},
        courseDescription: ""
    };
  }

  componentDidMount() {
    axios.get("/api/list").then((result) => this.setState({ courseList: result }, this.parseCourseList));
    axios.post("/api/course_desc", {course: this.props.course}).then((response) => {
      this.setState({courseDescription: response.data});
    });
  }

  parseCourseList() {
      let searched = this.props.course;
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
          <p>{ this.state.courseDescription }</p>
      </div>
    );
  }
}

export default Courses;