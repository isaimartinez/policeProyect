import React from 'react'
import GoogleMapReact from 'google-map-react';
import { center, mapOptions } from '../../data/data';
import { Navbar, Sidebar, IncidenciasBar, Marker } from '../../components';
import { useSelector, useDispatch } from 'react-redux'
import {useOnMap, polygons} from './hooks.js'

const Map = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {filteredIncidencias} = state.data
  const {showTraffic} = state.view

  const {handleApiLoaded, handleMapOnClick} = useOnMap()


  return (
    <div className='flex relative'>
      <Sidebar />
      <Navbar />
      <IncidenciasBar />
      <div className='flex z-0' style={{width: "100%", height: "100vh"}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAvvbvEGUO3njX8QjqaAnV-O9Xa2yubM10" }}
          defaultCenter={{lat: center.lat, lng: center.lng}}
          defaultZoom={13}
          onClick={handleMapOnClick}
          layerTypes={showTraffic ? ['TrafficLayer', 'TransitLayer'] : []}
          options={mapOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {filteredIncidencias.map((item, i) => (
            <Marker
              lat={item.latitude}
              lng={item.longitude}
              color={item.color}
              id={item.id}
              key={i}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>

  )
}

export default Map