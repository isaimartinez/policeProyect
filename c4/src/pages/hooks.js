import {useEffect, useState} from 'react'
import {onLoad} from '../APIs/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { center, mapOptions } from '../data/data';

export let polygons = []


export const useOnMap = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [mapApi, setMapApi] = useState(null)
  const [tempPolygon, setTempPolygon] = useState(null)
  const {zones, tempZone} = state.data
  const {drawingZone, showZones} = state.view

  useEffect(() => {
    onLoad()
  }, [])

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

  return {mapApi, setMapApi}
}