import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'
import Popular from './Popular'

export default class App extends React.Component {
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