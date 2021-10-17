const omdbKey = 'e2480ab6'

function getGlitchMovies() {
	fetch('https://codeup-json-server.glitch.me/movies')
		.then((response) => response.json())
		.then((jsonData) => console.log(jsonData))
}


fetch('http://www.omdbapi.com/?i=tt3896198&apikey=e2480ab6')
	.then((response) => response.json())
	.then((jsonData) => console.log(jsonData))