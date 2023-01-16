import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render as rtlRender, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider  } from 'react-redux'
import Login from '../Login/Login'
import {store} from 'redux/store'

const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>
)

test('Id input should be rendered', () => {
  render(<Login />)

  const idInput = screen.getByText(/Id/i)

  expect(idInput).toBeInTheDocument()

})

test('Password input should be rendered', () => {
  render(<Login />)

  const keyInput = screen.getByText(/Password/i)
  expect(keyInput).toBeInTheDocument()

})