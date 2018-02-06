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

    }
  }

  handleChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    this.setState({[field]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.changeListingsFilter(this.state)
    // this.props.filterListings(this.props.listings, this.state)
    const origin = this.state.location ? this.state.location : `${this.props.user.street_address}, ${this.props.user.zip}`
    this.props.addLocation(this.props.listings, origin, true, this.state)
  }

  render(){
    return(
      <div class="ui segment">
        <form class="ui form" >

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
