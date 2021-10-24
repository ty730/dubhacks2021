import './App.css';
import Banner from './Components/Banner';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Reddit from './Components/Reddit';
//import Courses from './Components/Courses';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  return (

    <div className="App">
      <Router>
        <Reddit />
        <Banner />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;