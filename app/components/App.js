var React = require('react');
var Popular = require('./Popular')

class App extends React.Component {
	// returns the specific UI for this component
	render() {
		return (
			<div>
				<Popular />
			</div>
		)
	}
}

module.exports = App;