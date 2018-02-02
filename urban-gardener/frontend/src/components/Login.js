import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import '../css/stylesheet.css'



class Login extends React.Component {

  constructor() {

    super();

    this.state = {
      error: false,
      fields: {
        email: '',
        password: ''
      }
    };
  }

  handleChange = (e) => {
    if (e.target.name === 'email'){
      this.setState({fields: {...this.state.fields, email: e.target.value}})
    } else {
      this.setState({fields: {...this.state.fields, password: e.target.value}})
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { fields: { email, password } } = this.state;
    this.props.loginUser(email, password, this.props.history);
  };

  render(){

    const loginError =
      <div class="ui red message">
        <div classname="ui error message">
          <i classname="close icon"></i>
          <div classname="header">Your credentials are invalid. Please try again.</div>
        </div>
      </div>

    return(

    <div className="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui image header">
          <div class="content">
            Log-in to your account
          </div>
        </h2>

        <form onSubmit={this.handleSubmit} class="ui large form">
          <div class="ui stacked secondary segment">

            {this.props.loginError ? loginError : null }

            <div class="field">
              <div class="ui left icon input">
                <i class="mail icon"></i>
                <input onChange={this.handleChange} type="text" name="email" placeholder="E-mail" value={this.state.fields.username}/>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.fields.password}/>
              </div>
            </div>
            <button class="ui fluid large black submit button">Login</button>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          New to us? <a href="/register">Register</a>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {loginError: state.loginError}
}

export default withRouter(connect(mapStateToProps, actions)(Login))
