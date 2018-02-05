import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import { Form } from 'semantic-ui-react'

class ListingShow extends React.Component {

  constructor(){
    super()

    this.state = {
      currListing: {}
    }
  }

  getListingId(){
    const arr = this.props.history.location.pathname.split('/')
    return arr[arr.length - 1]
  }

  componentDidMount(){
    console.log(this.props.listings)
    const listingId = this.getListingId()
    const currListing = this.props.listings.filter(l => l.id === parseInt(listingId))[0]
    this.setState({currListing})
  }

  render(){
    console.log(this.state)
    return(

      <div class="ui container">

          <h1>{this.state.currListing.title} </h1>

        <br/>

        <div class="ui horizontal segments">
          <div class="ui segment">
              <img src={this.state.currListing.img_url_1} height='100%' width="100%"></img>
          </div>
          <div class="ui segment">
            <img src={this.state.currListing.img_url_2} height='100%' width="100%"></img>
          </div>
        </div>

        <br/>
        <div class="ui horizontal segments">

          <div className='ui compact segment'>
            <h4>Description</h4>
            <p>{this.state.currListing.description}</p>
          </div>

            <div className='ui compact segment'>
              <h4> More Information</h4>
              <div class="ui list">
                <div class="item">
                  <i class="marker icon"></i>
                  <div class="content">
                    Location: {this.state.currListing.street_address}, {this.state.currListing.zip}
                  </div>
                </div>
                <div class="item">
                  <i class="dollar icon"></i>
                  <div class="content">
                    Desired Compensation: ${this.state.currListing.dollar_compensation_amount}
                  </div>
                </div>
                <div class="item">
                  <i class="percent icon"></i>
                  <div class="content">
                     Desired Compensation: {this.state.currListing.percentage_compensation_amount}% of Crops
                  </div>
                </div>
                <div class="item">
                  <i class="sun icon"></i>
                  <div class="content">
                    {this.state.currListing.sunlight_amount} daily hours of direct sun exposure
                  </div>
                </div>
                <div class="item">
                  <i class="leaf icon"></i>
                  <div class="content">
                    Desired Garden Type: {this.state.currListing.desired_garden_type}
                  </div>
                </div>
              </div>
            </div>


          </div>

          <div className='ui segment'>
            <h4>Message Seller</h4>
            <Form>
              <Form.Input label='Subject' type='text' />
              <Form.TextArea label='Message' placeholder='Please enter your message' />
              <Form.Button>Submit</Form.Button>
            </Form>
          </div>

      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {listings: state.listings}
}

export default withRouter(withAuth(connect(mapStateToProps, null)(ListingShow)))
