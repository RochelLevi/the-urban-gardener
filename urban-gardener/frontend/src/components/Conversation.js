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

  handleChange = (e) => {
    this.setState({message: e.target.value})
  }

  handleSubmit= (e) => {
    e.preventDefault()
    this.props.createMessage({body: this.state.message, user_id: this.props.user.id, sender_id: this.props.user.id, recipient_id: this.props.conversation.recipient_id === this.props.user.id ? this.props.conversation.sender_id : this.props.conversation.recipient_id})
  }

  componentWillReceiveProps(){
    this.setState({show: false})
  }

  render(){


    const messages = this.props.conversation.messages.map(m =>
      <Segment color={m.user_id === this.props.user.id ? 'black' : 'green'} style={m.user_id === this.props.user.id ? {'text-align': 'right'} : {'text-align': 'left'}} >
        On <em>{m.message_time}</em> {this.props.user.id === m.user_id ? 'you' : this.props.conversation.recipient_name === this.props.user.username ? this.props.conversation.sender_name : this.props.conversation.recipient_name} wrote
        <Divider fitted/>
        {m.body}
      </Segment>
    )

    const replyForm = (
      <div>
        <br/>
        <h3>Reply</h3>
        <Divider/>
        <Form>
          <Form.TextArea value={this.state.message} onChange={this.handleChange} label='Message' placeholder='Please enter your message' />
          <Form.Button onClick={this.handleSubmit} size="mini" color='black'><i class="send icon"></i>Send</Form.Button>
        </Form>
      </div>
    )

    return(
      <div>
        <h3>Your Conversation With {this.props.conversation.recipient_name === this.props.user.username ? this.props.conversation.sender_name : this.props.conversation.recipient_name}</h3>
        { messages }
        <button class="ui mini black button" onClick={this.handleShow}><i class="reply icon"></i>Reply</button>
        {this.state.show ? replyForm : null}
      </div>

    )
  }
}


const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps, actions)(Conversation)
