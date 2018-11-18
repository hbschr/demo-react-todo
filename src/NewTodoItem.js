import React from 'react';


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
