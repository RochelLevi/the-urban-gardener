import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import {connect} from 'react-redux'

import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserListings from './ProfileUserListings'
import ProfileAddListing from './ProfileAddListing'


const Profile =  (props) => {

    return (
      <div className="ui container">
        <h3> Welcome, {props.user.username}</h3>

        <ProfileUserInfo/>
        <ProfileUserListings/>
        <ProfileAddListing/>

      </div>
    )
}

const mapStateToProps = (state) => {
  return {user: state.user, listings: state.listings}
}

export default withAuth(connect(mapStateToProps, null)(Profile))
