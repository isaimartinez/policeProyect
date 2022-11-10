import React,{useState, useEffect} from 'react'
import {FaMapMarker} from 'react-icons/fa'
import GoogleMapReact from 'google-map-react';
import { useSelector, useDispatch } from 'react-redux'

const Item = ({item, i}) => {
  const dispatch = useDispatch()
  const {incidencias,} = useSelector((state) => state.data)
  const [isOpen, setIsOpen] = useState(false)
  
  const Marker = () => <div>
    <FaMapMarker
      color="red"
      size={30} 
    />
  </div>;

  useEffect(() => {
    incidencias.length == 1 ? setIsOpen(true): setIsOpen(false)
  }, [])
  

  return (
    <div className='flex flex-col p-3 gap-2 bg-slate-200 rounded-sm shadow cursor-pointer' key={i} onClick={() =>setIsOpen(!isOpen)}>
      <div className='grid grid-cols-5 gap-1'>

        {
          
           Object.entries(item).map(([key, value]) => {
            return (
              <div key={`p-${key}`}>
                <p className='text-black capitalize'>{key}: <span className='font-bold'>{value}</span></p>
              </div>
            )
           }
           )
        }
      </div>
      <div className='flex flex-row w-full'>
        {
          isOpen && (
            <>
              <div className='flex' style={{width: "850px", height: "500px"}}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyAvvbvEGUO3njX8QjqaAnV-O9Xa2yubM10" }}
                  defaultCenter={{lat: item.latitude, lng: item.longitude}}
                  defaultZoom={12}
                  yesIWantToUseGoogleMapApiInternals
                >
                  <Marker
                    lat={item.latitude}
                    lng={item.longitude}
                  />
                </GoogleMapReact>
              </div>
              <div className='flex items-center p-5'>
                {/* <button type='button' onClick={() => handleGetAddress(item.latitude, item.longitude, i)}>
                  Get Address
                </button> */}
                <p>Dirección: {item.address}</p>
              </div>
            </>
          )
        }
      </div>
    </div>  
  )
}

export default Item