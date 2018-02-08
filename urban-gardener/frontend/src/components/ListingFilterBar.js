import React from 'react'
import '../css/stylesheet.css'
import {connect} from 'react-redux'
import * as actions from '../actions';

class ListingsFilterBar extends React.Component {

  constructor(){
    super()

    this.state = {
      location: '',
      distance_miles: '',
      compensation_type: '',
      garden_type: '',
      invalid_address: false
    }
  }

  validateLocation(location){
    const urlRoot = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    const origin = '59 Carlton Rd, 10952'.replace(' ', '+')
    const key = 'AIzaSyBISW6GubT1FZyI10G3-wifH_rm5eQZrdk'
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    return fetch(proxyUrl + `${urlRoot}origins=${origin}&destinations=${location}&key=${key}`)
      .then(res => res.json())
  }



  handleChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    this.setState({[field]: value, invalid_address: false})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.props.showLoadingBar()
    this.props.changeListingsFilter(this.state)
    let origin;
    if (this.state.location){
      this.validateLocation(this.state.location)
        .then(data => {
          if(data.destination_addresses[0] === ""){
            this.setState({invalid_address: true, location: ''})
          }else{
            this.props.showLoadingBar()
            this.props.addLocation(this.props.listings, this.state.location, true, this.state)
          }
        })
    } else{
      origin = `${this.props.user.street_address}, ${this.props.user.zip}`
      this.props.showLoadingBar()
      this.props.addLocation(this.props.listings, origin, true, this.state)
    }

    // const origin = this.state.location ? this.state.location : `${this.props.user.street_address}, ${this.props.user.zip}`
    // this.props.addLocation(this.props.listings, origin, true, this.state)
  }

  render(){
    return(
      <div class="ui segment">
        <form class="ui form error" >

          <h4 class="ui dividing header">Filter By Location:</h4>
          <div class="fields">

            <div class="five wide field">
              <label>Location</label>
              <input type="text" name="location" placeholder="Street Address, Zip Code" onChange={this.handleChange} value={this.state.location}/>
            </div>

            <div class="three wide field">
              <label>Distance: </label>
              <select class="ui fluid search dropdown" name="distance_miles" onChange={this.handleChange} value={this.state.distance_miles}>
                <option value="">Miles</option>
                <option value=".25">.25</option>
                <option value=".5">.5</option>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

            <h4 class="ui dividing header">Filter By Cost:</h4>
            <div class="fields">

              <div class="three wide field">
                <label>Compensation Type </label>
                <select class="ui fluid search dropdown" name="compensation_type" onChange={this.handleChange} value={this.state.compensation_type}>
                  <option value="">Type</option>
                  <option value="Monetary">Monetary Only</option>
                  <option value="Percentage of Crops">Percentage of Crops Only</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <h4 class="ui dividing header">Filter By Requested Garden Type:</h4>
            <div class="fields">

              <div class="three wide field">
                <label>Garden Type </label>
                <select class="ui fluid search dropdown" name="garden_type" onChange={this.handleChange} value={this.state.garden_type}>
                  <option value="">Type</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Herb">Herb</option>
                  <option value="Flower">Flower</option>
                </select>
              </div>
            </div>

            {this.state.invalid_address ?
              <div class="ui error message">
                <div class="header">Error</div>
                <p>Please Enter A Valid Location</p>
              </div> :
            null}


          <div class="ui small black button" onClick={this.handleSubmit}><i class="search icon"></i>Search</div>
        </form>
      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {listings: state.listings, user: state.user}
}

export default connect(mapStateToProps, actions)(ListingsFilterBar)
