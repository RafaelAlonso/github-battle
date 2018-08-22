import React from 'react'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { battle } from '../utils/api'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

const Profile = (props) => {
  const { login, avatar_url, name, location, company, followers, following, public_repos, blog } = props.info;
	return (
	  <PlayerPreview username={login} image={avatar_url}>
	    <ul className='space-list-items'>
	      {name && <li>{name}</li>}
	      {location && <li>{location}</li>}
	      {company && <li>{company}</li>}
	      <li>Followers: {followers}</li>
	      <li>Following: {following}</li>
	      <li>Public Repos: {public_repos}</li>
	      {blog && <li><a href={blog}>{blog}</a></li>}
	    </ul>
	  </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

const Player = (props) => (
	<div className="column">
		<h1 className="header">{props.status}</h1>
		<h3 style={{textAlign: 'center'}}>{props.score} points</h3>
		<Profile info={props.profile} />
	</div>
)

Player.propTypes = {
	status: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
	state = {
		winner: null,
		loser: null,
		error: null,
		loading: true
	}

	async componentDidMount(){
		const query = this.props.location.search;
		const { playerOneName, playerTwoName } = queryString.parse(query);

		const players = await battle([playerOneName, playerTwoName]);

		if(players === null){
			return this.setState(() => ({
				error: 'Something went wrong. Check that both usernames are correct!',
				loading: false
			}))
		}

		return this.setState(() => ({
			error: null,
			winner: players[0],
			loser: players[1],
			loading: false
		}))
	}

	render(){
		const { winner, loser, error, loading } = this.state;
		
		if (loading) {
			return (
				<div className="home-container">
					<Loading />
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