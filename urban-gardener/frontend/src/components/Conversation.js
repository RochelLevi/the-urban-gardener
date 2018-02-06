import React from 'react'
import '../css/stylesheet.css'
import {connect} from 'react-redux'
import * as actions from '../actions';
import { Divider, Segment, Container, Form} from 'semantic-ui-react'


class Conversation extends React.Component{

  constructor(){
    super()

    this.state = {
      show: false,
      message: ''
    }
  }

  handleShow = () => {
    this.setState({show: !this.state.show})
  }

  render(){

    const messages = this.props.conversation.messages.map(m =>
      <Segment>
        On <em>{m.message_time}</em> {this.props.user.id === m.user_id ? 'you' : this.props.conversation.recipient_name === this.props.user.username ? this.props.conversation.sender_name : this.props.conversation.recipient_name} wrote
        <Divider fitted/>
        {m.body}
      </Segment>
    )

    const replyForm = (
      <div>
        <br/>
        <h4>Reply</h4>
        <Form>
          <Form.TextArea label='Message' placeholder='Please enter your message' />
          <Form.Button color='black'><i class="reply icon"></i>Send</Form.Button>
        </Form>
      </div>
    )

    return(
      <Segment>
        <h4>Your Conversation With {this.props.conversation.recipient_name === this.props.user.username ? this.props.conversation.sender_name : this.props.conversation.recipient_name}</h4>
        <button class="ui mini black button" onClick={this.handleShow}><i class="expand icon"></i>expand</button>
        {this.state.show ? messages : null}
        {this.state.show ? replyForm : null}
      </Segment>

    )
  }
}


const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps, actions)(Conversation)
