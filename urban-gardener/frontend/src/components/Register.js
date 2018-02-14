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
      showError: false,
    }
  }


  handleSubmit = (event) => {
    event.preventDefault()
    const data = {email: this.state.email, username: this.state.username, password: this.state.password, street_address: this.state.streetAddress, zip: this.state.zipCode}
    this.props.registerUser(data, this.props.history);
    this.setState({email: '', username: '', password: '', streetAddress: '', zipCode: '', showError: true})
    this.props.registerError.isError ? this.props.clearOutRegisterErrors() : null
  }

  handleChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    this.setState({[field]: value, showError: false})
  }

  render(){



      const backendErrors =
        <div className="ui red message">
          <div className="ui error message">
            <i className="close icon"></i>
            <div className="header">Please Fix Error(s) Below</div>
            <ul className="list">
              {this.props.registerError.errors.map(error => <li>{error}</li>).concat(' ')}
            </ul>
          </div>
        </div>

    return(
      <div>
        <img alt='' className="background-register" src={require("../css/images/background-image-3.jpg")}></img>
        <div className="main-content">
            <div id='welcomeForm' className="ui middle aligned center aligned grid">
              <div className="column">

                <form className="ui large form" onSubmit={this.handleSubmit}>

                  <div className="ui stacked secondary segment">

                    <h2 className="ui image header">
                      <div className="content">
                        Register For An Account
                      </div>
                    </h2>


                    {this.props.registerError.isError && this.state.showError ? backendErrors : null}

                    <div className="field">
                      <div className="ui left icon input">
                        <i className="mail icon"></i>
                        <input required type="email" name="email" placeholder="E-mail" value={this.state.email} onChange={this.handleChange} onBlur={this.handleBlur}/>
                      </div>
                    </div>

                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input required type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} onBlur={this.handleBlur}/>
                      </div>
                    </div>

                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input required type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} onBlur={this.handleBlur}/>
                      </div>
                    </div>

                    <div className="field">
                      <div className="ui left icon input">
                        <i className="home icon"></i>
                        <input required type="text" name="streetAddress" placeholder="Street Adddress" value={this.state.streetAddress} onChange={this.handleChange} onBlur={this.handleBlur}/>
                      </div>
                    </div>


                  <div className="field">
                    <div className="ui left icon input">
                      <i className="marker icon"></i>
                      <input required type="number" name="zipCode" placeholder="Zip Code" value={this.state.zipCode} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    </div>
                  </div>
                  <button className="ui fluid large black submit button">Register</button>
                </div>

                </form>

              </div>
            </div>
          </div>
        </div>)
  }

}

const mapStateToProps = (state) => {
  return {registerError: state.registerError}
}

export default connect(mapStateToProps, actions)(Register)
