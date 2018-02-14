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
      this.props.fetchUser();
    } else {
      this.setState({ authCompleted: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.setState({ authCompleted: true });
    }
  }

  unreadMessages = () => {
    const unreadRaw = this.props.user.conversations.map( conv => {
      return conv.messages.filter(mess => {
        return !mess.read && mess.user_id !== this.props.user.id
      })
    })

    return [].concat.apply([], unreadRaw)
  }

  render(){
    this.unreadMessages()
    return (
      <div className="ui top fixed menu">
        <NavLink to="/" className="item"><img alt='' className='icon' src={require("../css/images/001-herb.png")}></img></NavLink>
        <NavLink className="item" to="/my-profile" className="item">Profile</NavLink>
        <NavLink className="item" to="/search-listings" className="item">Search Listings</NavLink>
        <NavLink className="item" to="/messages" className="item">{this.unreadMessages().length ? <b>{`Messages (${this.unreadMessages().length})`}</b> : 'Messages' }</NavLink>
        <div className="right menu">
          {this.props.loggedIn ? <a className="item" onClick={this.props.logoutUser}>Logout</a> :
          <NavLink className="item" to="/login" className="item">Login</NavLink>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    user: state.user
  }
}

export default connect(mapStateToProps, actions)(Navbar)
