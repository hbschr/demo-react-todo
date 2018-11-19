import React from 'react'
import { objectStorage } from './LocalStorage'
import TodoItem from './TodoItem'
import NewTodoItem from './NewTodoItem'


const [save, load] = objectStorage('todolist')


/**
 * standalone todo list component.
 * features:
 * -   create new task
 * -   delete task
 * -   mark task as done
 * -   stores todo list in browsers localStorage
 * props: none
 */
export default class TodoList extends React.Component {
  constructor (props) {
    super(props)
    const restoredList = load()
    this.state = {
      list: Array.isArray(restoredList) ? restoredList : [],
      showAllTasks: false
    }
  }

  componentDidUpdate () {
    // will fire too often, since all state changes trigger.
    // have to implement some dirty checking before sending out api calls.
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

  handleToggle (todoItem) {
    // `setState` merges given state object with current one. have to manipulate list, just setting bool is not enough
    this.setState(state => ({
      list: state.list.map(item => item !== todoItem ? item : Object.assign({}, item, {done: !item.done}))
    }))
  }

  handleToggleShowAll () {
    this.setState(state => ({showAllTasks: !state.showAllTasks}))
  }

  render () {
    const handleCreate = this.handleCreate.bind(this)
    const handleDelete = this.handleDelete.bind(this)
    const handleToggle = this.handleToggle.bind(this)
    const handleToggleShowAll = this.handleToggleShowAll.bind(this)
    const allTasks = this.state.list
    const doneTasks = allTasks.filter(item => item.done)
    const todoTasks = allTasks.filter(item => !item.done)
    const todoItems = (this.state.showAllTasks ? allTasks : todoTasks)
      .map((item, index) =>
        <TodoItem key={index} model={item} onToggleDone={handleToggle} onDelete={handleDelete} />
      )
    return (
      <div className="todo-list">
        <NewTodoItem onSubmit={handleCreate} />
        <button onClick={handleToggleShowAll}>
          {this.state.showAllTasks ? "Hide Finished Tasks" : "Show All Tasks"}
        </button>
        <ul>
          {todoItems}
        </ul>
        <div className="statistic">
          <span>done: {doneTasks.length}</span>
          <span>todo: {todoTasks.length}</span>
          <span>total: {allTasks.length}</span>
        </div>
      </div>
    )
  }
}
