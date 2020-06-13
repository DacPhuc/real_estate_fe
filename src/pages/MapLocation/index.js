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
import { Modal } from 'antd';

@connect(({ estate }) => ({
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
      rs: true,
    };
  }
  DirectShow = (e, geometry) => {
    const { estate } = this.props;
    const { currentCoordinate } = estate;
    const lat = parseFloat(currentCoordinate.lat);
    const lng = parseFloat(currentCoordinate.lng);
    const directionsService = new google.maps.DirectionsService();
    const directionsRender = new google.maps.DirectionsRenderer();
    const destination = { lat: geometry.location.lat, lng: geometry.location.lng };
    const origin = { lat: lat, lng: lng, text: 'This is where you are stading' };

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
          console.log(response);
          let distanceobj = response.routes[0].legs[0].distance.value;
          console.log(distanceobj);
          if (distanceobj < 10000) {
            this.changeLightStatus(1);
          } else {
            this.changeLightStatus(0);
          }
          var display = new google.maps.DirectionsRenderer({ preserveViewport: true });
        } else {
          console.error(`error fetching directions`);
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

  changeLightStatus = status => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/changeLightStatus',
      payload: status,
    });
  };

  render() {
    const { closeMapview, estate } = this.props;
    const { popUpShowMap, geoLocation, currentCoordinate } = estate;
    const lat = parseFloat(currentCoordinate.lat);
    const lng = parseFloat(currentCoordinate.lng);
    const { geometry } = geoLocation;
    const { point } = this.state;
    const { list } = estate;
    const { currentId } = estate;
    const filter = list.filter(para => para.index == currentId)[0];
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap zoom={10} defaultCenter={{ lat: lat, lng: lng }}>
        <Marker
          visible={this.state.rs}
          position={{ lat: geometry.location.lat, lng: geometry.location.lng }}
          icon={{
            url: house,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          onClick={e => this.setPoint(e, geometry)}
        ></Marker>
        <Marker
          position={{ lat: lat, lng: lng }}
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
                {' '}
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
        width={800}
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        <GoogleMapExample
          containerElement={<div style={{ height: `800px`, width: '800px' }} />}
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
