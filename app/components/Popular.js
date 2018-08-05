var React = require('react');

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
		// this.setState will overwrite this.state with the returned object
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
							style={language === this.state.selectedLanguage ? {color: '#d0021b'} : null}
							onClick={this.updateLanguage.bind(null, language)}
							key={language}
						>
							{language}
						</li>
					)
				})}
			</ul>
		)
	}
}

module.exports = Popular;