import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import {connect} from 'react-redux'
import * as actions from '../actions';


const MailBoxContainer = (props) => {
  console.log(props.user)
  return(

    <div className="main-content">
      MailBoxContainer
    </div>
  )
}


const mapStateToProps = (state) => {
  return {user: state.user}
}

export default withAuth(connect(mapStateToProps, actions)(MailBoxContainer))
