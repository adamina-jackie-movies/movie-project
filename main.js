const omdbKey = 'e2480ab6'

const getGlitchMovies = fetch('https://adamina-jackie-cinema.glitch.me/movies');


// fetch('http://www.omdbapi.com/?i=tt3896198&apikey=e2480ab6')
// 	.then((response) => response.json())
// 	.then((jsonData) => console.log(jsonData))

$(document).ready(function () {
	$('#enter').click(function (event) {
		event.preventDefault();
		$('body').css('background-image', 'none')
		$('#enter').css('display', 'none')
		$('#loading').css('visibility', 'visible')
		
		setTimeout(function () {
			getGlitchMovies
				.then((response) => response.json())
				.then((movies) => {
					$('#loading').css('display', 'none')
					console.log(movies)
				})
			
			$('body').html(`<h1>Movie Data Will Go Here</h1>`).css('text-align', 'center').css('margin-top', '30%')
		}, 2500)
		
	})
	
})