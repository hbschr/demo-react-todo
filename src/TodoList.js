import React from 'react'
import { objectStorage } from './LocalStorage'
import TodoItem from './TodoItem'
import NewTodoItem from './NewTodoItem'


const [save, load] = objectStorage('todolist')


export default class TodoList extends React.Component {
  constructor (props) {
    super(props)
    const restoredList = load()
    this.state = {
      list: Array.isArray(restoredList) ? restoredList : [],
      showDoneTasks: false
    }
  }

  componentDidUpdate () {
    // will also be called when state besides `list` is changed
    save(this.state.list)
  }

  handleCreate (description) {
    const newTodo = {
      description,
      done: false
    }
    this.setState(state => ({
      list: state.list.concat([newTodo])
    }))
  }

  handleDelete (todoItem) {
    this.setState(state => ({
      list: state.list.filter(item => item !== todoItem)
    }))
  }

  toggleDone (todoItem) {
    // `setState` merges given state object with current one. have to manipulate list, just setting bool is not enough
    this.setState(state => ({
      list: state.list.map(item => item !== todoItem ? item : Object.assign({}, item, {done: !item.done}))
    }))
  }

  toggleShowDone () {
    this.setState(state => ({showDoneTasks: !state.showDoneTasks}))
  }

  render () {
    const newItem = this.handleCreate.bind(this)
    const todoItems = this.state.list
      .filter(item => !item.done || this.state.showDoneTasks)
      .map((item, index) =>
        <TodoItem key={index} model={item} onDone={this.toggleDone.bind(this, item)} onDelete={this.handleDelete.bind(this, item)} />
      )
    return (
      <div className="todo-list">
        <NewTodoItem onSubmit={newItem} />
        <button checked={this.state.showDoneTasks} onClick={this.toggleShowDone.bind(this)}>
          {this.state.showDoneTasks ? "Hide Finished Tasks" : "Show Finished Tasks"}
        </button>
        <ul>
          {todoItems}
        </ul>
      </div>
    )
  }
}
