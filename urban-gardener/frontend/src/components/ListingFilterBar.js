import React from 'react'
import '../css/stylesheet.css'
import {connect} from 'react-redux'
import * as actions from '../actions';
import { Divider, Dropdown, Input, Button} from 'semantic-ui-react'

class ListingsFilterBar extends React.Component {

  constructor(){
    super()

    this.state = {
      location: '',
      distance_miles: '',
      compensation_type: '',
      garden_type: '',
      invalid_address: false
    }
  }

  componentDidMount(){
    if(this.props.listings.length){
      const retrievedFilters = localStorage.getItem('filters')
      if (retrievedFilters){
        const parsedFilters = JSON.parse(retrievedFilters)
        // console.log('remounting', parsedFilters)
        this.setState(parsedFilters, this.handleSubmit)
        this.setState({retrieved: true})
      }
    }
  }

  componentWillReceiveProps(){
    if(!this.state.retrieved && this.props.listings.length){
      const retrievedFilters = localStorage.getItem('filters')
      if (retrievedFilters){
        const parsedFilters = JSON.parse(retrievedFilters)
        this.setState(parsedFilters, this.handleSubmit)
      }
    }
  }


  validateLocation(location){
    const urlRoot = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    const origin = '59 Carlton Rd, 10952'.replace(' ', '+')
    const key = 'AIzaSyBISW6GubT1FZyI10G3-wifH_rm5eQZrdk'
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    return fetch(proxyUrl + `${urlRoot}origins=${origin}&destinations=${location}&key=${key}`)
      .then(res => res.json())
  }



  handleChange = (event, data) => {
    const field = data.name
    const value = data.value
    this.setState({[field]: value, invalid_address: false})
  }

  handleClear = () => {
    this.setState({
      location: '',
      distance_miles: '',
      compensation_type: '',
      garden_type: '',
      invalid_address: false
    })

    this.handleSubmit()
  }

  handleSubmit = () => {
    this.props.showLoadingBar()
    this.props.changeListingsFilter(this.state)
    let origin;
    if (this.state.location){
      this.validateLocation(this.state.location)
        .then(data => {
          if(data.destination_addresses[0] === ""){
            this.props.hideLoadingBar()
            this.setState({invalid_address: true, location: ''})
          }else{
            this.props.addLocation(this.props.listings, this.state.location, this.state)
          }
        })
    } else{
      console.log('listings being passed', this.props.listings)
      this.props.filterListings(this.props.listings, this.state)
    }
  }

  render(){
    return(
      <div>
        <h4>Filter Results</h4>
        <Divider></Divider>

          <Input value={this.state.location} onChange={this.handleChange} name="location" size="small" icon='search' iconPosition='left' className='search' placeholder="Search by Location" />

          <span>{' '}</span>

          {this.state.location ?
            <span className={this.state.distance_miles ?  "bring-to-front ui small black button"  : "bring-to-front ui small white button"} >

              {this.state.distance_miles ? <i className="filter icon"></i> : null}
              {this.state.distance_miles ? `Within ${this.state.distance_miles} Miles` : 'Distance'}
              <Dropdown>
                <Dropdown.Menu>
                  <Dropdown.Item name='distance_miles' value='.25' onClick={this.handleChange}>1/4 Mile</Dropdown.Item>
                  <Dropdown.Item name='distance_miles' value='.5'onClick={this.handleChange}>1/2 Mile</Dropdown.Item>
                  <Dropdown.Item name='distance_miles' value='1' onClick={this.handleChange}>1 Mile</Dropdown.Item>
                  <Dropdown.Item name='distance_miles' value='3' onClick={this.handleChange}>3 Mile</Dropdown.Item>
                  <Dropdown.Item name='distance_miles' value='5' onClick={this.handleChange}>5 Mile</Dropdown.Item>
                </Dropdown.Menu>

              </Dropdown>
            </span> : null}


            <span className={this.state.garden_type ?  "bring-to-front ui small black button"  : "bring-to-front ui small white button"} >

              {this.state.garden_type ? <i className="filter icon"></i> : null}
              {this.state.garden_type ? `${this.state.garden_type} Garden` : 'Garden Type'}
              <Dropdown onChange={this.handleChange}>
                <Dropdown.Menu>
                  <Dropdown.Menu scrolling>
                    <Dropdown.Item name='garden_type' value='Herb' onClick={this.handleChange}>Herb</Dropdown.Item>
                    <Dropdown.Item name='garden_type' value='Vegetable' onClick={this.handleChange}>Vegetable</Dropdown.Item>
                    <Dropdown.Item name='garden_type' value='Flower' onClick={this.handleChange}>Flower</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
          </span>

          <span className={this.state.compensation_type ?  "bring-to-front ui small black button"  : "bring-to-front ui small white button"} >

            {this.state.compensation_type ? <i className="filter icon"></i> : null}
            {this.state.compensation_type ? `${this.state.compensation_type} Compensation` : 'Compensation Type'}
            <Dropdown onChange={this.handleChange} >
              <Dropdown.Menu>
                <Dropdown.Menu  scrolling>
                  <Dropdown.Item name='compensation_type' value='Monetary' onClick={this.handleChange}>Monetary</Dropdown.Item>
                  <Dropdown.Item name='compensation_type' value='Percentage of Crops' onClick={this.handleChange}>Percentage of Crops</Dropdown.Item>
                  <Dropdown.Item name='compensation_type' value='Hybrid' onClick={this.handleChange}>Hybrid</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
        </span>

        {this.state.invalid_address ?<em style={{color: 'red'}}><br/>Please enter a valid location</em> : null}

        <br/>
        <br/>

        <Button className='bring-to-front' onClick={this.handleSubmit}>Apply Filters</Button>
        <Button className='bring-to-front' onClick={this.handleClear}>Clear Filters</Button>

        <Divider></Divider>
        <br/>

      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {listings: state.listings, user: state.user}
}

export default connect(mapStateToProps, actions)(ListingsFilterBar)
