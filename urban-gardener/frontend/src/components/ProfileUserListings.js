import * as actions from '../actions';
import React from 'react'
import {connect} from 'react-redux'

const ProfileUserListings = (props) => {

  function handleDelete(id){
    props.deleteListing(id)
  }

  const listings =
      props.user.listings.map(l => {
        return(
          <div class="item">
            <i class="large tag middle aligned icon"></i>
            <div class="content">
              <a class="header">{l.title}</a>
              <div class="description">{l.description}</div>
                <button class="ui mini black button" onClick={() => handleDelete(l.id)}><i class="trash icon"></i>Delete Listing</button>
            </div>
          </div>
        )
      })

    return (

      <div className='ui segment'>
        <h4> Active Listings </h4>
          <div class="ui relaxed divided list">
            {listings.length ? listings : "You have no active listings."}
          </div>
      </div>


    )
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps, actions)(ProfileUserListings)
