import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';

const ListingShow = () => {
  return(

    <div className="main-content">
      Listing Show
    </div>
  )
}

export default withAuth(ListingShow)
