async function getProfile(username){
	const response = await fetch(`https://api.github.com/users/${username}`);
	return response.json();
}

async function getRepos(username){
	const response = await fetch(`https://api.github.com/users/${username}/repos`);
	return response.json();
}

async function getUserData(player){
	const [ profile, repos ] = await Promise.all([getProfile(player), getRepos(player)]);
	return {
		profile: profile,
		score: getScore(profile, repos)
	}
}

export async function fetchPopularRepos(lang){
	const encodedUri = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`);
	const response = await fetch(encodedUri)
	const repos = await response.json();
	return repos.items;
}

export async function battle(players){
	const response = await Promise.all(players.map(getUserData)).catch(handleError);
	return response === null
    ? response
    : sortPlayers(response);
}

const getStars = (repos) => repos.reduce((count, repo) => count + repo.stargazers_count + 1, 0);

const getScore = (user, repos) => (user.followers * 3) + getStars(repos);

const sortPlayers = (players) => players.sort((a,b) => a.score < b.score )

const handleError = (error) => {
	console.warn(error);
	return null;
}
