import React from 'react'
import scriptLoader from 'react-async-script-loader'

const API_KEY = 'AIzaSyDIAWyPczV2h0nIV_FtrDUXcFhtao3QyVM'
const URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`

class Maps extends React.Component {
  loaded = false
  initMap(location) {
    this.map = new window.google.maps.Map(this.mapLayout,
      {
        center: location,
        zoom: 16.86
      })
  }

  addMarker(location, title) {
    new window.google.maps.Marker({
      position: location,
      map: this.map,
      title: title
    })
  }

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(nextProps.location) !== JSON.stringify(this.props.location)) && this.loaded) {
      this.initMap(nextProps.location)
    }
    if (nextProps.isScriptLoadSucceed && !this.loaded) {
      this.loaded = true
      this.initMap(nextProps.location)
      this.addMarker(nextProps.location, nextProps.title)
    }
  }

  render() {
    return (
      <div
        className="map-layout"
        ref={(map) => this.mapLayout = map}
      />
    )
  }
}

export default scriptLoader(URL)(Maps)

