import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import '../css/stylesheet.css'
import { connect } from 'react-redux';
import * as actions from '../actions';

class Navbar extends Component {
  state = {
    authCompleted: this.props.loggedIn
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.fetchUser;
    } else {
      this.setState({ authCompleted: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.setState({ authCompleted: true });
    }
  }

  render(){
    return (
      <div class="ui top fixed menu">
        <NavLink to="/" className="item"><img className='icon' src={require("../css/images/carrot-icon-3.png")}></img></NavLink>
        <NavLink className="item" to="/my-profile" className="item">Profile</NavLink>
        <NavLink className="item" to="/search-listings" className="item">Search Listings</NavLink>
        <NavLink className="item" to="/messages" className="item">Messages</NavLink>
        <div class="right menu">
          {this.props.loggedIn ? <a className="item" onClick={this.props.logoutUser}>Logout</a> :
          <NavLink className="item" to="/login" className="item">Login</NavLink>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.auth.currentUser.id
  }
}

export default connect(mapStateToProps, actions)(Navbar)
