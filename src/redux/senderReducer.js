import axios from "axios";
require("dotenv").config();

//Actiontypes
const GET_DRIVER_ROUTE = "GET_DRIVER_ROUTE";
const GET_DRIVER_DESTINATION = "GET_DRIVER_DESTINATION";
const GET_DRIVER_COORDINATES = "GET_DRIVER_COORDINATES";
const GET_DRIVER_NAME = "GET_DRIVER_NAME";
const GET_DRIVER_PICTURE = "GET_DRIVER_PICTURE";
const GET_ADDRESS_LATLONG = "GET_ADDRESS_LATLONG";
const UPDATE_ADDRESS_INPUT = "UPDATE_ADDRESS_INPUT";
const UPDATE_CARDS_CLASS = "UPDATE_CARDS_CLASS";

//InitialState
const initialState = {
  routeCoordinates: [],
  senderCurrentLong: 0,
  senderCurrentLat: 0,
  driverDestinationLong: 0,
  driverDestinationLat: 0,
  driverCurrentLong: 0,
  driverCurrentLat: 0,
  driverName: "",
  driverPicture: "",
  searchAddressInput: "",
  addressLat: 0,
  addressLong: 0,
  cardsClass: "cardsContainer",
  isLoading: false
};

//Action Creators

//Get Route Driver is Taking to Reach Sender
export function getDriverRoute(
  senderCurrentLong,
  senderCurrentLat,
  driverCurrentLong,
  driverCurrentLat
) {
  return {
    type: GET_DRIVER_ROUTE,
    payload: axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${senderCurrentLong}%2C${senderCurrentLat}%3B${driverCurrentLong}%2C${driverCurrentLat}.json?access_token=${
        process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }&geometries=geojson`
    )
  };
}
//Input Handler for Address Input
export function updateAddressInput(input) {
  console.log(input);
  return {
    type: UPDATE_ADDRESS_INPUT,
    payload: input
  };
}

//Update Cards Class
export function updateCardsClass(input) {
  return {
    type: UPDATE_CARDS_CLASS,
    payload: input
  };
}
//GET Address Lat and Long
export function getAddressLatLong(query) {
  return {
    type: GET_ADDRESS_LATLONG,
    payload: axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${
        process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }`
    )
  };
}
//GET Driver's Name
export function getDriverName(driverId) {
  return {
    type: GET_DRIVER_NAME,
    payload: axios.get(`/api/name/${driverId}`)
  };
}

//GET Driver's Picture
export function getDriverPicture(driverId) {
  return {
    type: GET_DRIVER_PICTURE,
    payload: axios.get(`/api/picture/${driverId}`)
  };
}
//Get Route Driver is Taking to Deliver Item at the Destination
//TODO: ADD THE OTHER THREE DIRECTION FUNCTIONS (one for sender, two for driver)
export function getDriverDestination(
  senderCurrentLong,
  senderCurrentLat,
  driverDestinationLong,
  driverDestinationLat
) {
  return {
    type: GET_DRIVER_DESTINATION,
    payload: axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${senderCurrentLong},${senderCurrentLat};${driverDestinationLong},${driverDestinationLat}.json?access_token=${
        process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      }&geometries=geojson`
    )
  };
}

//Get Driver's Current Long/Lat
export function getDriverCoordinates() {
  return {
    type: GET_DRIVER_COORDINATES,
    payload: axios.get("/api/userlocation")
  };
}

//Reducer
export default function senderReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CARDS_CLASS:
      return {
        ...state,
        cardsClass: action.payload
      };
    case UPDATE_ADDRESS_INPUT:
      return {
        ...state,
        searchAddressInput: action.payload
      };
    case `${GET_DRIVER_ROUTE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_DRIVER_ROUTE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        routeCoordinates: action.payload.data.routes[0].geometry.coordinates
      };
    case `${GET_DRIVER_ROUTE}_REJECTED`:
      return {
        ...state,
        isLoading: false
      };
    case `${GET_DRIVER_DESTINATION}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_DRIVER_DESTINATION}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        routeCoordinates: action.payload.data
      };
    case `${GET_DRIVER_DESTINATION}_REJECTED`:
      return {
        ...state,
        isLoading: false
      };
    case `${GET_DRIVER_COORDINATES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_DRIVER_COORDINATES}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        driverCurrentLat: action.payload.data[0].current_latitude,
        driverCurrentLong: action.payload.data[0].current_longitude
      };
    case `${GET_DRIVER_COORDINATES}_REJECTED`:
      return {
        ...state,
        isLoading: false
      };
    case `${GET_DRIVER_NAME}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_DRIVER_NAME}_FULFILLED`:
      console.log(action.payload.data[0].first_name);
      return {
        ...state,
        isLoading: false,
        driverName: action.payload.data[0].first_name
      };
    case `${GET_DRIVER_NAME}_REJECTED`:
      return {
        ...state,
        isLoading: false
      };
    case `${GET_DRIVER_PICTURE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_DRIVER_PICTURE}_FULFILLED`:
      console.log(action.payload.data[0].image_url);
      return {
        ...state,
        isLoading: false,
        driverPicture: action.payload.data[0].image_url
      };
    case `${GET_DRIVER_PICTURE}_REJECTED`:
      return {
        ...state,
        isLoading: false
      };
    case `${GET_ADDRESS_LATLONG}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_ADDRESS_LATLONG}_FULFILLED`:
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        addressLat: action.payload.data.features[0].geometry.coordinates[1],
        addressLong: action.payload.data.features[0].geometry.coordinates[0]
      };
    case `${GET_ADDRESS_LATLONG}_REJECTED`:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
