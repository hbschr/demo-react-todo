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

  handleCreate = description => {
    const newTodo = {
      description,
      done: false
    }
    this.setState(state => ({list: state.list.concat([newTodo])}))
  }

  handleDelete = todoItem => {
    this.setState(state => ({list: state.list.filter(item => item !== todoItem)}))
  }

  handleToggle = todoItem => {
    // `setState` merges given state object with current one. have to manipulate list, just setting bool is not enough
    this.setState(state => ({
      list: state.list.map(item => item !== todoItem ? item : Object.assign({}, item, {done: !item.done}))
    }))
  }

  handleToggleShowAll = () => {
    this.setState(state => ({showAllTasks: !state.showAllTasks}))
  }

  render () {
    const handleCreate = this.handleCreate
    const handleDelete = this.handleDelete
    const handleToggle = this.handleToggle
    const handleToggleShowAll = this.handleToggleShowAll
    const { list, showAllTasks } = this.state
    const doneTasks = list.filter(item => item.done)
    const todoTasks = list.filter(item => !item.done)
    const todoItems = (showAllTasks ? list : todoTasks)
      .map((item, index) =>
        <TodoItem key={index} model={item} onToggleDone={handleToggle} onDelete={handleDelete} />
      )
    return (
      <div className="todo-list">
        <NewTodoItem onSubmit={handleCreate} />
        <button onClick={handleToggleShowAll}>
          {showAllTasks ? "Hide Finished Tasks" : "Show All Tasks"}
        </button>
        <ul>
          {todoItems}
        </ul>
        <div className="statistic">
          <span>done: {doneTasks.length}</span>
          <span>todo: {todoTasks.length}</span>
          <span>total: {list.length}</span>
        </div>
      </div>
    )
  }
}
