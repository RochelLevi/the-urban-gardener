import React from 'react'
import '../css/stylesheet.css'
import * as actions from '../actions';
import { connect } from 'react-redux';


class Register extends React.Component {
  constructor(){
    super()

    this.state = {
      email: '',
      username: '',
      password: '',
      streetAddress: '',
      zipCode: '',
      touched: {
        email: false,
        username: false,
        password: false,
        streetAddress: false,
        zipCode: false
      },
      errors: {
        email: true,
        username: true,
        password: true,
        streetAddress: true,
        zipCode: true
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = {email: this.state.email, username: this.state.username, password: this.state.password, street_address: this.state.streetAddress, zip: this.state.zipCode}
    this.props.registerUser(data, this.props.history);
  }

  checkValid(){
    this.setState({
      errors: {email:  !this.state.email.length > 0,
              username: !this.state.username.length > 0,
              password: !this.state.password.length > 0,
              streetAddress: !this.state.streetAddress.length > 0,
              zipCode:  !(this.state.zipCode.length == 5 && this.state.zipCode > 0)

              }
    })
  }


  handleChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    switch(field) {
      case "email":
        this.setState({email: value}, this.checkValid)
        break;
      case "username":
        this.setState({username: value}, this.checkValid)
        break;
      case "password":
        this.setState({password: value}, this.checkValid)
        break;
      case "street-address":
        this.setState({streetAddress: value}, this.checkValid)
        break;
      case "zip-code":
        this.setState({zipCode: value}, this.checkValid)
        break;
      default:
        null;
    }
  }

  handleBlur = (e) => {
    const field = e.target.name
    const value = e.target.value
    switch(field) {
      case "email":
        this.setState({touched: {...this.state.touched, email: true}}, this.checkValid)
        break;
      case "username":
        this.setState({touched: {...this.state.touched, username: true}}, this.checkValid)
        break;
      case "password":
        this.setState({touched: {...this.state.touched, password: true}}, this.checkValid)
        break;
      case "street-address":
        this.setState({touched: {...this.state.touched, streetAddress: true}}, this.checkValid)
        break;
      case "zip-code":
        this.setState({touched: {...this.state.touched, zipCode: true}}, this.checkValid)
        break;
    }
  }


  render(){

    const disabled = this.state.errors.username ||
        this.state.errors.password ||
        this.state.errors.streetAddress ||
        this.state.errors.email ||
        this.state.errors.zipCode

    const displayErrors = (this.state.errors.username  && this.state.touched.username) ||
        (this.state.errors.password && this.state.touched.password) ||
        (this.state.errors.streetAddress && this.state.touched.streetAddress) ||
        (this.state.errors.zipCode && this.state.touched.zipCode) ||
        (this.state.errors.email && this.state.touched.email)

    const frontendErrors =
      <div class="ui red message">
        <div classname="ui error message">
          <i classname="close icon"></i>
          <div classname="header">Please Fix Error(s) Below</div>
          <ul classname="list">
            {this.state.errors.email && this.state.touched.email ? <li>E-mail can not be blank.</li> : ''}
            {this.state.errors.username && this.state.touched.username ? <li>Username can not be blank.</li> : ''}
            {this.state.errors.password && this.state.touched.password ? <li>Password can not be blank.</li> : ''}
            {this.state.errors.streetAddress && this.state.touched.streetAddress ? <li>Address can not be blank.</li> : ''}
            {this.state.errors.zipCode && this.state.touched.zipCode ? <li>Zip Code must have five digits.</li> : ''}
          </ul>
        </div>
      </div>

      const backendErrors =
        <div class="ui red message">
          <div classname="ui error message">
            <i classname="close icon"></i>
            <div classname="header">Please Fix Error(s) Below</div>
            <ul classname="list">
              {this.props.registerError.errors.map(error => <li>{error}</li>).concat(' ')}
            </ul>
          </div>
        </div>

    return(
    <div class="ui middle aligned center aligned grid">
      <div class="column">

        <h2 class="ui image header">
          <div class="content">
            Register For An Account
          </div>
        </h2>


        <form class="ui large form" onSubmit={this.handleSubmit}>
          <div class="ui stacked secondary segment">

            {displayErrors ? frontendErrors : ''}
            {this.props.registerError.isError? backendErrors : ''}

            <div class="field">
              <div class="ui left icon input">
                <i class="at icon"></i>
                <input type="text" name="email" placeholder="E-mail" value={this.state.email} onChange={this.handleChange} onBlur={this.handleBlur}/>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} onBlur={this.handleBlur}/>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} onBlur={this.handleBlur}/>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="home icon"></i>
                <input type="text" name="street-address" placeholder="Street Adddress" value={this.state.streetAddress} onChange={this.handleChange} onBlur={this.handleBlur}/>
              </div>
            </div>


          <div class="field">
            <div class="ui left icon input">
              <i class="marker icon"></i>
              <input type="text" name="zip-code" placeholder="Zip Code" value={this.state.zipCode} onChange={this.handleChange} onBlur={this.handleBlur}/>
            </div>
          </div>
          <button class="ui fluid large black submit button" disabled={disabled}>Register</button>
        </div>

        </form>

      </div>
    </div>)
  }

}

const mapStateToProps = (state) => {
  return {registerError: state.registerError}
}

export default connect(mapStateToProps, actions)(Register)
