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
import { connect } from 'dva';
import { Modal } from 'antd';

// var icons = {
//   const start= new google.maps.makeMarker(
//    // URL
//    'start.png',
//    // (width,height)
//    new google.maps.Size( 44, 32 ),
//    // The origin point (x,y)
//    new google.maps.Point( 0, 0 ),
//    // The anchor point (x,y)
//    new google.maps.Point( 22, 32 )
//   ),
//   end: new google.maps.MarkerImage(
//    // URL
//    'end.png',
//    // (width,height)
//    new google.maps.Size( 44, 32 ),
//    // The origin point (x,y)
//    new google.maps.Point( 0, 0 ),
//    // The anchor point (x,y)
//    new google.maps.Point( 22, 32 )
//   )
//  };

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
    const origin = { lat: geometry.location.lat, lng: geometry.location.lng };
    const destination = { lat: 10.823099, lng: 106.629662 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        // preserveViewport: true
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
          // var leg = directions.routes[0].legs[0];
          // makeMarker( leg.start_location, icons.start, "title" );
          // console.log(result)
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
    // const [selectedPark, setSelectedPark] = useState(null);
    const { closeMapview, estate } = this.props;
    const { popUpShowMap, geoLocation } = estate;
    const { geometry } = geoLocation;
    const { point } = this.state;
    const { list } = estate;
    const { currentId } = estate;
    const filter = list.filter(para => para.index == currentId)[0];
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap zoom={7} defaultCenter={{ lat: 10.823099, lng: 106.629662 }}>
        <Marker
          position={{ lat: geometry.location.lat, lng: geometry.location.lng }}
          onClick={e => this.setPoint(e, geometry)}
        ></Marker>
        <Marker
          position={{ lat: 10.823099, lng: 106.629662 }}
          icon={{
            disableDefaultUI: true,
            url: human,
            anchor: new google.maps.Point(5, 58),
            scaledSize: new window.google.maps.Size(25, 25),
          }}
          onClick={e => this.DirectShow(e, geometry)}
        ></Marker>

        {this.state.clicked && (
          <InfoWindow
            onClick={e => this.setPoint(e, geometry)}
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
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));
    return { popUpShowMap } ? (
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
  console.log(MapLoader);
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCV-Z0WSK9z5bTLUTZ13s5YVz6I-b2_oE"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};
export default App;
