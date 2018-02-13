import React from 'react'
import {connect} from 'react-redux'


const ProfileUserInfo = (props) => {

    return (

        <div className='ui segment'>
          <h3> Profile Information</h3>
          <div class="ui list">
            <div class="item">
              <i class="users icon"></i>
              <div class="content">
                {props.user.username}
              </div>
            </div>
            <div class="item">
              <i class="marker icon"></i>
              <div class="content">
                {props.user.street_address + ', ' + props.user.zip}
              </div>
            </div>
            <div class="item">
              <i class="mail icon"></i>
              <div class="content">
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
