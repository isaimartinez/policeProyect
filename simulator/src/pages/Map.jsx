import React from 'react'
import GoogleMapReact from 'google-map-react';
import { center, mapOptions } from '../data/data';
import {postIncidencia} from '../APIs/index'
import {genId} from '../utils'

const Map = () => {

  const preSaved = {
    altitude: 1,
    altitudeAccuracy: 1,
    latitude: Number,
    accuracy: 1,
    longitude: Number,
    heading: -1,
    speed: -1,
    phoneNumber: 12345678,
    name: "Prueba",
  }

  const handleMapOnClick = async ({x, y, lat, lng, event}) => {
    let data = {...preSaved, latitude: lat, longitude: lng, id: genId()}
    console.log(data)
    await postIncidencia(data)
  }

  return (
    <div className='flex bg-red-200'>
      <div className='flex z-0' style={{width: "100%", height: "100vh"}}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyAvvbvEGUO3njX8QjqaAnV-O9Xa2yubM10" }}
            defaultCenter={{lat: center.lat, lng: center.lng}}
            defaultZoom={13}
            onClick={handleMapOnClick}
            options={mapOptions}
            // yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Map