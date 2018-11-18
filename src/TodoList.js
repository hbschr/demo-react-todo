import React from 'react';
import TodoItem from './TodoItem';
import NewTodoItem from './NewTodoItem';


export default class TodoList extends React.Component {
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
