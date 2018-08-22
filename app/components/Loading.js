import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
	static propTypes = {
		text:  PropTypes.string.isRequired,
		speed: PropTypes.number.isRequired,
		style: PropTypes.object.isRequired,
	};

	static defaultProps = {
		text: 'Loading',
		speed: 300,
		style: {fontSize: '35px', textAlign: 'center'},
	};

	state = {
		text:  this.props.text,
		style: this.props.style,
		speed: this.props.speed,
	};

	componentDidMount(){
		const stopper = this.props.text + '...';
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