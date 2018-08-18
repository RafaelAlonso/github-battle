var React = require('react');
var queryString = require('query-string');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var api = require('../utils/api');
var PlayerPreview = require('./PlayerPreview');

function Profile (props) {
  var info = props.info;
	return (
	  <PlayerPreview username={info.login} image={info.avatar_url}>
	    <ul className='space-list-items'>
	      {info.name && <li>{info.name}</li>}
	      {info.location && <li>{info.location}</li>}
	      {info.company && <li>{info.company}</li>}
	      <li>Followers: {info.followers}</li>
	      <li>Following: {info.following}</li>
	      <li>Public Repos: {info.public_repos}</li>
	      {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
	    </ul>
	  </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player(props){
	return (
		<div className="column">
			<h1 className="header">{props.status}</h1>
			<h3 style={{textAlign: 'center'}}>{props.score} points</h3>
			<Profile 
				info={props.profile}
			/>
		</div>
	)
}

Player.propTypes = {
	status: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Results extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	componentDidMount(){
		let query = this.props.location.search;
		let players = queryString.parse(query);

		api.battle([
			players.playerOneName, 
			players.playerTwoName
		]).then((results) => {
			if(results === null){
				return this.setState(() => {
					return {
						error: 'Something went wrong. Check that both usernames are correct!',
						loading: false
					}
				})
			}

			return this.setState(() => {
				return {
					error: null,
					winner: results[0],
					loser: results[1],
					loading: false
				}
			})
		})
	}

	render(){
		let winner = this.state.winner;
		let loser = this.state.loser;
		let error = this.state.error;
		let loading = this.state.loading;
		
		if (loading) {
			return (
				<div className="home-container">
					<h1>Loading...</h1>
				</div>
			)
		}

		if (error) {
			return (
				<div className="home-container">
					<h1>{error}</h1>
					<Link to='/battle' className='button'>Restart</Link>
				</div>
			)
		}

		return(	
			<div className="home-container">
				<div className="row">
					<Player 
						status='Winner'
						score={winner.score}
						profile={winner.profile}
					/>

					<Player 
						status='Loser'
						score={loser.score}
						profile={loser.profile}
					/>
				</div>
			</div>
		)
	}
}

module.exports = Results;