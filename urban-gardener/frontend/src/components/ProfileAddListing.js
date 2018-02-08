import React from 'react'
import {connect} from 'react-redux'
import { Form, Message } from 'semantic-ui-react'
import * as actions from '../actions';
import ImageUploader from 'react-images-upload'



class ProfileAddListing extends React.Component{

  constructor(){
    super()

    this.state = {
      user_id: '',
      title: '',
      street_address: '',
      zip: '',
      sunlight_amount: '',
      desired_garden_type: '',
      compensation_type: '',
      dollar_compensation_amount: 0,
      percentage_compensation_amount: 0,
      description: '',
      avatar_file_name: '',
      avatar: '',
      img_url_1: '',

      show_message: false
    }
  }

  componentDidMount(){
    this.setState({user_id: this.props.user.id, avatar_updated_at: Date.now()})
  }

  handleChange = (event) => {
    const field = event.target.name
    const value = event.target.value
    this.setState({[field]: value, show_message: false})
    this.props.listingError.isError ? this.props.clearOutListingErrors() : null

  }


  // onDrop = (e) => {
  //  var file = this.refs.file.files[0];
  //  var reader = new FileReader();
  //  var url = reader.readAsDataURL(file);
  //  const file_name = e.target.files[0].name
  //  reader.onloadend = (e) => {
  //    this.setState({
  //       avatar_file_name: file_name,
  //        avatar: reader.result,
  //        img_url_1: reader.result
  //    })
  //  }
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createListing(this.state, this.props.history)
    this.setState({
      title: '',
      street_address: '',
      zip: '',
      sunlight_amount: '',
      desired_garden_type: '',
      compensation_type: '',
      dollar_compensation_amount: 0,
      percentage_compensation_amount: 0,
      description: '',
      avatar_file_name: '',
      avatar_content_type: '',
      avatar_file_size: '',
      avatar: '',
      img_url_1: '',
      show_message: true
    })
  }

  render(){
  
    return (

        <div className='ui segment'>
          <h4> Add a Listing </h4>
            <Form error success>
              <Form.Input required fluid value={this.state.title} name='title' label='Title' placeholder='Listing title' onChange={this.handleChange}/>
              <Form.Group >
                <Form.Input required value={this.state.street_address} name='street_address' label='Street Address' placeholder='Street Address' width={10} onChange={this.handleChange}/>
                <Form.Input required value={this.state.zip} name='zip' label='Zip Code' placeholder='Zip Code' maxlength="5" width={6} onChange={this.handleChange}/>
              </Form.Group>

              <br/>

              <div class="inline fields">
                <label>Desired Garden Type</label>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='desired_garden_type' value='Vegetable'
                      checked={this.state.desired_garden_type === 'Vegetable'} onChange={this.handleChange}/>
                    <label>Vegetable</label>
                  </div>
                </div>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='desired_garden_type' value='Herb'
                      checked={this.state.desired_garden_type === 'Herb'} onChange={this.handleChange}/>
                    <label>Herb</label>
                  </div>
                </div>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='desired_garden_type' value="Flower"
                    checked={this.state.desired_garden_type === 'Flower'} onChange={this.handleChange}/>
                  <label>Flower</label>
                  </div>
                </div>

              </div>


              <div class="inline fields">
                <label>Daily Hours of Direct Sunlight</label>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='sunlight_amount' value='2-4'
                      checked={this.state.sunlight_amount === '2-4'} onChange={this.handleChange}/>
                    <label>2-4</label>
                  </div>
                </div>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='sunlight_amount' value='4-6'
                      checked={this.state.sunlight_amount === '4-6'} onChange={this.handleChange}/>
                    <label>4-6</label>
                  </div>
                </div>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio"name='sunlight_amount' value="6-8"
                    checked={this.state.sunlight_amount === '6-8'} onChange={this.handleChange}/>
                    <label>  6-8</label>
                  </div>
                </div>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='sunlight_amount' value="8-10"
                    checked={this.state.sunlight_amount === '8-10'} onChange={this.handleChange}/>
                    <label>  8-10</label>
                  </div>
                </div>

              </div>


              <div class="inline fields">
                <label>Compensation Type</label>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='compensation_type' value='Monetary'
                      checked={this.state.compensation_type === 'Monetary'} onChange={this.handleChange}/>
                    <label>Monetary</label>
                  </div>
                </div>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='compensation_type' value='Percentage of Crops'
                      checked={this.state.compensation_type === 'Percentage of Crops'} onChange={this.handleChange}/>
                    <label>Percentage of Crops</label>
                  </div>
                </div>

                <div class="field">
                  <div class="ui radio checkbox">
                    <input type="radio" name='compensation_type' value="Hybrid"
                    checked={this.state.compensation_type === 'Hybrid'} onChange={this.handleChange}/>
                  <label>Hybrid</label>
                  </div>
                </div>

            </div>


              <Form.Group widths={2}>
                {this.state.compensation_type === 'Monetary' || this.state.compensation_type === 'Hybrid' ? <Form.Input required value={this.state.dollar_compensation_amount} name='dollar_compensation_amount' label='Dollar Compensation Amount' placeholder='$$$$' onChange={this.handleChange}/> : null}
                {this.state.compensation_type === 'Percentage of Crops' || this.state.compensation_type === 'Hybrid' ?<Form.Input required value={this.state.percentage_compensation_amount} name='percentage_compensation_amount' label='Percentage of Crops Compensation Amount' placeholder='%%%%' onChange={this.handleChange}/> : null}
              </Form.Group>
              <Form.TextArea required value={this.state.description} name='description' label='Description' placeholder='Tell us more about your property...' onChange={this.handleChange}/>

              <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
              <input ref='file' type='file' onChange={this.onDrop}/>

              <br/>
              <br/>

              <label for="image_uploads">Or add a URL</label>
              <input type='text' name='img_url_1' value={this.state.img_url_1} onChange={this.handleChange}/>

              <br/>
              <br/>

                {this.state.show_message && !this.props.listingError.errors.length && (this.props.listingError.isError !== 'not set')? <Message
                  success
                  header='Form Completed'
                  content="Your Listing has Been Added and Should Appear on Our Site Momentarily"
                /> :
                null
                }

                {this.state.show_message && this.props.listingError.isError && (this.props.listingError.isError !== 'not set')?  <Message
                  error
                  header='Please Fix the Following Error(s) and Try Again'
                  content={this.props.listingError.errors.map(e => <li>{e}</li>)}
                /> :
                null
              }

              <Form.Button color='black' onClick={this.handleSubmit}>Submit</Form.Button>
            </Form>

        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, listingError: state.listingError}
}

export default connect(mapStateToProps, actions)(ProfileAddListing)
