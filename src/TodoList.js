import React from 'react';


class TodoItem extends React.Component {
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


class NewTodoItem extends React.Component {
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
    this.props.onSubmit(this.state.value)
    this.setState({value: ''})
  }

  render () {
    const onSubmit = this.handleSubmit.bind(this)
    const onChange = this.handleChange.bind(this)
    return (
      <form onSubmit={onSubmit}>
        <input value={this.state.value} onChange={onChange} />
        <input type="submit" value="+" />
      </form>
    )
  }
}


class TodoList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  handleCreate (newItem) {
    this.setState(state => ({
      list: state.list.concat([newItem])
    }))
  }

  handleDelete (itemToDelete) {
    this.setState(state => ({
      list: state.list.filter(item => item !== itemToDelete)
    }))
  }

  render () {
    const newItem = this.handleCreate.bind(this)
    const todoItems = this.state.list.map((item, index) =>
      <TodoItem key={index} value={item} onDelete={this.handleDelete.bind(this, item)} />
    )
    return (
      <div>
        <NewTodoItem onSubmit={newItem} />
        <ul>
          {todoItems}
        </ul>
      </div>
    );
  }
}

export default TodoList
