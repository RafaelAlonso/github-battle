import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'

class PlayerInput extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired
	}

	static defaultProps = {
		label: 'username'
	}

	state = {
		username: ''
	}

	updateUsername = (event) => {
		const name = event.target.value;
		this.setState(() => ({ username: name }) )
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.onSubmit(this.props.id, this.state.username)
	}

	render(){
		const { username } = this.state;
		const { label }		 = this.props;
		return (
			<form className="column" onSubmit={this.handleSubmit}>
				<label className="header" htmlFor='username'>{label}</label>
				<input 
					type="text" 
					placeholder="github username"
					id={this.props.id}
					value={username}
					onChange={this.updateUsername}
					autoComplete='off'
				/>
				<button className="button" type="submit" disabled={!username}>Submit</button>
			</form>
		)
	}
}

export default class Battle extends React.Component {
	state = {
		'playerOneName': '',
		'playerTwoName': '',
		'playerOneImage': null,
		'playerTwoImage': null
	}

	updatePlayer = (id, username) => {
		this.setState(() => {
			const newPlayer = {};
			newPlayer[id + 'Name'] = username;
			newPlayer[id + 'Image'] = 'https://www.github.com/' + username + '.png?size=200';
			return newPlayer;
		})
	}

	handleReset = (id) => {
		this.setState(() => {
			const newPlayer = {};
			newPlayer[id + 'Name'] = '';
			newPlayer[id + 'Image'] = null;
			return newPlayer;
		})
	}

	render(){
		const { match } = this.props;
		const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
		
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
							<button className='reset' onClick={() => this.handleReset('playerOne')}>Reset</button>
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
							<button className='reset' onClick={() => this.handleReset('playerTwo')}>Reset</button>
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