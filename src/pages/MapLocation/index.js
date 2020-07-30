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
import car from '../../assets/car.png';
import { connect } from 'dva';
import { Modal } from 'antd';
import { Button, notification, Icon } from 'antd';
import { Carousel } from 'antd';
import style from './index.less';

@connect(({ estate }) => ({
  estate,
}))
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentLat: null,
      // currentLng: null,
      point: null,
      clicked: false,
      infor: props,
      direction: null,
      rs: true,
      time: null,
      distance: null,
      vehicle: null,
      path: [],
      moving: null,
    };
  }
  DirectShow = (e, geometry) => {
    const { estate } = this.props;
    const { currentCoordinate } = estate;
    // this.setState({
    //   currentLat: parseFloat(currentCoordinate.lat),
    //   currentLng: parseFloat(currentCoordinate.lng),
    // })
    const lat = parseFloat(currentCoordinate.lat);
    const lng = parseFloat(currentCoordinate.lng);
    const directionsService = new google.maps.DirectionsService();
    const directionsRender = new google.maps.DirectionsRenderer();
    const destination = { lat: geometry.location.lat, lng: geometry.location.lng };
    // const origin = { lat: this.state.currentLat, lng: this.state.currentLng, text: 'This is where you are stading' };
    const origin = { lat: lat, lng: lng, text: 'This is where you are stading' };
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(response);
          this.setState(
            {
              direction: response,
              time: response.routes[0].legs[0].duration.text,
              distance: response.routes[0].legs[0].distance.text,
              vehicle: response.request.travelMode,
              path: response.routes[0].legs[0].steps,
              // path: new DOMParser().parseFromString(response.routes[0].legs[0].steps, "text/xml");
            },
            () => {
              notification.open({
                message: "Trip's information",
                description: (
                  <div>
                    <p>
                      {this.state.vehicle} takes {this.state.time} to move {this.state.distance} to
                      the real-estate{' '}
                    </p>
                  </div>
                ),
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
              });
            }
          );
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

  onChange = current => {
    console.log('Direction');
    console.log(this.state.direction);
    // this.setState({
    //   moving: true,
    //   // currentLat: null,
    //   // currentLng: null,
    // })
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
    // let lat = parseFloat(this.state.currentLat);
    // let lng = parseFloat(this.state.currentLng);
    const lat = parseFloat(currentCoordinate.lat);
    const lng = parseFloat(currentCoordinate.lng);
    const { geometry } = geoLocation;
    const { point } = this.state;
    const { list } = estate;
    const { currentId } = estate;
    const filter = list && list.filter(para => para.index == currentId)[0];
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: lat, lng: lng }}>
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
        ></Marker>
        <Marker
          visible={this.state.moving}
          position={{ lat: this.state.currentLat, lng: this.state.currentLng }}
          icon={{
            url: house,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        ></Marker>

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
        className={style.main}
        footer={null}
      >
        <GoogleMapExample
          containerElement={<div style={{ height: `600px`, width: '800px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <Carousel afterChange={this.onChange}>
          {this.state.path.map(e => {
            let ele = new DOMParser().parseFromString(e.instructions, 'text/html');
            return (
              <div className={style.clousure}>
                {' '}
                <p>{ele.firstChild.textContent}.</p>{' '}
              </div>
            );
          })}
        </Carousel>
      </Modal>
    ) : null;
  }
}
const App = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCV-Z0WSK9z5bTLUTZ13s5YVz6I-b2_oE&language=vi&region=VN"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};
export default App;
