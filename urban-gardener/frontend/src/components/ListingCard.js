import React from 'react'
import '../css/stylesheet.css'
import {connect} from 'react-redux'


class ListingCard extends React.Component{

  constructor(){
    super()

    this.state = {
      distance_text: '',
      distance_value: ''
    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <div class="card">
        <a class="image" href={'/listings/' + this.props.listing.id}>
          <img src={this.props.listing.img_url_1 ? this.props.listing.img_url_1 : this.props.listing.avatar}></img>
        </a>

        <div class="content">

          <a class="header" href={'/listings/' + this.props.listing.id}> {this.props.listing.title}</a>

          <div class="description">
            {this.props.listing.description.slice(0, 100)}...
          </div>


          <br/>

          <div class="meta">
            <span> <i class="marker icon"></i> {this.props.listing.distance_text ? this.props.listing.distance_text : `${this.props.listing.street_address}, ${this.props.listing.zip}`} </span>
          </div>
        </div>


        <div class="extra content">
          <span >
            <i class="dollar icon"></i>
            {this.props.listing.dollar_compensation_amount}
          </span>

          <span class="right floated">
            {this.props.listing.percentage_compensation_amount}
            <i class="percent icon"></i>
             of Crops
          </span>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {user: state.user, filters: state.listingsFilters}
}

export default connect(mapStateToProps, null)(ListingCard)
