import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import {connect} from 'react-redux'
import * as actions from '../actions';
import { Divider, Segment, Container, Form, Grid, Menu, Label} from 'semantic-ui-react'
import Conversation from './Conversation.js'


class MailBoxContainer extends React.Component{
  constructor(){
    super()

    this.state = {
      activeItem: ''
  }
}

  handleItemClick = (e, item) => {
    this.setState({ activeItem: item })
    item.messages.forEach(m => {
      m.read ? null : this.props.markMessageAsRead(m.id)
    })
  }

  unreadMessages = (conversation) => {
    return conversation.messages.filter(mess => {
      return !mess.read && mess.user_id !== this.props.user.id
    })
  }

  render(){
    const conversations = this.props.user.conversations.map((conversation) => {
      const name = conversation.recipient_name === this.props.user.username ? conversation.sender_name : conversation.recipient_name
      return <a className="item" active={`${this.state.activeItem === name}`} onClick={(e) => this.handleItemClick(e, conversation)}>
              {this.unreadMessages(conversation).length ? <div className="ui black label"> {this.unreadMessages(conversation).length}</div> : null}
              {this.unreadMessages(conversation).length ? <b>{name}</b> : name}
            </a>

    })

    return(
      <div>
        <img alt='' className="background" src={require("../css/images/background-image-3.jpg")}></img>
        <div className='main-content'>
          <Container>
            <h1> Your Conversations</h1>
            <Divider />
            {this.props.user.conversations.length ?
              <Grid>
                <Grid.Column width={5}>
                  <div className="ui small vertical menu">
                    {conversations}
                  </div>
                </Grid.Column>

                <Grid.Column stretched width={11}>
                    {this.state.activeItem ?
                      <Segment>
                        <Conversation conversation={this.state.activeItem}/>
                      </Segment> :
                        null}

                </Grid.Column>
              </Grid> : <h4>You have no messages</h4>}

          </Container>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {user: state.user}
}

export default withAuth(connect(mapStateToProps, actions)(MailBoxContainer))
