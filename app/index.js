var React = require('react');
var ReactDom = require('react-dom');
require('./index.css');

class App extends React.Component {
	// returns the specific UI for this component
	render() {
		return (
			<div>
				Teste!
			</div>
		)
	}
}

ReactDom.render(
	<App />, // the component to render
	document.getElementById('app') // where to render it (parent)
);