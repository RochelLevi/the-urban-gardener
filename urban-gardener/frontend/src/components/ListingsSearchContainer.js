import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import ListingCard from './ListingCard'
import ListingFilterBar from './ListingFilterBar'
import {connect} from 'react-redux'

class ListingsSearchContainer extends React.Component{

  constructor(){
    super()

    this.state = {
      showFilterBar: false
    }
  }

  addDistanceToListings = (listings, inputOrigin, filtered, filters=[]) => {

    const origin = inputOrigin.replace(/[\s]+/g, '+')
    const urlRoot = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    const key = 'AIzaSyBISW6GubT1FZyI10G3-wifH_rm5eQZrdk'
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const METER_TO_MILE = 0.000621371
    const listingsWithDistance = []

    listings.forEach((l) => {
      const destination = `${l.street_address}, ${l.zip}`.replace(/[\s]+/g, '+')
      const apiRoute = `${urlRoot}origins=${origin}&destinations=${destination}&key=${key}&units=imperial&mode=walking`
      fetch(proxyUrl + apiRoute)
        .then(res => res.json())
        .then(data => {
          //handle bad address
          let dist_text = data.rows[0].elements[0].distance.text
          let dist_value = parseInt(data.rows[0].elements[0].distance.value)
          let newListing = Object.assign({}, l, {distance_text: dist_text, distance_value: dist_value})
          listingsWithDistance.push(newListing)
        }).then(() => {
          listingsWithDistance.length === listings.length ? this.props.updateListingsWithDistance(listingsWithDistance, filtered, filters) : null
        })
    })

  }

  // componentWillReceiveProps(nextProps){
  //   // console.log(nextProps.filterListings.listings)
  //   // console.log(nextProps.filters.location)
  //   // console.log(this.props.filters.location)
  //   if (nextProps.filters.location !== this.props.filters.location ||
  //       nextProps.filters.distance_miles !== this.props.filters.distance_miles ||
  //       nextProps.filters.garden_type !== this.props.filters.garden_type ||
  //       nextProps.filters.compensation_type !== this.props.filters.compensation_type ||
  //       !this.props.listings[0].street_address){
  //         console.log('here')
  //     const userOrigin = `${this.props.user.street_address}, ${this.props.user.zip}`
  //     const filterOrigin = nextProps.filters.location ? nextProps.filters.location : `${this.props.user.street_address}, ${this.props.user.zip}`
  //     // console.log('filter origin', filterOrigin)
  //     this.addDistanceToListings(nextProps.listings, userOrigin, false)
  //     this.addDistanceToListings(nextProps.filteredListings.listings, filterOrigin, true, nextProps.filters)
  //   }
  //
  //
  // }

  componentDidMount(){
    console.log('mounting')
    const userOrigin = `${this.props.user.street_address}, ${this.props.user.zip}`
    const filterOrigin = this.props.filters.location ? this.props.filters.location : `${this.props.user.street_address}, ${this.props.user.zip}`
    console.log(userOrigin)
    this.addDistanceToListings(this.props.listings, userOrigin, false)
    this.addDistanceToListings(this.props.filteredListings.listings, filterOrigin, true, this.props.filters)
  }



  render(){
    console.log(this.props.listings)
    const listingCards = this.props.filteredListings.filtered ?
    this.props.filteredListings.listings.map(listing => <ListingCard listing={listing}/>) :
    this.props.listings.map(listing => <ListingCard listing={listing}/>)
    return(
      <div class="ui container">


        <span class="ui small black button" onClick={() => {this.setState({showFilterBar: !this.state.showFilterBar})}}>
          <i class="filter icon"></i>
          Filter Listings
        </span>

        <br/>
        <br/>

        {this.state.showFilterBar ? <ListingFilterBar addLocation={this.addDistanceToListings}/> : null }

        <br/>

        {listingCards.length ? null : <h3> Sorry, no listings matched your search</h3>}

        <div class="ui link cards">
          {listingCards}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, listings: state.listings, filteredListings: state.filteredListings, filters: state.listingsFilters}
}

export default withAuth(connect(mapStateToProps, null)(ListingsSearchContainer))
