var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');
var Popular = require('./Popular');

class App extends React.Component {
	// returns the specific UI for this component
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/'  component={Home} />
						<Route exact path='/battle'  component={Battle} />
						<Route path='/battle/results'  component={Results} />
						<Route path='/popular' component={Popular} />
						<Route render={() => {return <p>Page Not Found</p> }}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

module.exports = App;