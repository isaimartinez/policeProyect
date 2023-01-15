import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Login from '../Login'

test('handle server side error', () => {
  render(<Login />)

  fireEvent.click(screen.getByText("Iniciar Sesión"))

  expect(screen.findByText("Error en el servidor")).toBeVisible()
})