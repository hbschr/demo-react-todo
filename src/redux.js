import {createStore} from 'redux'


// actions and action creators

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const TOGGLE_SHOW_ALL = 'TOGGLE_SHOW_ALL'

export function addTodo (description) {
  return {type: ADD_TODO, description}
}

export function toggleTodo (index) {
  return {type: TOGGLE_TODO, index}
}

export function toggleShowAll () {
  return {type: TOGGLE_SHOW_ALL}
}


// reducers

const initialState = {
  showAll: false,
  todos: [],
}

const todos = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        description: action.description,
        done: false
      }
      return [...state, newTodo]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return {...todo, done: !todo.done}
        }
        return todo
      })
    default:
      return state
  }
}

const showAll = (state, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_ALL:
      return !state
    default:
      return state
  }
}

const reducer = (state=initialState, action) => {
  return {
    showAll: showAll(state.showAll, action),
    todos: todos(state.todos, action),
  }
}

// function reducer (state = [], action) {
//   switch (action.type) {
//     case 'ADD':
//       return [...state, action.item]
//     case 'REMOVE':
//       return state.slice(0, -1)
//     case 'CHANGE':
//       return state
//     default:
//       return state
//   }
// }


let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => console.info(store.getState()))

store.dispatch({type: ADD_TODO, description: 'erster'})
store.dispatch({type: ADD_TODO, description: 'zweiter'})
// store.dispatch({type: 'REMOVE'})
// store.dispatch({type: 'REMOVE'})
