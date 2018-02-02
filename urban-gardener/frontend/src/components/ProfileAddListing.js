import React from 'react'
import {connect} from 'react-redux'
import { Form } from 'semantic-ui-react'
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
      dollar_compensation_amount: '',
      percentage_compensation_amount: '',
      description: '',
      avatar_file_name: '',
      avatar_content_type: '',
      avatar_file_size: ''
    }
  }

  componentDidMount(){
    this.setState({user_id: this.props.user.id})
  }

  handleChange = (event) => {

    const field = event.target.name
    const value = event.target.value
    console.log(field, value)
    this.setState({[field]: value})
  }


  onDrop = (picture) => {
        this.setState({
            avatar_file_name: picture[0].name,
            avatar_file_size: picture[0].size,
            avatar_content_type: picture[0].type,
        });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createListing(this.state, this.props.history)
    this.setState({
      user_id: '',
      title: '',
      street_address: '',
      zip: '',
      sunlight_amount: '',
      desired_garden_type: '',
      compensation_type: '',
      dollar_compensation_amount: '',
      percentage_compensation_amount: '',
      description: '',
      avatar_file_name: '',
      avatar_content_type: '',
      avatar_file_size: ''
    })
  }



  render(){
    return (

        <div className='ui segment'>
          <h4> Add a Listing </h4>

            <Form>
              <Form.Input required fluid value={this.state.title} name='title' label='Title' placeholder='Listing title' onChange={this.handleChange}/>
              <Form.Group>
                <Form.Input required value={this.state.street_address} name='street_address' label='Street Address' placeholder='Street Address' width={10} onChange={this.handleChange}/>
                <Form.Input required value={this.state.zip} name='zip' label='Zip Code' placeholder='Zip Code' width={6} onChange={this.handleChange}/>
              </Form.Group>
              {// <Form.Field>
              //   <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
              //   <input type="file" id="listing_pic" name="listing_pic" accept=".jpg, .jpeg, .png" onChange={this.handleChange}/>
              // </Form.Field>
            }

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


              <br/>
              <Form.Group widths={2}>
                <Form.Input required value={this.state.dollar_compensation_amount} name='dollar_compensation_amount' label='Dollar Compensation Amount' placeholder='$$$$' onChange={this.handleChange}/>
                <Form.Input required value={this.state.percentage_compensation_amount} name='percentage_compensation_amount' label='Percentage of Crops Compensation Amount' placeholder='%%%%' onChange={this.handleChange}/>
              </Form.Group>
              <Form.TextArea required value={this.state.description} name='description' label='Description' placeholder='Tell us more about your property...' onChange={this.handleChange}/>
                <Form.Field>
                  <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
                    <ImageUploader
                      withIcon={true}
                      buttonText='Choose image'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.png']}
                      maxFileSize={5242880}
                      buttonClassName='ui mini black button'
                      label=''
                      />
                </Form.Field>
              <Form.Button color='black' onClick={this.handleSubmit}>Submit</Form.Button>
            </Form>

        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps, actions)(ProfileAddListing)
