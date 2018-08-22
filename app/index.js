import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
require('./index.css');


ReactDom.render(
	<App />, // the component to render
	document.getElementById('app') // where to render it (parent)
);