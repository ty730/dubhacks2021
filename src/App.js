import './App.css';
import Banner from './Components/Banner';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Reddit from './Components/Reddit';
//import Courses from './Components/Courses';
import React, { Component  } from 'react';
import axios from 'axios';
import Courses from './Components/Courses';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null,
      courseApiData: null,
      courseList: null,
      search: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get("/api/list").then((result) => this.setState({ ...this.state.course, courseApiData: result, ...this.state.courseList, ...this.state.search }, this.parseCourseList));
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
     this.setState({ ...this.state.course, ...this.state.courseApiData, courseList: niceList, ...this.state.search });
 }

  handleChange(search) {
    this.setState({ course: search, ...this.state.courseApiData, ...this.courseList, search: true });
  }

  render() {
    const course = this.state.course;
    let display;
    if (this.state.search) {
      display = <Courses />
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

