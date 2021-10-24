import './../App.css';
import React, { Component  } from 'react';
import { FcSearch } from 'react-icons/fc'

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
  }

  render() {
    return (
      <div className="banner">
        <h1>DubHacks 2021</h1>
      <div className='rowC'>
        <input
        name = "courseNumber"
        type = "text"
        onChange={this.onInputchange}
        placeholder = "search for a course"
        className = "searchBox"
        >
        </input>
{console.log(this.state)}
        <h3>
           <FcSearch size={50} className='searchIcon'/> </h3>
           </div>
      </div>
      
    );
  }
}

export default Banner;