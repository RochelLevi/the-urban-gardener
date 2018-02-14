import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {connect} from 'react-redux'

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBISW6GubT1FZyI10G3-wifH_rm5eQZrdk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='bring-to-front' style={{ height: `92%`, width: '20%', float: 'right', 'top': '8%', 'right': '0px', position: 'fixed'}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>{

'https://maps.googleapis.com/maps/api/geocode/xml?address=${this.props.user.street_address}, ${this.props.user.zip}&key=AIzaSyBISW6GubT1FZyI10G3-wifH_rm5eQZrdk'

  `${this.props.user.street_address}, ${this.props.user.zip}`
  return (<GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>)
}
)

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    console.log('props', this.props)
    return (
      <Map
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, listings: state.listings, filteredListings: state.filteredListings}
}

export default connect(mapStateToProps, null)(MyFancyComponent)
