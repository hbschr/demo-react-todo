import React from 'react'
import { FaTrash } from 'react-icons/fa'


export default class TodoItem extends React.Component {
  render () {
    const onDelete = this.props.onDelete
    return (
      <li>
        <input type="checkbox" checked={this.props.model.done} onChange={this.props.onDone} />
        <span>{this.props.model.description}</span>
        <span className="icon" title="delete" onClick={onDelete}><FaTrash /></span>
      </li>
    )
  }
}
