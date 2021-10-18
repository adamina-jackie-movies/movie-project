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



			// API request for recommended movie section


			Promise.all([interstellarData, adamsFamilyData, duneData, jokerData, halloweenKillsData])
				.then((responses) => Promise.all(responses.map((response) => response.json())))
				.then((parsedMovies) => {
					console.log(parsedMovies)
					


			// recommendedMovie for loop
					var card = '';
					for(var i = 0; i < parsedMovies.length; i++) {
						// iterate through parsedMovies to create card deck for recommended movies section
						let imdbRating = parsedMovies[i].imdbRating
						let title = parsedMovies[i].Title
						let director = parsedMovies[i].Director
						let rated = parsedMovies[i].Rated
						let releasedYear = parsedMovies[i].Year
						let moviePoster = parsedMovies[i].Poster

						card += `
							<div class="card-deck">
								<div class="card m-5 bg-dark text-white">
								<img src="${moviePoster}" width="300" height="445" alt="" class="card-top">
								<div class="card-body">
									<ul class="list-unstyled pl-0">
									<li>
										<p class="card-text d-flex align-items-center justify-content-start">
											<img src="images/star.png" class="mr-1" width="16" height="16" alt="star"> ${imdbRating}
										</p>
									</li>
									<li>
										<p class="card-text" style="font-weight: bold">
											${title}
										</p>
									</li>
										
									<li>
										<p class="card-text">
											Rated: ${rated}
										</p>
									</li>
									<li>
										<p class="card-text">
											Directed by: ${director}
										</p>
									</li>
									<li>
										<p class="card-text">
											Year Realeased: ${releasedYear}
										</p>
									</li>
									</ul>
										
									
								</div>
								</div>
								</div>
							
						
						
						`
					}
					$('.recommendedMovies').html(card)


					//Creating add a movie click event listener
					$('#submit-movie-button').click(function(event){
						event.preventDefault();

					var userMovie = $('#movie-title').val()

					//Taking users input for movie search
						fetch(`https://www.omdbapi.com/?t=${userMovie}/&apikey=e2480ab6`)
							.then((response)=> console.log(response.json()))
							.then((addedMovie)=> {
								console.log(addedMovie);
							})

					})





				})
		}, 1500)
		
		
	})
	
})