import './../App.css';
import React, { Component  } from 'react';
import { FcSearch } from 'react-icons/fc';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onInputchange = this.onInputchange.bind(this);
  }
  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="banner">
        <h1>DubHacks 2021</h1>
        <h3>now serving winter 2022</h3>
        <input
          name = "courseNumber"
          type = "text"
          onChange={this.onInputchange}
          placeholder = "search for a course"
          className = "searchBox"
          >
          {console.log(this.state)}
        </input>
        <button className="search-btn">
          <FcSearch size={50} className='searchIcon'/>
          </button>
      </div>

    );
  }
}

export default Banner;