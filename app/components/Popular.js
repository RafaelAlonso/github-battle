var React = require('react');
var PropTypes = require('prop-types');

// SelectLanguage is a Component with only the render() method,
// so it can be writen as a function
function SelectLanguage (props) {
	let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
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


class Popular extends React.Component {
	// To set / get a State of a Component, we need to instantiate the constructor
	constructor(props){
		// Always call super(props)
		super(props);
		// set the instance variable state with the states you want to track
		this.state = {
			// in this case, we call it 'selectedLanguage'
			// the default one is 'All'
			selectedLanguage: 'All'
		};

		// set the 'updateLanguage' function to always be in this class environment
		// we bind the 'updateLanguage' function to 'this'
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	// the function that will update the state of the component
	updateLanguage(lang) {
		// this.setState will get the returned object and overwrite the
		// matched keys of the current state with the values returned

		this.setState(function() {
			// we return the new state where the 'selectedLanguage' is the language we passed
			return {
				selectedLanguage: lang
			}
		})
	}

	// the function to render the component
	render (){
		// just an array of strings
		return (
			<SelectLanguage
				selectedLanguage={this.state.selectedLanguage}
				onSelect={this.updateLanguage}
			/>
		)
	}
}

module.exports = Popular;