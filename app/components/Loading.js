var React = require('react');
var PropTypes = require('prop-types');

class Loading extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			text:  props.text,
			style: props.style,
			speed: props.speed,
		}
	}

	componentDidMount(){
		let stopper = this.props.text + '...';
		this.interval = window.setInterval(() => {
			if(this.state.text === stopper){
				this.setState(() => {
					return {
						text: this.props.text
					}
				})
			} else {
				this.setState((prevState) =>{
					return {
						text: prevState.text + '.'
					}
				})
			}
		}, this.state.speed);
	}

	componentWillUnmount(){
		window.clearInterval(this.interval);
	}

	render(){
		return (
			<p style={this.state.style}>
				{this.state.text}
			</p>
		)
	}
}

Loading.propTypes = {
	text:  PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired,
	style: PropTypes.object.isRequired,
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 300,
	style: {fontSize: '35px', textAlign: 'center'},
}

module.exports = Loading;