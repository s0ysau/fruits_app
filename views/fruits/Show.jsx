const React = require('react')
const Default = require('../layouts/Default.jsx')

class Show extends React.Component {
  render () {
    const { name, color, readyToEat } = this.props.fruit
    const capName = name[0].toUpperCase() + name.substring(1)
    return (
      <Default title={`${capName} Show Page`} fruit={this.props.fruit}>
        <p> {capName} is {color} and {readyToEat ? 'it\'s ready to eat' : 'its\'s not ready to eat'}</p>
      </Default>
    )
  }
}
module.exports = Show
