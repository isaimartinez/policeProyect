import React,{useState, useEffect} from 'react'
import {FaMapMarker} from 'react-icons/fa'
import GoogleMapReact from 'google-map-react';
import { center, mapOptions } from '../data/data';
import { Navbar, Sidebar, IncidenciasBar, Marker } from '../components';
import { useSelector, useDispatch } from 'react-redux'
import {setTempZone} from '../redux/reducers/dataSlice'
import {useOnMap, polygons} from './hooks.js'

// let polygons = []
const Map = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {zones, tempZone, filteredIncidencias} = state.data
  const {drawingZone, showZones, showTraffic} = state.view

  const {mapApi, setMapApi} =useOnMap()


  const handleApiLoaded = (map, maps) => {
    setMapApi({map, maps})
  }

  const handleMapOnClick = ({x, y, lat, lng, event}) => {
    if(drawingZone){
      dispatch(setTempZone({...tempZone, coords: [...tempZone.coords, {lat, lng}]}))
    }
  }

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