import React from 'react';
const keys = require('../../credentials.js');
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      const mapStyle = {
        position: 'absolute',
        left: '4px',
        right: '0px',
        bottom: '0px',
        top: '20px',
        width: '98%', 
        height: '131%',
        y: 'inherit',
        overflow: 'hidden'
      }

      return (
        <div className="lt
        lt-xs-x-1
        lt-xs-y-1
        lt-xs-w-1
        lt-xs-h-1
        lt-sm-x-0
        lt-sm-y-1
        lt-sm-w-2
        lt-sm-h-2
        lt-md-x-0
        lt-md-y-1
        lt-md-w-4
        lt-md-h-2
        lt-lg-x-0
        lt-lg-y-1
        lt-lg-w-4
        lt-lg-h-2">
          <div className="lt-body">
            <div>
              <form action=""></form>
              <Map
                style={mapStyle} 
                google={this.props.google} 
                zoom={8}
                initialCenter={this.props.coords}
                onClick={this.props.fetchTrends}
                onZoom_changed={this.props.onZoomChanged}
              >
              </Map>
            </div>
          </div>
        </div>
      );
    }
}
 
export default GoogleApiWrapper({
  apiKey: (keys.GOOGLE_API_map),
  libraries: ['places', 'geometry']
})(MapContainer)
