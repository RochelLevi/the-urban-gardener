import React, { Component } from 'react';
import '../css/App.css';
import {Route, withRouter, Redirect} from 'react-router-dom'

import NavBar from '../components/Navbar'
import Register from '../components/Register'
import Login from '../components/Login'
import ListingsSearchContainer from '../components/ListingsSearchContainer'
import MailBoxContainer from '../components/MailBoxContainer'
import Profile from '../components/Profile'


class App extends Component {

  render() {
    return (
        <div>
          <NavBar/>
          {// <img class="background" src={require("./background-image-2.jpg")}></img>
        }
          <div className='main-content'>
            <Route exact path='/' component={Profile}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/my-profile" component={Profile}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/messages" component={MailBoxContainer}/>
            <Route exact path="/search-listings" component={ListingsSearchContainer}/>
          </div>
        </div>
      )
    }
  }

export default withRouter(App);
