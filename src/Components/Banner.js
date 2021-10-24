import './../App.css';
import React, { Component  } from 'react';
import { FcSearch } from 'react-icons/fc';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onInputchange(event) {
    this.setState({
      courseName: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.courseList.includes(this.state.courseName.toUpperCase())) {
      this.props.onChange(this.state.courseName.toUpperCase());
    }
  }

  render() {
    return (
      <div className="banner">
        <h1>DubHacks 2021</h1>
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

    );
  }
}

export default Banner;