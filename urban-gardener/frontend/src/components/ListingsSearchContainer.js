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

  render(){
    const listingCards = this.props.listings.map(listing => <ListingCard listing={listing}/>)
    return(
      <div class="ui container">


        <span class="ui small black button" onClick={() => {this.setState({showFilterBar: !this.state.showFilterBar})}}>
          <i class="filter icon"></i>
          Filter Listings
        </span>

        <br/>
        <br/>

        {this.state.showFilterBar ? <ListingFilterBar/> : null }

        <br/>

        <div class="ui link cards">
          {listingCards}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, listings: state.listings}
}

export default withAuth(connect(mapStateToProps, null)(ListingsSearchContainer))
