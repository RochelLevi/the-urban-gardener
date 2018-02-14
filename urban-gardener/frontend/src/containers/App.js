import React, { Component } from 'react';
import '../css/App.css';
import {Route, withRouter} from 'react-router-dom'

import NavBar from '../components/Navbar'
import Register from '../components/Register'
import Login from '../components/Login'
import ListingsSearchContainer from '../components/ListingsSearchContainer'
import MailBoxContainer from '../components/MailBoxContainer'
import Profile from '../components/Profile'
import ListingShow from '../components/ListingShow'

class App extends Component {

  render() {
    return (
        <div>
          <NavBar/>
            <Route exact path='/' component={Profile}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/my-profile" component={Profile}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/messages" component={MailBoxContainer}/>
            <Route exact path="/search-listings" component={ListingsSearchContainer}/>
            <Route exact path="/listings/:id" component={ListingShow}/>
        </div>
      )
    }
  }

export default withRouter(App);
