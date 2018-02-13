import React from 'react'
import '../css/stylesheet.css'
import withAuth from '../hocs/withAuth';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import { Form, Image, Message, Grid } from 'semantic-ui-react'

class ListingShow extends React.Component {

  constructor(){
    super()

    this.state = {
      currListing: {},
      message: '',
      show_message: false
    }
  }

  handleChange = (e) => {
    this.setState({message: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createMessage({body: this.state.message, user_id: this.props.user.id, sender_id: this.props.user.id, recipient_id: this.state.currListing.user_id})
    this.setState({message: '', show_message: true})
  }

  getListingId(){
    const arr = this.props.history.location.pathname.split('/')
    return arr[arr.length - 1]
  }


  componentWillReceiveProps(nextProps){
    if (!this.props.listings.length && nextProps.listings.length) {
      const listingId = this.getListingId()
      const currListing = nextProps.listings.filter(l => l.id === parseInt(listingId))[0]
      this.setState({currListing})
    }
  }

  render(){
    return(

      <div class="ui container">

        <h1>{this.state.currListing.title} </h1>

        <br/>

        <div class="ui horizontal segments">
          <div class="ui segment">
            <Image src={this.state.currListing.img_url_1 ? this.state.currListing.img_url_1 : this.state.currListing.avatar} size='large'/>
          </div>
          <div class="ui segment">
            <Image src={this.state.currListing.img_url_2 ? this.state.currListing.img_url_2 : this.state.currListing.avatar_2} size='large'/>
          </div>
        </div>

        <br/>

        <Grid columns='equal' divided='true' >
        <Grid.Row stretched>
          <Grid.Column  >
              <h4>Description</h4>
              <p>{this.state.currListing.description}</p>
          </Grid.Column>

          <Grid.Column>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>

          <div className='ui segment'>
            <h4>Message Seller</h4>
            <Form error success>
              <Form.TextArea required label='Body' value={this.state.message} onChange={this.handleChange} placeholder='Please enter your message' />

                {this.state.show_message && !this.props.messageError.isError ? <Message
                  success
                  header='Success!'
                  content="Your Message Has Been Sent"
                /> :
                null
                }

                {this.state.show_message && this.props.messageError.isError ?  <Message
                  error
                  header='Please Fix the Following Error(s) and Try Again'
                  content={this.props.messageError.errors.map(e => <li>{e}</li>)}
                /> :
                null
              }

              <Form.Button color='black' onClick={this.handleSubmit}>Send</Form.Button>
            </Form>
          </div>

      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {listings: state.listings, user: state.user, messageError: state.messageError}
}

export default withRouter(withAuth(connect(mapStateToProps, null)(ListingShow)))
