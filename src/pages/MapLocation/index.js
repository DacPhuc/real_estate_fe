/*global google*/
import React, { Component } from 'react';
import {
  withGoogleMap,
  withjs,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  InfoWindow,
  Marker,
} from 'react-google-maps';
import human from '../../assets/human.svg';
import house from '../../assets/house.png';
import { connect } from 'dva';
import { Modal, Tooltip } from 'antd';

@connect(({ estate, loading }) => ({
  estate,
}))
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: null,
      clicked: false,
      infor: props,
      direction: null,
    };
  }
  DirectShow = (e, geometry) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRender = new google.maps.DirectionsRenderer();
    const destination = { lat: geometry.location.lat, lng: geometry.location.lng };
    const origin = { lat: 10.823099, lng: 106.629662, text: 'This is where you are stading' };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            direction: response,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };
  setPoint = (e, geometry) => {
    this.setState({
      point: geometry,
      clicked: true,
    });
  };

  handleCloseMapView = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/closeMapView',
    });
  };

  render() {
    const { closeMapview, estate } = this.props;
    const { popUpShowMap, geoLocation } = estate;
    const { geometry } = geoLocation;
    const { point } = this.state;
    const { list } = estate;
    const { currentId } = estate;
    const filter = list.filter(para => para.index == currentId)[0];
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap zoom={15} defaultCenter={{ lat: 10.823099, lng: 106.629662 }}>
        <Marker
          visible={true}
          position={{ lat: geometry.location.lat, lng: geometry.location.lng }}
          icon={{
            url: house,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          onClick={e => this.setPoint(e, geometry)}
        />
        <Marker
          position={{ lat: 10.823099, lng: 106.629662 }}
          icon={{
            url: human,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
          onClick={e => this.DirectShow(e, geometry)}
        />
        {this.state.clicked && (
          <InfoWindow
            position={{
              lat: geometry.location.lat,
              lng: geometry.location.lng,
            }}
          >
            <div>
              <h2> {filter.title} </h2>
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
        )}
        <DirectionsRenderer
          directions={this.state.direction}
          options={{
            polylineOptions: {
              stokeColor: '#FF0000',
              strokeOpacity: 0.5,
              strokeWeight: 4,
            },
            suppressMarkers: true,
          }}
        />
      </GoogleMap>
    ));
    return popUpShowMap ? (
      <Modal
        visible={popUpShowMap}
        style={{ top: 20 }}
        onCancel={this.handleCloseMapView}
        width={500}
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: '500px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Modal>
    ) : null;
  }
}
const App = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCV-Z0WSK9z5bTLUTZ13s5YVz6I-b2_oE"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};
export default App;
