import React from 'react'
import '../css/stylesheet.css'
import {connect} from 'react-redux'
import { Card, Image, Icon } from 'semantic-ui-react'


class ListingCard extends React.Component{

  constructor(){
    super()

    this.state = {
      distance_text: '',
      distance_value: ''
    }
  }

  componentDidMount(){

  }


  // <Card>
  //   <Image alt='loading' src={this.props.listing.img_url_1 ? this.props.listing.img_url_1 : this.props.listing.avatar} />
  //   <Card.Content>
  //     <Card.Header>  <a href={'/listings/' + this.props.listing.id}> {this.props.listing.title}</a></Card.Header>
  //     <Card.Description>{this.props.listing.description.slice(0, 100)}...</Card.Description>
  //     <br/>
  //     <Card.Meta><Icon name='marker' />{this.props.listing.distance_text ? this.props.listing.distance_text : `${this.props.listing.street_address}, ${this.props.listing.zip}`} </Card.Meta>
  //   </Card.Content>
  //   <Card.Content extra>
  //     <a>
  //       <Icon name='dollar' />
  //       {this.props.listing.dollar_compensation_amount}
  //     </a>
  //   </Card.Content>
  // </Card>



  render(){
    return(
      <div className="card">
        <a className="image" href={'/listings/' + this.props.listing.id}>
          <img alt='loading' src={this.props.listing.img_url_1 ? this.props.listing.img_url_1 : this.props.listing.avatar}></img>
        </a>

        <div className="content">

          <a className="header" href={'/listings/' + this.props.listing.id}> {this.props.listing.title}</a>

          <div className="description">
            {this.props.listing.description.slice(0, 100)}...
          </div>


          <br/>

          <div className="meta">
            <span> <i className="marker icon"></i> {this.props.listing.distance_text ? this.props.listing.distance_text : `${this.props.listing.street_address}, ${this.props.listing.zip}`} </span>
          </div>
        </div>


        <div className="extra content">
          <span >
            <i className="dollar icon"></i>
            {this.props.listing.dollar_compensation_amount}
          </span>

          <span className="right floated">
            {this.props.listing.percentage_compensation_amount}
            <i className="percent icon"></i>
             of Crops
          </span>
        </div>
      </div>
    )

  }

}

const mapStateToProps = (state) => {
  return {user: state.user, filters: state.listingsFilters}
}

export default connect(mapStateToProps, null)(ListingCard)
