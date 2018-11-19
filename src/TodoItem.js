import React from 'react'
import { FaTrash } from 'react-icons/fa'


/**
 * component to display and manipulate a single todo item (aka task)
 * props:
 * -   `model`: task object, containing two attributes: `description` and `done`
 * -   `onDelete`: callback which will be called with this items model when it shall be deleted
 * -   `onToggleDone`: callback which will be called with this items model when its done-state shall be toggled
 */
export default class TodoItem extends React.Component {

  handleToggle () {
    this.props.onToggleDone(this.props.model)
  }

  handleDelete () {
    this.props.onDelete(this.props.model)
  }

  render () {
    const onDelete = this.handleDelete.bind(this)
    const onToggle = this.handleToggle.bind(this)
    return (
      <li>
        <input type="checkbox" checked={this.props.model.done} onChange={onToggle} />
        <span>{this.props.model.description}</span>
        <span className="icon" title="delete" onClick={onDelete}><FaTrash /></span>
      </li>
    )
  }
}
