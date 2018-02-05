import React from 'react'
import '../css/stylesheet.css'
import {connect} from 'react-redux'


const ListingCard = (props) => {

    return(
      <div class="card">
        <a class="image" href={'/listings/' + props.listing.id}>
          <img src={props.listing.img_url_1}></img>
        </a>

        <div class="content">

          <a class="header" href={'/listings/' + props.listing.id}> {props.listing.title}</a>

          <div class="description">
            {props.listing.description.slice(0, 100)}...
          </div>


          <br/>

          <div class="meta">
            <span> <i class="marker icon"></i> 3 Miles</span>
          </div>
        </div>


        <div class="extra content">
          <span >
            <i class="dollar icon"></i>
            {props.listing.dollar_compensation_amount}
          </span>

          <span class="right floated">
            {props.listing.percentage_compensation_amount}
            <i class="percent icon"></i>
             of Crops
          </span>
        </div>
    </div>
    )
}


export default ListingCard
