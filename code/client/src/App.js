import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import NavBar from './components/Navbar/Navbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
// import Footer from './components/Footer/Footer';

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
import Footer from './components/Footer/Footer';

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
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
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

          <Footer />
        </div>
      </Router>
    );

    /*
          <NavBar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />

          <Route exact path="/" component={Home} />
    */
    /*return (
      <div>
        <h1>Signup</h1>

        <form action="/api/user/signup" method="POST" >
          Username: <input type="text" name="username" /><br/>
          First Name: <input type="text" name="firstName" /><br/>
          Last Name: <input type="text" name="lastName" /><br/>
          Email: <input type="text" name="email" /><br/>
          Password: <input type="password" name="password" /><br/>
          Verify Password: <input type="password" name="verifyPassword" /><br/>
          <button type="submit">send</button>
        </form>

        <h1>Login</h1>

        <form action="/api/user/login" method="POST" >
          Username: <input type="text" name="username" /><br/>
          Password: <input type="password" name="password" /><br/>
          <button type="submit">send</button>
        </form>

        <form action="/api/user/logout" method="POST" >
          <button type="submit">logout</button>
        </form>
      </div>
    );*/
  }
}

export default App;
