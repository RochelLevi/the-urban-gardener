import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import {connect} from 'react-redux'
import { Accordion, Icon } from 'semantic-ui-react'

import ProfileUserInfo from './ProfileUserInfo'
import ProfileUserListings from './ProfileUserListings'
import ProfileAddListing from './ProfileAddListing'


class Profile extends React.Component{

  constructor(){
    super()

    this.state = {
      showAddListing: false,
      showActiveListings: false
    }
  }


  render(){
    return (
      <div>
        <img alt='' className="background" src={require("../css/images/background-image-3.jpg")}></img>
        <div className='main-content'>
          <div className="ui container">
            <h3> Welcome, {this.props.user.username}</h3>

            <ProfileUserInfo/>

            <Accordion fluid styled>
              <Accordion.Title active='true'  onClick={() => this.setState({showActiveListings: !this.state.showActiveListings})}>
                <h4> <Icon name='dropdown'/> Active Listings </h4>
              </Accordion.Title>
              <Accordion.Content active={this.state.showActiveListings}>
                <ProfileUserListings/>
              </Accordion.Content>
            </Accordion>

            <br/>

             <Accordion fluid styled>
               <Accordion.Title active='true'  onClick={() => this.setState({showAddListing: !this.state.showAddListing})}>
                 <h4> <Icon name='dropdown' />Add a Listing </h4>
               </Accordion.Title>
               <Accordion.Content active={this.state.showAddListing}>
                 <ProfileAddListing/>
               </Accordion.Content>
             </Accordion>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, listings: state.listings}
}

export default withAuth(connect(mapStateToProps, null)(Profile))
