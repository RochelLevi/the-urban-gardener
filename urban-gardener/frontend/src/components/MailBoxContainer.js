import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import {connect} from 'react-redux'
import * as actions from '../actions';
import { Divider, Segment, Container, Form} from 'semantic-ui-react'
import Conversation from './Conversation.js'


const MailBoxContainer = (props) => {


  const conversations = props.user.conversations.map((conversation) => {
    return <Conversation conversation={conversation}/>
  })

  return(
    <Container>
      <h1> Your Conversations</h1>
      <Divider />
      <div>{conversations}</div>
    </Container>
  )
}


const mapStateToProps = (state) => {
  return {user: state.user}
}

export default withAuth(connect(mapStateToProps, actions)(MailBoxContainer))
