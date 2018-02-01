import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';


const MailBoxContainer = () => {
  return(

    <div className="main-content">
      MailBoxContainer
    </div>
  )
}

export default withAuth(MailBoxContainer)
