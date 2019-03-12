import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import './map.css'

// Known issue - See: https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 40],
  iconAnchor: [20, 40],
})

class Location extends React.Component {
  render() {
    const { latitude, longitude, name, city, zip, ownership_type } = this.props

    return (
      <Marker position={[latitude, longitude]}>
        <Popup minWidth={200} closeButton={false}>
          <div>
            <b>{`${name}, ${city} ${zip}`}</b>
            <p>{ownership_type}</p>
          </div>
        </Popup>
      </Marker>
    )
  }
}

class Starbucks extends React.Component {
  render() {
    const location = this.props.locations

    return (
      <Map
        animate
        attributionControl
        center={[45.3601, -75.0589]}
        doubleClickZoom
        dragging
        easeLinearity={0.35}
        id="map"
        maxZoom={20}
        minZoom={5}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
        zoom={6}
        zoomControl={false}
      >
        <TileLayer
          url="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
        />

        <ZoomControl position="topright" />

        <MarkerClusterGroup>
          {this.props.locations.map((location, i) => (
            <Location key={i} {...location} />
          ))}
        </MarkerClusterGroup>
      </Map>
    )
  }
}

export default Starbucks
