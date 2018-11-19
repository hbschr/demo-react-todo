import React from 'react'
import ReactDOM from 'react-dom'
import NewTodoItem from './NewTodoItem'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewTodoItem />, div)
  ReactDOM.unmountComponentAtNode(div)
})
