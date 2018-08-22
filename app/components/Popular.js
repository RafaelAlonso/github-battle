import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'
import Loading from './Loading'

// SelectLanguage is a Component with only the render() method,
// so it can be writen as a function
const SelectLanguage = (props) => {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
	return (
		// return a list
		// we use 'className' to classes because the word 'Class' is reserved
		<ul className='languages'>
			{/* We map the array, returning an array of <li> */}
			{languages.map((language) => {
				return (
					// the property 'key' is needed and needs to be unique
					<li 
						style={language === props.selectedLanguage ? {color: '#d0021b'} : null}
						onClick={props.onSelect.bind(null, language)}
						key={language}
					>
						{language}
					</li>
				)
			})}
		</ul>
	)
}

// specify what are the types of the props that we are expecting for SelectLanguage
SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}


const RepoGrid = (props) => (
	<ul className="grid">
		{props.repos.map((repo, index) => (
			<li key={repo.name} className='popular-item'>
				<div className="popular-rank">#{index + 1}</div>
				<ul className="space-list-items">
					<li>
						<img 
							className='avatar'
							src={repo.owner.avatar_url}
							alt={'Avatar for ' + repo.owner.login}
						/>
					</li>
					<li><a href={repo.html_url}>{repo.name}</a></li>
					<li>@{repo.owner.login}</li>
					<li>{repo.stargazers_count} stars</li>
				</ul>
			</li>
			)
		)}
	</ul>
)

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired,
}





/*
	COMPONENTS HAVE MAINLY 3 THINGS TO BE CONCERNED ABOUT
		1. It's state (inittialy set inside constructor() method. Can be changed after)
		2. It's lifecycle events ( componentDidMount() / updated / componentWillUnmount() )
		3. It's UI (basecally, the render() method)

	Obs.: When it does not have a state, it's called a Stateless Component.
*/
export default class Popular extends React.Component {
	// To set / get a State of a Component, we need to instantiate the constructor
	constructor(props){
		// Always call super(props)
		super(props);
		// set the instance variable state with the states you want to track
		this.state = {
			// in this case, we call it 'selectedLanguage'
			// the default one is 'All'
			selectedLanguage: 'All',
			repos: null
		};

		// set the 'updateLanguage' function to always be in this class environment
		// we bind the 'updateLanguage' function to 'this'
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount () {
		this.updateLanguage(this.state.selectedLanguage);
	}

	// the function that will update the state of the component
	updateLanguage(lang) {
		// this.setState will get the returned object and overwrite the
		// matched keys of the current state with the values returned

		this.setState(function() {
			// we return the new state where the 'selectedLanguage' is the language we passed
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		// get the repos based on the new selected Language
		// .bind(this) at the end of this means that we are binding the environment
		// to call 'this.setState' properly
		api.fetchPopularRepos(lang)
			.then((repos) => {
				// console.log(repos);
				this.setState(function() {
					return {
						repos: repos
					}
				})
		});
	}

	// the function to render the component
	render (){
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{ this.state.repos 
					? <RepoGrid repos={this.state.repos} />
					: <Loading />
				}
			</div>
		)
	}
}