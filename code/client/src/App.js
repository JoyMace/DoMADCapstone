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
import CountryInfo from './components/CountryPages/CountryInfo';
import BlogPosts from './components/CountryPages/BlogPosts';
import DonationItems from './components/CountryPages/DonationItems';
import Organizations from './components/CountryPages/Organizations';
import Tabs from './components/CountryPages/Tabs';
import Reset from './components/Pages/Reset';
import Reset_token from './components/Pages/Reset_token';

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
          <Switch>
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
          <Route path="/country_info" component={CountryInfo} />
          <Route path="/blog_posts" component={BlogPosts} />
          <Route path="/donation_items" component={DonationItems} />
          <Route path="/organizations" component={Organizations} />
          <Route path="/tabs" component={Tabs} />
          <Route path="/forgot" component={Reset} />
          <Route path="/:token" component={Reset_token} /> {/*//Leave this line last*/}
          </Switch>

          <Footer />
        
      </Router>
    );
  }
}

export default App;
