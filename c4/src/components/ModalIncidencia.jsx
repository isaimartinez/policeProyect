import React from 'react'
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux'
import {modalStyles} from '../utils'
import {setIsModalIncidencia} from '../redux/reducers/viewSlice'
import {HeaderModal} from './'

const ModalIncidencia = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {isModalIncidencia } = state.view
  const {incidenciaActive, incidencias} = state.data

  const item = incidencias.filter((item => item.id == incidenciaActive))[0]

  const closeModal = () => {
    dispatch(setIsModalIncidencia(false))
  }

  return (
    <Modal
    isOpen={isModalIncidencia}
    onRequestClose={closeModal}
    style={modalStyles}
    ariaHideApp={false}
    contentLabel="Modal Incidencia"
  >
    <HeaderModal closeModal={closeModal}/>
  </Modal>
  )
}

export default ModalIncidencia