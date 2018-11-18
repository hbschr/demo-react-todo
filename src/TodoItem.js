import React from 'react';


export default class TodoItem extends React.Component {
  render () {
    const onDelete = this.props.onDelete
    return (
      <li>
        {this.props.value}
        <input type="button" onClick={onDelete} value="x" />
      </li>
    )
  }
}
