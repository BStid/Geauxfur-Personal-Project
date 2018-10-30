import React, { Component } from "react";
import { connect } from "react-redux";
import "./Map.css";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import {
  getDriverCoordinates,
  getDriverRoute
} from "../../redux/senderReducer";
import { AutoSizer } from "react-virtualized";
import mapMarker from "./pictures/green_pin.png";
import gps from "./pictures/gps.png";
import "mapbox-gl/dist/mapbox-gl.css";
require("dotenv").config();

class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        // width: 700,
        // height: 970,
        latitude: 32.927,
        longitude: -96.799,
        zoom: 13
      }
    };
    this.drawRoute = this.drawRoute.bind(this);
  }

  async drawRoute() {
    console.log("findingDriverCoord");
    await this.props.getDriverCoordinates();
    await this.props.getDriverRoute(
      this.state.viewport.longitude,
      this.state.viewport.latitude,
      this.props.driverCurrentLong,
      this.props.driverCurrentLat
    );
    console.log("got these directions...", this.props.routeCoordinates);
    console.log("drawing route...");
    await this.setState({ nothing: "" });
    const map = this.reactMap.getMap();
    map.on("render", () => {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: this.props.routeCoordinates
            }
          }
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#26a96c",
          "line-width": 4
        }
      });
    });
  }
  locateUser() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("Longitude should change to", position.coords.longitude);
      console.log("Latitude should change to", position.coords.latitude);
      let newObj = { ...this.state.viewport };
      newObj.longitude = position.coords.longitude;
      newObj.latitude = position.coords.latitude;
      newObj.zoom = 16;
      this.setState({
        viewport: newObj
      });
    });
  }
  componentDidMount() {
    this.locateUser();
  }
  render() {
    let latitude = this.state.viewport.latitude;
    let longitude = this.state.viewport.longitude;
    return (
      <div className="mapBox">
        <AutoSizer defaultHeight={500} defaultWidth={700}>
          {({ height, width }) => (
            <ReactMapGL
              ref={reactMap => {
                this.reactMap = reactMap;
              }}
              width={width}
              height={height}
              transitionDuration={1000}
              transitionInterpolator={new FlyToInterpolator()}
              mapStyle="mapbox://styles/bstid/cjnuq80xg3p3a2spao7krspfp"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              {...this.state.viewport}
              onViewportChange={viewport => this.setState({ viewport })}
            >
              <Marker
                latitude={latitude}
                longitude={longitude}
                captureScroll={true}
                dynamicPosition={true}
              />
              <Marker
                latitude={32.7776}
                longitude={-96.7954}
                offsetTop={-20}
                captureScroll={true}
                dynamicPosition={true}
              >
                <img src={mapMarker} className="mapMarker" alt="marker" />
              </Marker>
            </ReactMapGL>
          )}
        </AutoSizer>

        <img
          src={gps}
          alt=""
          className="gpsIcon"
          onClick={() => this.locateUser()}
        />
        <button className="findRouteButton" onClick={() => this.drawRoute()}>
          {" "}
          Find Route{" "}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { getDriverCoordinates, getDriverRoute }
)(Map);
