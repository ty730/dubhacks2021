import '../App.css';
import React, { Component } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
        foundCourse: {num: "", name: ""},
        courseList: null,
        courseDescription: "",
        fetched: false
    };
  }

  componentDidMount() {
    this.wrapper();
  }

  wrapper() {
    axios.get("https://uwclassify.herokuapp.com/api/list").then((result) => this.setState({ ...this.state.foundCourse, courseList: result, ...this.state.courseDescription, ...this.state.fetched }, this.parseCourseList));
    axios.post("https://uwclassify.herokuapp.com/api/course_desc", {course: this.props.course}).then((response) => {
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
              this.setState({ foundCourse: courseArr[i].course, ...this.state.courseList, ...this.state.courseDescription, fetched: true });
              console.log(courseArr[i]);
          }
      }
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
      main = <div className="courses">
          <h1 >{ this.state.foundCourse.num}: { this.state.foundCourse.name }</h1>
          <p>{ this.state.courseDescription }</p>
      </div>
    } else {
      main = <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
      <ScaleLoader color={"#607D8B"} loading={!this.state.fetched} size={150} />
    </div>
    }
    return (
      <div key={this.props.course}>{main}</div>
    );
  }
}

export default Courses;