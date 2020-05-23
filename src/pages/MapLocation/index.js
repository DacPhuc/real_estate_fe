import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { connect } from 'dva';

@connect(({ estate, loading }) => ({
  estate,
  loadingGetData: loading.effects['estate/getEstate'],
}))
class MapLocation extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={{ width: '100%', height: '100vh' }}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      >
        <Marker position={{ lat: 48.0, lng: -122.0 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCCV-Z0WSK9z5bTLUTZ13s5YVz6I-b2_oE',
})(MapLocation);
