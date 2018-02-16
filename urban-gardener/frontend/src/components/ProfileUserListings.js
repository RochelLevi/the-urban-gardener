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
          <div className="item">
            <i className="large tag middle aligned icon"></i>
            <div className="content">
              <a href={`./listings/${l.id}`} className="bring-to-front header">{l.title}</a>
              <div className="description">{l.description}</div>
                <button className="bring-to-front ui mini black button" onClick={() => handleDelete(l.id)}><i className="trash icon"></i>Delete Listing</button>
            </div>
          </div>
        )
      })

    return (

      <div className='bring-to-front'>
          <div className="ui relaxed divided list">
            {listings.length ? listings : "You have no active listings."}
          </div>
      </div>


    )
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps, actions)(ProfileUserListings)
