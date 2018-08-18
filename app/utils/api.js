var axios = require('axios');

function getProfile(username){
	return axios.get('https://api.github.com/users/' + username).then(user => user.data);
}

function getRepos(username){
	return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getStars(repos){
	return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count + 1
  }, 0);
}

function getScore(user, repos){
	let followers = user.followers;
	let stars = getStars(repos);

	return (followers * 3) + stars;
}

function handleError(error){
	console.log(error);
	return null;
}

function getUserData(player){
	return axios.all([
		getProfile(player),
		getRepos(player)
	]).then(function(data) {
		let profile = data[0];
		let repos = data[1];

		return {
			profile: profile,
			score: getScore(profile, repos)
		}
	})
}

function sortPlayers(players){
	return players.sort((a,b) => {return a.score < b.score})
}

module.exports = {
	battle: function(players){
		return axios.all(players.map(getUserData))
		.then(sortPlayers)
		.catch(handleError)
	},
	fetchPopularRepos: function(lang){
		let encodedUri = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + lang + '&sort=stars&order=desc&type=Repositories');

		return axios.get(encodedUri).then(response => response.data.items);
	}
}