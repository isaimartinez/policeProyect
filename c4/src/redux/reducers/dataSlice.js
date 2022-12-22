import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs';
import {postNewZone} from '../../APIs/'
import { toast } from 'react-toastify';

const initialState = {
  incidencias: [],
  incidenciaActive: "",
  date: dayjs(),
  selectedZones: [],
  zones: [],
  tempZone: {name: "", coords: [], color: ""}
}

export const saveZone = createAsyncThunk(
  'data/saveZone',
  async (zone) => {
    const {data} = await postNewZone(zone)
    toast.success('Zona Guardada Exitosamente', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("saved")
    return data
  }

)

export const viewSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setIncidencias: (state, action) => {
        state.incidencias = action.payload
      },
      removeIncidencia: (state, action) => {
        state.incidencias.splice(state.incidencias.findIndex(function(i){
            return i.id === action.payload;
        }), 1);
      },

      setDate: (state, action) => {
        state.date = action.payload
      },
      setSelectedZones: (state, action) => {
        state.selectedZones = action.payload
      },
      setZones: (state, action) => {
        state.zones = action.payload
      },
      setTempZone: (state, action) => {
        state.tempZone = action.payload
      },
      setIncidenciaActive: (state, action) => {
        state.incidenciaActive = action.payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(saveZone.fulfilled, (state, action) => {
        state.zones.push(action?.payload)
      })
    },
})
  
export const { setIncidencias, removeIncidencia, setDate, setSelectedZones, setZones, setTempZone, setIncidenciaActive} = viewSlice.actions

export default viewSlice.reducer