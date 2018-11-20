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

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.state.value) {
      return
    }
    this.props.onSubmit(this.state.value)
    this.setState({value: ''})
  }

  render () {
    const onSubmit = this.handleSubmit.bind(this)
    const onChange = this.handleChange.bind(this)
    return (
      <form onSubmit={onSubmit}>
        <input placeholder="What's todo?" value={this.state.value} onChange={onChange} />
        <span className="icon" title="add" onClick={onSubmit}><FaPlus /></span>
      </form>
    )
  }
}
