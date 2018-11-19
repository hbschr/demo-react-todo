import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { getMock, mockedEvent, testString } from './testUtils'
import NewTodoItem from './NewTodoItem'

// configure enzyme, can that be done somewhere more globally?
configure({ adapter: new Adapter() })

/**
 * return tuple containing
 * -   shallow wrapper around rendered component
 * -   `onSubmit` spy function
 */
function getShallowWrapper () {
  const onSubmit = getMock()
  const component = shallow(<NewTodoItem onSubmit={onSubmit} />)
  return [component, onSubmit]
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewTodoItem />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('does not call `onSubmit` callback without cause', () => {
  const [_, spy] = getShallowWrapper()
  expect(spy.mock.calls.length).toBe(0)
})

it('does not call `onSubmit` callback on empty state', () => {
  const [component, spy] = getShallowWrapper()
  component.find('form').simulate('submit', mockedEvent)
  expect(spy.mock.calls.length).toBe(0)
})

it('calls given `onSubmit` callback on form submit', () => {
  const [component, spy] = getShallowWrapper()
  component.state().value = testString
  component.find('form').simulate('submit', mockedEvent)
  expect(spy.mock.calls.length).toBe(1)
})

it('calls given `onSubmit` callback on button click', () => {
  const [component, spy] = getShallowWrapper()
  component.state().value = testString
  component.find('.icon').simulate('click', mockedEvent)
  expect(spy.mock.calls.length).toBe(1)
})

it('passes state to `onSubmit` callback', () => {
  const [component, spy] = getShallowWrapper()
  component.state().value = testString
  component.find('form').simulate('submit', mockedEvent)
  expect(spy.mock.calls[0][0]).toBe(testString)
})
