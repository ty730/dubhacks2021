import './App.css';
import Banner from './Components/Banner';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Reddit from './Components/Reddit';
//import Courses from './Components/Courses';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component  } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(search) {
    this.setState({ course: search });
  }

  render() {
    const course = this.state.course;
    return (
      <div className="App">
      <Router>
        <h1>{course}</h1>
        <Banner value={course} onChange={this.handleChange} />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
    );
  }
}

export default App;

