let omdbKey = 'e2480ab6'

let getGlitchMovies = fetch('https://adamina-jackie-cinema.glitch.me/movies');
$('#myModal').on('shown.bs.modal', function () {
	$('#myInput').trigger('focus')
})

// Recommended movies variables
let interstellarData = fetch('https://www.omdbapi.com/?i=tt0816692&apikey=e2480ab6')
let adamsFamilyData = fetch('https://www.omdbapi.com/?i=tt11125620&apikey=e2480ab6')
let duneData = fetch('https://www.omdbapi.com/?i=tt1160419&apikey=e2480ab6')
let jokerData = fetch('https://www.omdbapi.com/?i=tt7286456&apikey=e2480ab6')
let halloweenKillsData = fetch('https://www.omdbapi.com/?i=tt10665338&apikey=e2480ab6')

// Render new movies function for adding and deleting
function renderNewMovies() {
	fetch('https://adamina-jackie-cinema.glitch.me/movies')
		.then((response) => response.json())
		.then((movies) => {
			
			var card = '';
			for (let i = 0; i < movies.length; i++) {
				
				let title = movies[i].title;
				let director = movies[i].director;
				let rated = movies[i].rating;
				let releaseYear = movies[i].year;
				let moviePoster = movies[i].poster;
				let id = movies[i].id;
				// console.log(movieID)
				
				card += `
						<div class="card-deck">
							<div class="card m-5 bg-dark text-white">
							<img src="${moviePoster}" alt="poster" class="card-top">
								<div class="card-body">
									<ul class="list-unstyled pl-0">
									<li>
										<p class="card-text d-flex align-items-center justify-content-start">
											<img src="images/star.png" class="mr-1" width="16" height="16" alt="star"> ${rated}
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
											Year Realeased: ${releaseYear}
										</p>
									</li>
									</ul>
									<div class="container d-flex justify-content-between">
										<div type="submit" class="delete btn btn-sm btn-warning" data-id="${id}"><i class="bi bi-trash-fill"></i></div>
										<button type="submit" class="edit btn btn-sm btn-warning" data-toggle="modal" data-target="#exampleModal" data-id="${id}">
										  <i class="bi bi-pencil-square"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						
						<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div class="modal-dialog">
						    <div class="modal-content">
						      <div class="modal-header">
						        <h5 class="modal-title" id="exampleModalLabel">Edit Rating</h5>
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div class="modal-body">
						        <form action="">
									<div class="form-group">
										<label for="movie-rating">Your Rating</label>
										<input type="text" class="form-control" id="movie-rating" placeholder="Enter a rating 1-10.."> <!--Input for Rating-->
									</div>
								</form>
						      </div>
						      <div class="modal-footer">
						        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
						        <button type="submit" class="edit-rating btn btn-success" data-dismiss="modal" data-id="${id}">Save changes</button>
						      </div>
						    </div>
						  </div>
						</div>
					`
				
			}
			// console.log(card)
			$('#movieWatchlist').html(card)
			$('.delete').click(function () {
				var id = $(this).data('id')
				console.log(id)
				deleteMovie(id)
			})
			$('.edit-rating').click(function () {
				let ratingObj = {};
				let id = $(this).attr("data-id")
				ratingObj.rating = $('#movie-rating').val()
				editRating(ratingObj)
			})
		})
}

// delete movies function
function deleteMovie(id) {
	let options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	fetch(`https://adamina-jackie-cinema.glitch.me/movies/${id}`, options)
		.then((response) => console.log(response.json()))
	
	setTimeout(function(){
		
		renderNewMovies()}, 500)
}

// Still working on edit rating functionality
function editRating(id, ratingObj) {
	let options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(ratingObj)
	}
	fetch(`https://adamina-jackie-cinema.glitch.me/movies/${id}`, options)
		.then((response) => response.json())
		.then((patch) => console.log(patch))
	setTimeout(function(){
		
		renderNewMovies()}, 500)
}

