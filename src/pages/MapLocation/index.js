import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { connect } from 'dva';
import { Modal } from 'antd';

@connect(({ estate, loading }) => ({
  estate,
}))
class MapLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: null,
      infor: props,
    };
  }

  handleCloseMapView = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/closeMapView',
    });
  };
  setPoint = (e, geometry) => {
    this.setState({
      point: geometry,
    });
  };
  render() {
    const { visible, geoLocation, closeMapview, estate } = this.props;
    const { geometry } = geoLocation;
    const { point } = this.state;
    const { list } = estate;
    const { currentId } = estate;
    console.log(estate);
    const filter = list.filter(para => para.index == currentId)[0];
    return visible ? (
      <Modal
        visible={visible}
        style={{ top: 20 }}
        onCancel={this.handleCloseMapView}
        width={500}
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        <Map
          google={this.props.google}
          style={{ width: '500px', height: '500px' }}
          initialCenter={{ lat: geometry.location.lat, lng: geometry.location.lng }}
          zoom={15}
        >
          <Marker
            position={{ lat: geometry.location.lat, lng: geometry.location.lng }}
            onClick={e => this.setPoint(e, geometry)}
          />
          <InfoWindow
            onClose={this.onInfoWindowClose}
            visible={true}
            position={{
              lat: geometry.location.lat,
              lng: geometry.location.lng,
            }}
          >
            <div>
              <h2>{filter.title}</h2>
              <p>
                Address: {filter.addr_ward} {filter.addr_street} {filter.addr_city}{' '}
                {filter.addr_district}
              </p>
              <p>House: {filter.interior_floor}</p>
              <p>Rooms: {filter.interior_room}</p>
              <a target="_blank" href={filter.url} rel="noopener noreferer">
                More Info
              </a>
            </div>
          </InfoWindow>
        </Map>
      </Modal>
    ) : null;
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCCV-Z0WSK9z5bTLUTZ13s5YVz6I-b2_oE',
})(MapLocation);
