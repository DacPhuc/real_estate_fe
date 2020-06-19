import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    console.log('Halo');
    state = {
      hello: true,
    };
  }
  render() {
    console.log(this.props);
    const MyMapComponent = compose(
      withProps({
        googleMapURL:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCV-Z0WSK9z5bTLUTZ13s5YVz6I-b2_oE&language=en&region=US',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {this.state.hello && (
          <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={() => props.onMarkerClick()} />
        )}
      </GoogleMap>
    ));
    return MyMapComponent;
  }
}
export default Map;
