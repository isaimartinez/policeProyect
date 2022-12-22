import React,{useState, useEffect} from 'react'
import {FaMapMarker} from 'react-icons/fa'
import GoogleMapReact from 'google-map-react';
import { center, mapOptions } from '../data/data';
import { Navbar, Sidebar, IncidenciasBar, Marker } from '../components';
import { useSelector, useDispatch } from 'react-redux'
import {setTempZone} from '../redux/reducers/dataSlice'

let polygons = []
const Map = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [mapApi, setMapApi] = useState(null)
  const [tempPolygon, setTempPolygon] = useState(null)
  const {zones, tempZone, incidencias} = state.data
  const {drawingZone, showZones, showTraffic} = state.view

  useEffect(() => {
    if(mapApi){
      const {map,maps} = mapApi;
      renderZones(map, maps)
    } 
  }, [mapApi, zones, showZones])

  useEffect(() => {
    if(mapApi && drawingZone) {
      const {map,maps} = mapApi;
      renderTempZone(map, maps)
    } else if (mapApi && !drawingZone){
      tempPolygon?.setMap(null)
    }
  }, [mapApi, drawingZone, tempZone])
  
  const renderZones = (map, maps) => {
    if(!showZones) {
      for (let i = 0; i < polygons.length; i++) {
        let element = polygons[i];
        element.setMap(null)
      }
      polygons = []
    } else {
      for (let i = 0; i < zones.length; i++) {
        const element = new maps.Polygon({
          paths: zones[i].coords,
          strokeColor: zones[i].color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: zones[i].color,
          fillOpacity: 0.35
        })
        element.setMap(map);
        polygons.push(element)
      }
    }
  }

  const renderTempZone = (map, maps) => {
    tempPolygon?.setMap(null)
    if(drawingZone) {
      var element = new maps.Polygon({
        paths: tempZone.coords,
        strokeColor: tempZone.color,
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: tempZone.color,
        fillOpacity: 0.35
      })
      element.setMap(map);
      setTempPolygon(element)
    }
  }

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
          {incidencias.map((item, i) => (
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