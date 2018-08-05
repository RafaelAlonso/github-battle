var axios = require('axios');

module.exports = {
	fetchPopularRepos(lang){
		let encodedUri = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + lang + '&sort=stars&order=desc&type=Repositories');

		return axios.get(encodedUri).then(response => response.data.items);
	}
}