import React from 'react'
import {connect} from 'react-redux'


const ProfileUserInfo = (props) => {

    return (

        <div className='ui segment'>
          <h3> Profile Information</h3>
          <div className="ui list">
            <div className="item">
              <i className="users icon"></i>
              <div className="content">
                {props.user.username}
              </div>
            </div>
            <div className="item">
              <i className="marker icon"></i>
              <div className="content">
                {props.user.street_address + ', ' + props.user.zip}
              </div>
            </div>
            <div className="item">
              <i className="mail icon"></i>
              <div className="content">
                <a>{props.user.email}</a>
              </div>
            </div>
          </div>
        </div>
    )

}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps, null)(ProfileUserInfo)
