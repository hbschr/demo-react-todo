import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { getMock, noop, taskItem, taskItemDone } from './testUtils'
import TodoItem from './TodoItem'

// configure enzyme, can that be done somewhere more globally?
configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TodoItem model={taskItem} onDone={noop} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders description of given model', () => {
  const component = shallow(<TodoItem model={taskItem} onDone={noop} />)
  expect(component.text()).toMatch(new RegExp(taskItem.description + '.*'))
})

it('renders done status of given model', () => {
  const component = shallow(<TodoItem model={taskItem} onDone={noop} />)
  let checkbox = component.find('input')
  expect(checkbox.props().checked).toBe(false)
  component.setProps({model: taskItemDone})
  checkbox = component.find('input')
  expect(checkbox.props().checked).toBe(true)
})

it('does not call callbacks without cause', () => {
  const onDone = getMock()
  const onDelete = getMock()
  shallow(<TodoItem model={taskItem} onDone={onDone} onDelete={onDelete} />)
  expect(onDone.mock.calls.length).toBe(0)
  expect(onDelete.mock.calls.length).toBe(0)
})

it('does call `onDone` callback on button click', () => {
  const onDone = getMock()
  const component = shallow(<TodoItem model={taskItem} onDone={onDone} />)
  component.find('input').simulate('change')
  expect(onDone.mock.calls.length).toBe(1)
})

it('does call `onDelete` callback on button click', () => {
  const onDelete = getMock()
  const component = shallow(<TodoItem model={taskItem} onDone={noop} onDelete={onDelete} />)
  component.find('.icon').simulate('click')
  expect(onDelete.mock.calls.length).toBe(1)
})
