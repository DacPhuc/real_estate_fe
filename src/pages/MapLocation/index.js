import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { connect } from 'dva';
import { Modal } from 'antd';

@connect(({ estate, loading }) => ({
  estate,
}))
class MapLocation extends Component {
  handleCloseMapView = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/closeMapView',
    });
  };

  render() {
    const { visible, geoLocation, closeMapview } = this.props;
    const { geometry } = geoLocation;
    return visible ? (
      <Modal visible={visible} style={{ height: '100vh' }} onCancel={this.handleCloseMapView}>
        <div>
          <Map
            google={this.props.google}
            style={{ width: '100%', height: '500px' }}
            initialCenter={{ lat: geometry.location.lat, lng: geometry.location.lng }}
            zoom={15}
          >
            <Marker position={{ lat: geometry.location.lat, lng: geometry.location.lng }} />
          </Map>
        </div>
      </Modal>
    ) : null;
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCCV-Z0WSK9z5bTLUTZ13s5YVz6I-b2_oE',
})(MapLocation);
