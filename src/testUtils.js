/**
 * function that does nothing.
 */
export const noop = () => {}

/**
 * return a simple jest mock function that does nothing.
 */
export function getMock () {
  return jest.fn(noop)
}

/**
 * mock event object, since `enzyme`s `simulate` doesn't provide any.
 */
export const mockedEvent = {
  event: {
    target: {
      value: 'value'
    }
  },
  preventDefault: noop,
}

/**
 * a task item, undone.
 */
export const taskItem = {
  description: 'task1',
  done: false,
}

/**
 * a task item, done.
 */
export const taskItemDone = {
  description: 'task2',
  done: true,
}

/**
 * a simple test string.
 */
export const testString = 'hello world'
