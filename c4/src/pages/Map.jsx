import React from 'react'
import {FaMapMarker} from 'react-icons/fa'
import GoogleMapReact from 'google-map-react';
import { center, mapOptions } from '../data/data';
import { Navbar, Sidebar } from '../components';

const Map = () => {

  const Marker = () => <div>
    <FaMapMarker
      color="red"
      size={30} 
    />
  </div>;


  return (
    <div className='flex relative'>
    
    <Sidebar />
    <Navbar />
    <div className='flex z-0' style={{width: "100%", height: "100vh"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAvvbvEGUO3njX8QjqaAnV-O9Xa2yubM10" }}
        defaultCenter={{lat: center.lat, lng: center.lng}}
        defaultZoom={13}
        options={mapOptions}
        // yesIWantToUseGoogleMapApiInternals
      >
        <Marker
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>
    </div>
    </div>

  )
}

export default Map