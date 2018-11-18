import React from 'react';
import { FaTrash } from 'react-icons/fa'


export default class TodoItem extends React.Component {
  render () {
    const onDelete = this.props.onDelete
    return (
      <li>
        {this.props.value}
        <button onClick={onDelete}><FaTrash /></button>
      </li>
    )
  }
}