// Code to run when document is ready
$(document).ready(function () {
	$('#add-movie-img').css('visibility', 'hidden')
	$('#add-movie-button').css('visibility', 'hidden')
	$('#staff-selection-header').css('display', 'none')
	$('#watch-list-header').css('display', 'none')
	$('.jumbotron').css('visibility', 'hidden')
	
	// clicking enter starts takes you to the movies
	$('#enter').click(function (event) {
		event.preventDefault();
		$('body').css('background-image', 'none') // removing landing page content after click event
		$('#enter').css('display', 'none') // removing landing page content after click event
		$('#loading').css('visibility', 'visible') // displaying "loading" animation after click event
		
		// Setting a timeout handler for fetchAPI request to make page use the "loading" animation
		setTimeout(function () {
			
			// intial request for glitch movie database
			getGlitchMovies
				.then((response) => response.json())
				.then((movies) => {
					$('#loading').css('display', 'none') // removing "loading" animation after promise has been fulfilled
					console.log(movies)
					
					// making movie database content visible after exiting the "loading" animation
					$('#add-movie-button').css('visibility', 'visible')
					$('#add-movie-img').css('visibility', 'visible')
					$('#staff-selection-header').css('display', 'contents')
					$('#watch-list-header').css('display', 'contents')
					$('.jumbotron').css('visibility', 'visible')
					$('body').css('background-color', 'black')
					$('h1').css('color', 'white').css('text-align', 'center')
					
					// for loop to render movie database on screen
					var card = '';
					for (let i = 0; i < movies.length; i++) {
						
						let title = movies[i].title;
						let director = movies[i].director;
						let rated = movies[i].rating;
						let releaseYear = movies[i].year;
						let moviePoster = movies[i].poster;
						let id = movies[i].id;
						// console.log(movieID)
						
						card += `
						<div class="card-deck">
							<div class="card m-5 bg-dark text-white">
							<img src="${moviePoster}" alt="poster" class="card-top">
								<div class="card-body">
									<ul class="list-unstyled pl-0">
									<li>
										<p class="card-text d-flex align-items-center justify-content-start">
											<img src="images/star.png" class="mr-1" width="16" height="16" alt="star"> ${rated}
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
											Year Realeased: ${releaseYear}
										</p>
									</li>
									</ul>
									<div class="container d-flex justify-content-between">
										<div type="submit" class="delete btn btn-sm btn-warning" data-id="${id}"><i class="bi bi-trash-fill"></i></div>
										<button type="button" class="edit btn btn-sm btn-warning" data-toggle="modal" data-target="#exampleModal" data-id="${id}">
										  <i class="bi bi-pencil-square"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						
						<!--modal for edit rating button-->
						<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div class="modal-dialog">
						    <div class="modal-content">
						      <div class="modal-header">
						        <h5 class="modal-title" id="exampleModalLabel">Edit Rating</h5>
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div class="modal-body">
						      <form action="">
									<div class="form-group">
										<label for="movie-rating">Your Rating</label>
										<input type="text" class="form-control" id="movie-rating" placeholder="Enter a rating 1-10..">
									</div>
								</form>
						      </div>
						      <div class="modal-footer">
						        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
						        <button type="button" class="edit-rating btn btn-success" data-dismiss="modal" data-id="${id}">Save changes</button>
						      </div>
						    </div>
						  </div>
						</div>
					`
					
					}
					$('#movieWatchlist').html(card)
					
					// delete movie from watchlist click event
					$('.delete').click(function () {
						var id = $(this).data('id')
						console.log(id)
						deleteMovie(id)
					})
					
					// edit movie rating from watchlist click event
					$('.edit-rating').click(function () {
						let ratingObj = {};
						var id = $(this).data('id')
						ratingObj.rating = $('#movie-rating').val()
						console.log(ratingObj)
						console.log(id)
						editRating(id, ratingObj)
					})
					
				
				})
				// add movie section
				.then(function () {
					$('#submit-movie-button').click(function (event) {
						event.preventDefault();
						// used omdb api to get movie data from imdb by using the user input
						var userMovie = $('#movie-title').val()
						fetch(`https://www.omdbapi.com/?t=${userMovie}/&apikey=e2480ab6`)
							.then((response) => response.json())
							.then((addedMovie) => {
								console.log(userMovie)
								console.log(addedMovie)
								
								// put data from user search into an object to post to glitch server movies database
								let postTheseMovies = {};
								postTheseMovies.rating = addedMovie.imdbRating;
								postTheseMovies.title = addedMovie.Title;
								postTheseMovies.director = addedMovie.Director;
								postTheseMovies.year = addedMovie.Year;
								postTheseMovies.poster = addedMovie.Poster;
								console.log(postTheseMovies)
								
								// 'POST'ing object to glitch movies to render on website
								let options = {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify(postTheseMovies),
								};
								
								fetch('https://adamina-jackie-cinema.glitch.me/movies', options)
								
								// used timeout function to make movies update on screen without refreshing the page
								setTimeout(function () {
									
									renderNewMovies()
								}, 600)
								
								
							})
						
					})
				})
			// API request for staff selection movie section
			Promise.all([interstellarData, duneData, jokerData, adamsFamilyData, halloweenKillsData])
				.then((responses) => Promise.all(responses.map((response) => response.json())))
				.then((parsedMovies) => {
					console.log(parsedMovies)
					
			// recommendedMovie for loop to render staff selection movie cards
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
								<img src="${moviePoster}" alt="poster" class="card-top">
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
					$('#recommendedMovies').html(card)
					
				})
				}, 1000)
		
		
	})
	
})