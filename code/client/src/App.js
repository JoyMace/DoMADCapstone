import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import NavBar from './components/Navbar/Navbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Footer from './components/Footer/Footer';

import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Account from './components/Pages/Account';
import Blogs from './components/Pages/Blogs';
import Contact from './components/Pages/Contact';
import Disclaimer from './components/Pages/Disclaimer';
import Faq from './components/Pages/Faq';
import Register from './components/Pages/Register';
import SearchLocations from './components/Pages/SearchLocations';
import Login from './components/Pages/Login';
import HowItWorks from './components/Pages/HowItWorks';
import CountryPages from './components/CountryPages/CountryPages';
import IndividualBlogs from './components/Pages/IndividualBlogs';
import Reset from './components/Pages/Reset';
import Reset_token from './components/Pages/Reset_token';

import ReactDOM from 'react-dom';

const reqLoc = 'http://localhost:5000';

class App extends Component {
  state = {
      data: null,
      sideDrawerOpen: false
    };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return{sideDrawerOpen: !prevState.sideDrawerOpen};
    })
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.getExample()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.postExample()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  // example GET request
  getExample = async () => {

    console.log(reqLoc)
    const response = await fetch(reqLoc + '/api/user/trip/all-trips');
    const data = await response.json();
    if (response.status !== 200) {
      console.log('this:' + data.message)
      throw Error(response.message)
    }
    
    return data;
  };

  // example POST request
  postExample = async () => {

    const reqBody = {
      "username": "tbone",
      "firstName": "thomas",
      "lastName": "young",
      "email": "thomas@me.com",
      "password": "Password",
      "verifyPassword": "Password",
      "country": "brazil",
      "city": "scooby dooooooo"
    }
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    };

    const response = await fetch(reqLoc + '/api/user/auth/signup', requestOptions);
    const data = await response.json();
    console.log(data)
    if (response.status !== 200) {
      throw Error(data.message)
    }

    console.log(data)
    return requestOptions;

  };

  /* determine current path for navbar rendering, other stuff */
  /*current_path() {
    let active_path = null
    const { router } = this.context
    const { path } = this.props
    console.log({path})
    if (path && router) {
      const { location } = router
      active_path = this.matchPath(location.pathname, { path }) != null
    }
    this.setState({ active_path })
  }*/


  render() {
    let backdrop;
  
    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      // The 'Switch' renders the component for the first matching path
          // If path is "/" ==> Home page
          // Else ==> NavBar, SideDrawer, {backdrop}??
          // If path is "/" ==> Home page
          // Else ==> NavBar, SideDrawer, {backdrop}
      <Router>
        <div style={{height: '100%'}}>

          <Switch>
            location.path
              <Route exact path ="/"
                  component={Home}/>
              <Route path ="/:subpath"
                  render={props => (
                      <div>
                        <NavBar drawerClickHandler={this.drawerToggleClickHandler} />
                        <SideDrawer show={this.state.sideDrawerOpen} />
                        {backdrop}
                      </div>
                  )}
              />
              <Route />
          </Switch>
          {backdrop}
          <Route path="/about" component={About} />
          <Route path="/account" component={Account} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/contact" component={Contact} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/faq" component={Faq} />
          <Route path="/register" component={Register} />
          <Route path="/search_locations" component={SearchLocations} />
          <Route path="/login" component={Login} />
          <Route path="/how_it_works" component={HowItWorks} />
          <Route path="/country_pages" component={CountryPages} />
          <Route path="/forgot" component={Reset} />
          <Route path="/individual_blogs" component={IndividualBlogs} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
