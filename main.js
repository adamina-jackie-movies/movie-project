const omdbKey = 'e2480ab6'

const getGlitchMovies = fetch('https://adamina-jackie-cinema.glitch.me/movies');


// fetch('http://www.omdbapi.com/?i=tt3896198&apikey=e2480ab6')
// 	.then((response) => response.json())
// 	.then((jsonData) => console.log(jsonData))

$(document).ready(function () {
	$('#enter').click(function (event) {
		event.preventDefault();
		$('body').css('background-image', 'none') // removing landing page content after click event
		$('#enter').css('display', 'none') // removing landing page content after click event
		$('#loading').css('visibility', 'visible') // displaying "loading" animation after click event
		
		// Setting a timeout hanlder for fetchAPI request to make page use the "loading" animation
		setTimeout(function () {
			getGlitchMovies
				.then((response) => response.json())
				.then((movies) => {
					$('#loading').css('display', 'none') // removing "loading" animation after promise has been fulfilled
					console.log(movies)
				})
			
			$('body').html(`<h1>Movie Data Will Go Here</h1>`).css('text-align', 'center').css('margin-top', '30%')
		}, 2500)
		
	})
	
})