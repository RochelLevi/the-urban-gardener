import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import {connect} from 'react-redux'
import * as actions from '../actions';
import { Divider, Segment, Container, Form, Grid, Menu} from 'semantic-ui-react'
import Conversation from './Conversation.js'


class MailBoxContainer extends React.Component{
  constructor(){
    super()

    this.state = {
      activeItem: ''
  }
}

  handleItemClick = (e, item) => this.setState({ activeItem: item })

  // const this.props.user.converastions[0]s = this.props.user.conversations.map((conversation) => {
  //   return <Conversation conversation={conversation}/>
  // })



  render(){

    const conversations = this.props.user.conversations.map((conversation) => {
      const name = conversation.recipient_name === this.props.user.username ? conversation.sender_name : conversation.recipient_name
      return <Menu.Item name={name} active={this.state.activeItem === name} onClick={(e) => this.handleItemClick(e, conversation)}/>
    })

    return(
      <Container>
        <h1> Your Conversations</h1>
        <Divider />

        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              {conversations}
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={16}>
              {this.props.user.conversations.length ? null : "You have no messages"}
              {this.state.activeItem ?
                <Segment>
                  <Conversation conversation={this.state.activeItem}/>
                </Segment> :
                  null}

          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {user: state.user}
}

export default withAuth(connect(mapStateToProps, actions)(MailBoxContainer))
