var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
	return (
		<div className="column">
			<img 
				src={props.image}
				alt={props.username}
				className="avatar"
			/>
			<h2>@{props.username}</h2>
			{props.children}
		</div>
	)
}

PlayerPreview.propTypes = {
	image: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;