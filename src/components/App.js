import React, { Component } from "react";
import { render } from "react-dom";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address : '',
      key: '',
      long: '',
      lat: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${this.state.key}`)
      .then(response => response.json())
      .then(data => 
        this.setState(
          { address: data.results[0].formatted_address ,
          }


      ))
      .catch(error => alert(error));
    });
  }

  render() {
    const style = {
      width: '300px',
      height: '300px'
      }


    
    return (
      <div>
        <h4>Using geolocation JavaScript API in React {this.state.address}</h4>
        <Map 
          google={this.props.google} 
          zoom={10}
          initialCenter={{
          lat: 37,
          lng: -121
          }}
          style={style}>
          <Marker />
        </Map>

      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyBvloS4OahFAEgjuX67ntBAB6FgdVhQgZU")
 })(App);