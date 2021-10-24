import './App.css';
import Banner from './Components/Banner';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Reddit from './Components/Reddit';
//import Courses from './Components/Courses';
import React, { Component, Profiler  } from 'react';
import axios from 'axios';
import Courses from './Components/Courses';
import Professor from './Components/Professor';
import PreviousQuarters from './Components/PreviousQuarters';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null,
      courseApiData: null,
      courseList: null,
      search: false,
      professors: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get("/api/list").then((result) => this.setState({ ...this.state.course, courseApiData: result, ...this.state.courseList, ...this.state.search, ...this.state.professors }, this.parseCourseList));
 }

 parseCourseList() {
     let courseArr = this.state.courseApiData.data;
     let niceList = [];
     for (let i = 0; i < courseArr.length; i++) {
         let num = courseArr[i].course.num;
         let courseNum = num.split(/(\s+)/).filter( e => e.trim().length > 0).join(" ");
         niceList.push(courseNum);
     }
     console.log("getting course list");
     this.setState({ ...this.state.course, ...this.state.courseApiData, courseList: niceList, ...this.state.search, ...this.state.professors });
 }

  handleChange(search) {
    let courseInfo = this.state.courseApiData.data.find((item) => {
      return item.course.num.split(/(\s+)/).filter( e => e.trim().length > 0).join(" ") == search;
    });
    console.log(courseInfo.profs);
    this.setState({ course: search, ...this.state.courseApiData, ...this.courseList, search: true, professors: courseInfo.profs });
  }

  render() {
    const course = this.state.course;
    let display;
    if (this.state.search) {
      display =
      <div>
        <Courses course={this.state.course} />
        <div className="prof-container">
          <h2>Winter 2022 Professors</h2>
          {this.state.professors.map((prof, i) => (
            <Professor key={i} profName={prof} />
          ))}
        </div>
        <PreviousQuarters course={this.state.course} />
        <h2 className="reddit-title">Popular Q&As from Reddit</h2>
        <Reddit course={this.state.course} />
      </div>
    } else {
      display = <Home />
    }
    return (
      <div className="App">
        <Banner courseList={this.state.courseList} value={course} onChange={this.handleChange} />
        {display}
        <Footer />
    </div>
    );
  }
}

export default App;

