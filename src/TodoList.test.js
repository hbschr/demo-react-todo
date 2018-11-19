import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { getMock, mockedEvent, testString } from './testUtils'
import TodoList from './TodoList'

// configure enzyme, can that be done somewhere more globally?
configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TodoList />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('initializes with empty list', () => {
  const component = shallow(<TodoList />)
  expect(component.state('list')).toEqual([])
})

it('adds new item', () => {
  const component = shallow(<TodoList />)
  const newTodo = component.find('NewTodo')
  // newTodo.state().value = testString
  // component.handleCreate('lala')
  // expect(component.state('list')).toEqual([])
})
