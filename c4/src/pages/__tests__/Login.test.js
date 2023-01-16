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
  const idInput = screen.getByLabelText(/Id/i)
  expect(idInput).toBeInTheDocument()
})

test('Password input should be rendered', () => {
  render(<Login />)
  const keyInput = screen.getByLabelText(/Password/i)
  expect(keyInput).toBeInTheDocument()
})

test('On both empty inputs disabled login button', () => {
  render(<Login />)
  const LoginBtn = screen.getByText(/Iniciar Sesión/i)
  expect(LoginBtn).toBeDisabled()
})

test('On empty ID input disabled login button', () => {
  render(<Login />)
  const LoginBtn = screen.getByText(/Iniciar Sesión/i)
  const idInput = screen.getByLabelText(/Id/i)
  fireEvent.change(idInput.closest("input"), {target: {value: 'Lorem'}})
  expect(LoginBtn).toBeDisabled()
})

test('On empty Password input disabled login button', () => {
  render(<Login />)
  const LoginBtn = screen.getByText(/Iniciar Sesión/i)
  const pswInput = screen.getByLabelText(/Password/i)
  fireEvent.change(pswInput.closest("input"), {target: {value: 'Lorem'}})
  expect(LoginBtn).toBeDisabled()
})
test("Id input should change", () => {
  render(<Login />);
  const pswInput = screen.getByLabelText(/Password/i);
  const testValue = "test";
  fireEvent.change(pswInput, { target: { value: testValue } });
  expect(pswInput.value).toBe(testValue);
});

test("Password input should change", () => {
  render(<Login />);
  const idInput = screen.getByLabelText(/Id/i);
  const testValue = "test";

  fireEvent.change(idInput, { target: { value: testValue } });
  expect(idInput.value).toBe(testValue);
});

test('Enabled login button when id and password inputs have text', () => {
  render(<Login />)
  const pswInput = screen.getByLabelText(/Password/i)
  const idInput = screen.getByLabelText(/Id/i)
  const testValue = "test";

  fireEvent.change(pswInput, {target: {value: testValue}})
  fireEvent.change(idInput, {target: {value: testValue}})
  expect(idInput.value).toBe(testValue);
  expect(pswInput.value).toBe(testValue);
  const LoginBtn = screen.getByText(/Iniciar Sesión/i)
  console.log("hey",LoginBtn)
  expect(LoginBtn.closest('button')).not.toBeDisabled();

})



