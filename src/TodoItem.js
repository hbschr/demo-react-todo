import React from 'react';
import { FaTrash } from 'react-icons/fa'


export default class TodoItem extends React.Component {
  render () {
    const onDelete = this.props.onDelete
    return (
      <li>
        <span>{this.props.value}</span>
        <span className="icon" title="delete" onClick={onDelete}><FaTrash /></span>
      </li>
    )
  }
}
