import React from 'react'
import ReactDOM from 'react-dom'
import TodoItem from './TodoItem'

const model = {description: 'text', done: false}
const noop = () => {}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TodoItem model={model} onDone={noop} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
