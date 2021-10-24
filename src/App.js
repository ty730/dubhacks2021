import './App.css';
import Banner from './Components/Banner';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Courses from './Components/Courses';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  return (

    <div className="App">
      <Router>
        <Banner />
        <Courses />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;