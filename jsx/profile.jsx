const React = require('react')
const {
  Link
} = require('react-router')

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name:''}
  }

  render() {
    console.log(`name: ${this.state.name}`)
    return (
      <div>
        <label htmlFor="nameInput">Name: </label><input id="nameInput" type="text" onChange={this.props.handleNameChange} value={this.state.name}/>
        {(this.state.name == '' && !this.state.name) ? <p>Please Enter Your Name</p> : <p>Hello, {this.state.name}!</p>}
        <Link to="/" className="btn btn-danger">Go Home</Link>

      </div>
    )
  }
}

module.exports = Profile