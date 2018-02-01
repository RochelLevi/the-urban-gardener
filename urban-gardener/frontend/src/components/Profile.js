import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import {connect} from 'react-redux'

const Profile = () => {
  return(
    <div className="main-content">
      <h1>Profile</h1>
    </div>
  )
}
const mapStateToProps = (state) => {
  
}

export default withAuth(connect(mapStateToProps, null)(Profile))
