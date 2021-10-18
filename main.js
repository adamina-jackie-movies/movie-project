const omdbKey = 'e2480ab6'

const getGlitchMovies = fetch('https://adamina-jackie-cinema.glitch.me/movies');
$('#myModal').on('shown.bs.modal', function () {
	$('#myInput').trigger('focus')
})

// Recommended movies variables
let interstellarData = fetch('https://www.omdbapi.com/?i=tt0816692&apikey=e2480ab6')
let adamsFamilyData = fetch('https://www.omdbapi.com/?i=tt11125620&apikey=e2480ab6')
let duneData = fetch('https://www.omdbapi.com/?i=tt1160419&apikey=e2480ab6')
let jokerData = fetch('https://www.omdbapi.com/?i=tt7286456&apikey=e2480ab6')
let halloweenKillsData = fetch('https://www.omdbapi.com/?i=tt10665338&apikey=e2480ab6')



$(document).ready(function () {
	$('#add-movie-img').css('visibility', 'hidden')
	$('#add-movie-button').css('visibility', 'hidden')
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
					$('#add-movie-button').css('visibility', 'visible')
					$('#add-movie-img').css('visibility', 'visible')
				})
			
			Promise.all([interstellarData, adamsFamilyData, duneData, jokerData, halloweenKillsData])
				.then((responses) => Promise.all(responses.map((response) => response.json())))
				.then((parsedMovies) => {
					console.log(parsedMovies)
					
					// iterate through parsedMovies to create card deck for recommended movies section
					let title = parsedMovies[i].Title
					console.log(title)
				})
		}, 1500)
		
		
	})
	
})