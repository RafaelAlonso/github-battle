var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			username: ''
		}

		this.updateUsername = this.updateUsername.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateUsername(event){
		let name = event.target.value;
		this.setState(() => {
			return {
				username: name
			}
		})
	}

	handleSubmit(event){
		event.preventDefault();

		this.props.onSubmit(this.props.id, this.state.username)
	}

	render(){
		return (
			<form className="column" onSubmit={this.handleSubmit}>
				<label className="header" htmlFor={this.props.id}>{this.props.label}</label>
				<input 
					type="text" 
					placeholder="github username"
					id={this.props.id}
					value={this.state.username}
					onChange={this.updateUsername}
					autoComplete='off'
				/>
				<button className="button" type="submit" disabled={!this.state.username}>Submit</button>
			</form>
		)
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			'playerOneName': '',
			'playerTwoName': '',
			'playerOneImage': null,
			'playerTwoImage': null
		}

		this.updatePlayer = this.updatePlayer.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	updatePlayer(id, username){
		this.setState(() => {
			let newPlayer = {};
			newPlayer[id + 'Name'] = username;
			newPlayer[id + 'Image'] = 'https://www.github.com/' + username + '.png?size=200';
			return newPlayer;
		})
	}

	handleReset(id){
		this.setState(() => {
			let newPlayer = {};
			newPlayer[id + 'Name'] = '';
			newPlayer[id + 'Image'] = null;
			return newPlayer;
		})
	}

	render(){
		let match = this.props.match;
		let playerOneName = this.state.playerOneName;
		let playerTwoName = this.state.playerTwoName;
		let playerOneImage = this.state.playerOneImage;
		let playerTwoImage = this.state.playerTwoImage;
		return(
			<div className="battle-container">
				<div className="row">
					{!playerOneName && 
						<PlayerInput 
							id='playerOne'
							label='Player One'
							onSubmit={this.updatePlayer}
						/>
					}

					{playerOneImage &&
						<PlayerPreview
							image={playerOneImage}
							username={playerOneName}
						>
							<button className='reset' onClick={this.handleReset.bind(null, 'playerOne')}>Reset</button>
						</PlayerPreview>
					}

					{!playerTwoName && 
						<PlayerInput 
							id='playerTwo'
							label='Player Two'
							onSubmit={this.updatePlayer}
						/>
					}

					{playerTwoImage &&
						<PlayerPreview
							image={playerTwoImage}
							username={playerTwoName}
						>
							<button className='reset' onClick={this.handleReset.bind(null, 'playerTwo')}>Reset</button>
						</PlayerPreview>
					}
				</div>
				{playerOneImage && playerTwoImage &&
						<Link 
							className='button'
							to={{
								pathname: match.url + '/results',
								search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
							}}
						>
							Battle!
						</Link>
					}
			</div>
		)
	}
}

module.exports = Battle;