import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { getMock, mockedEvent, testString } from './testUtils'
import NewTodoItem from './NewTodoItem'

// configure enzyme, can that be done somewhere more globally?
configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewTodoItem />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('does not call `onSubmit` callback without cause', () => {
  const spy = getMock()
  shallow(<NewTodoItem onSubmit={spy} />)
  expect(spy.mock.calls.length).toBe(0)
})

it('does not call `onSubmit` callback on empty state', () => {
  const spy = getMock()
  const component = shallow(<NewTodoItem onSubmit={spy} />)
  component.find('form').simulate('submit', mockedEvent)
  expect(spy.mock.calls.length).toBe(0)
})

it('calls given `onSubmit` callback on form submit', () => {
  const spy = getMock()
  const component = shallow(<NewTodoItem onSubmit={spy} />)
  component.state().value = testString
  component.find('form').simulate('submit', mockedEvent)
  expect(spy.mock.calls.length).toBe(1)
})

it('calls given `onSubmit` callback on button click', () => {
  const spy = getMock()
  const component = shallow(<NewTodoItem onSubmit={spy} />)
  component.state().value = testString
  component.find('.icon').simulate('click', mockedEvent)
  expect(spy.mock.calls.length).toBe(1)
})

it('passes state to `onSubmit` callback', () => {
  const spy = getMock()
  const component = shallow(<NewTodoItem onSubmit={spy} />)
  component.state().value = testString
  component.find('form').simulate('submit', mockedEvent)
  expect(spy.mock.calls[0][0]).toBe(testString)
})
