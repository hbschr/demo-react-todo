import React from 'react'
import { FaPlus } from 'react-icons/fa'


/**
 * component to create a new todo item (aka task).
 * props:
 * -   `onSubmit`: callback which will be called with the non-empty decription text of the new task
 */
export default class NewTodoItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange = event => {
    this.setState({value: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const { value } = this.state
    if (!value) {
      return
    }
    this.props.onSubmit(value)
    this.setState({value: ''})
  }

  render () {
    const onSubmit = this.handleSubmit
    const onChange = this.handleChange
    const { value } = this.state
    return (
      <form onSubmit={onSubmit}>
        <input placeholder="What's todo?" value={value} onChange={onChange} />
        <span className="icon" title="add" onClick={onSubmit}><FaPlus /></span>
      </form>
    )
  }
}
