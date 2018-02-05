import React from 'react'
import '../css/stylesheet.css'
import {connect} from 'react-redux'

const ListingsFilterBar = (props) => {

  function handleChange(){
    
  }

  return(
    <div class="ui segment">
      <form class="ui form">

        <h4 class="ui dividing header">Filter By Location:</h4>
        <div class="fields">

          <div class="five wide field">
            <label>Location</label>
            <input type="text" name="location" placeholder="Street Address, Zip Code"/>
          </div>

          <div class="three wide field">
            <label>Distance: </label>
            <select class="ui fluid search dropdown" name="distance-miles">
              <option value="">Miles</option>
              <option value="1">.25</option>
              <option value="2">.5</option>
              <option value="3">1</option>
              <option value="4">3</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

          <h4 class="ui dividing header">Filter By Cost:</h4>
          <div class="fields">

            <div class="three wide field">
              <label>Compensation Type </label>
              <select class="ui fluid search dropdown" name="compensation-type">
                <option value="">Type</option>
                <option value="1">Monetary Only</option>
                <option value="2">Percentage of Crops Only</option>
                <option value="3">Hybrid</option>
              </select>
            </div>
          </div>

          <h4 class="ui dividing header">Filter By Requested Garden Type:</h4>
          <div class="fields">

            <div class="three wide field">
              <label>Garden Type </label>
              <select class="ui fluid search dropdown" name="garden-type">
                <option value="">Type</option>
                <option value="1">Vegetable</option>
                <option value="2">Herb</option>
                <option value="3">Flower</option>
              </select>
            </div>
          </div>



        <div class="ui small black button"><i class="search icon"></i>Search</div>
      </form>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {user: state.user, listings: state.listings}
}

export default connect(mapStateToProps, null)(ListingsFilterBar)
