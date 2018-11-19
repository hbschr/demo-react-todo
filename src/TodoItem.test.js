import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { getMock, taskItem, taskItemDone } from './testUtils'
import TodoItem from './TodoItem'

// configure enzyme, can that be done somewhere more globally?
configure({ adapter: new Adapter() })

/**
 * return tuple containing
 * -   shallow wrapper around rendered component
 * -   `onToggleDone` spy function
 * -   `onDelete` spy function
 */
function getShallowWrapper () {
  const onToggleDone = getMock()
  const onDelete = getMock()
  const component = shallow(<TodoItem model={taskItem} onToggleDone={onToggleDone} onDelete={onDelete} />)
  return [component, onToggleDone, onDelete]
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TodoItem model={taskItem} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders description of given model', () => {
  const [component] = getShallowWrapper()
  expect(component.text()).toMatch(new RegExp(taskItem.description + '.*'))
})

it('renders done status of given model', () => {
  const [component] = getShallowWrapper()
  let checkbox = component.find('input')
  expect(checkbox.props().checked).toBe(false)
  component.setProps({model: taskItemDone})
  checkbox = component.find('input')
  expect(checkbox.props().checked).toBe(true)
})

it('does not call callbacks without cause', () => {
  const [_, onToggleDone, onDelete] = getShallowWrapper()
  expect(onToggleDone.mock.calls.length).toBe(0)
  expect(onDelete.mock.calls.length).toBe(0)
})

it('does call `onToggleDone` callback on button click', () => {
  const [component, onToggleDone] = getShallowWrapper()
  component.find('input').simulate('change')
  expect(onToggleDone.mock.calls.length).toBe(1)
  expect(onToggleDone.mock.calls[0][0]).toBe(taskItem)
})

it('does call `onDelete` callback on button click', () => {
  const [component, _, onDelete] = getShallowWrapper()
  component.find('.icon').simulate('click')
  expect(onDelete.mock.calls.length).toBe(1)
  expect(onDelete.mock.calls[0][0]).toBe(taskItem)
})
