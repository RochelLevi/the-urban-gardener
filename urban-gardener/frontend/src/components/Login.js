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
    this.props.fetchListings()
  };

  render(){

    const loginError =
      <div className="ui red message">
        <div className="ui error message">
          <i className="close icon"></i>
          <div className="header">Your credentials are invalid. Please try again.</div>
        </div>
      </div>

    return(
    <div style={{'padding-top': '2.5%'}}>
        <img alt='' className="background" src={"https://static.pexels.com/photos/606540/pexels-photo-606540.jpeg"}></img>
      <div className="main-content">
        <div id='welcomeForm' className="ui middle aligned center aligned grid">

          <div className="column">

            <form onSubmit={this.handleSubmit} className="ui large form">
              <div className="ui stacked secondary segment">

                <h2 className="ui image header">
                  <div className="content">
                    Log-in to your account
                  </div>
                </h2>


                {this.props.loginError ? loginError : null }

                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input onChange={this.handleChange} type="text" name="email" placeholder="E-mail" value={this.state.fields.username}/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.fields.password}/>
                  </div>
                </div>
                <button className="ui fluid large black submit button">Login</button>
              </div>

              <div className="ui error message"></div>

            </form>

            <div className="ui message">
              New to us? <a href="/register">Register</a>
            </div>
          </div>
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
