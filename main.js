const omdbKey = 'e2480ab6'

const getGlitchMovies = fetch('https://adamina-jackie-cinema.glitch.me/movies');


// fetch('http://www.omdbapi.com/?i=tt3896198&apikey=e2480ab6')
// 	.then((response) => response.json())
// 	.then((jsonData) => console.log(jsonData))

$(document).ready(function () {
	$('#enter').click(function (event) {
		event.preventDefault();
		getGlitchMovies
			.then((response) => response.json())
			.then((movies) => console.log(movies))
	})
	
})