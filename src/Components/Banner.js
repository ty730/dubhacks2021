import './../App.css';
import React, { Component  } from 'react';
import { FcSearch } from 'react-icons/fc';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      error: ""
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onInputchange(event) {
    this.setState({
      courseName: event.target.value,
      ...this.state.error
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let err = "";
    if (this.props.courseList.includes(this.state.courseName.toUpperCase())) {
      this.props.onChange(this.state.courseName.toUpperCase());
    } else {
      err = "You must enter a valid course with the pattern [department abbr.] [course number], ex: CSE 142, cse 143"
    }
    this.setState({
      ...this.state.courseName,
      error: err
    })
  }

  render() {
    return (
      <div className="banner">
        <div className="top-banner">
          <h1>CLASS-ify</h1>
          <h3>now serving winter 2022</h3>
          <form className="searchForm" onSubmit={this.handleSubmit}>
            <input
              name = "courseNumber"
              type = "text"
              onChange={this.onInputchange}
              placeholder = "search for a course"
              className = "searchBox"
              >
              {console.log(this.state)}
              </input>
              <button type="submit" className="search-btn">
              <FcSearch size={30} className='searchIcon'/>
              </button>
            </form>
          </div>
          <div className="error-container">
            <p className="error-message">{this.state.error}</p>
          </div>
      </div>

    );
  }
}

export default Banner;