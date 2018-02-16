import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import ListingCard from './ListingCard'
import ListingFilterBar from './ListingFilterBar'
import {connect} from 'react-redux'
import { Dimmer, Segment, Loader, Image} from 'semantic-ui-react'

import MyFancyComponent from './Map'

class ListingsSearchContainer extends React.Component{

  constructor(){
    super()

    this.state = {
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps){
    nextProps.listings.length ? this.setState({loading: false}) : null
  }

  showLoadingBar = () => {
    this.setState({loading: true})
  }

  hideLoadingBar = () => {
    this.setState({loading: false})
  }

  addDistanceToListings = (listings, inputOrigin, filters=[]) => {
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
          try {
            let dist_text = data.rows[0].elements[0].distance.text
            let dist_value = parseInt(data.rows[0].elements[0].distance.value)
            let newListing = Object.assign({}, l, {distance_text: dist_text, distance_value: dist_value})
            listingsWithDistance.push(newListing)
          }
          catch(err) {
            listingsWithDistance.push(l)
          }

        }).then(() => {
          listingsWithDistance.length === listings.length ? this.props.filterListings(listingsWithDistance, filters) : null
        })
    })

  }

  componentDidMount(){
    this.setState({loading: true})
  }



  render(){

    const listingCards = this.props.filteredListings.filtered ?
    this.props.filteredListings.listings.map(listing => <ListingCard key={listing.id} listing={listing}/>) :
    this.props.listings.map(listing => <ListingCard key={listing.id} listing={listing}/>)
    return(
      <div >
    {  // <MyFancyComponent/>
  }

      <img alt='' className="background" src={"https://static.pexels.com/photos/606540/pexels-photo-606540.jpeg"}></img>

        <div className="main-content">

          <div style={{'padding-right': '18.7%', 'padding-left': '18%'}}>

            <Segment>
            <ListingFilterBar showLoadingBar={this.showLoadingBar} hideLoadingBar={this.hideLoadingBar} addLocation={this.addDistanceToListings}/>
            </Segment>

            <br/>

            {this.state.loading && !this.state.filteredListings ? <Loader active inline='centered' size='large'>Loading</Loader> :
              <div>
                {listingCards.length ? null : <h3> Sorry, no listings matched your search</h3>}
                <div className="ui link cards">
                  {listingCards}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, listings: state.listings, filteredListings: state.filteredListings}
}

export default withAuth(connect(mapStateToProps, null)(ListingsSearchContainer))
