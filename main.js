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
					
					// Delete unnecessary movies
					function deleteMovie(id) {
						let options = {
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json'
							}
						}
						fetch(`https://adamina-jackie-cinema.glitch.me/movies/${id}`, options)
							.then((response) => response.json())
					}
					deleteMovie(5)
					deleteMovie(6)
					deleteMovie(7)
					deleteMovie(8)
					deleteMovie(9)
					deleteMovie(10)
					deleteMovie(11)
					deleteMovie(12)
					deleteMovie(13)
					deleteMovie(14)
					deleteMovie(15)
					deleteMovie(16)
					
					var card = '';
					for (let i = 0; i < movies.length; i++) {
						
						let title = movies[i].title;
						let director = movies[i].director;
						let rated = movies[i].rating;
						let releaseYear = movies[i].year;
						let moviePoster = movies[i].poster;
						
						card += `
						<div class="card-deck">
							<div class="card m-5 bg-dark text-white">
							<img src="${moviePoster}" width="300" height="445" alt="" class="card-top">
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
								</div>
							</div>
						</div>
					`
					}
					
					$('#movieWatchlist').html(card)
				})
				.then(function () {
					$('#submit-movie-button').click(function (event) {
						var userMovie = $('#movie-title').val()
						event.preventDefault();
						fetch(`https://www.omdbapi.com/?t=${userMovie}/&apikey=e2480ab6`)
							.then((response) => response.json())
							.then((addedMovie) => {
								let postTheseMovies = {};
								postTheseMovies.rating = addedMovie.imdbRating;
								postTheseMovies.title = addedMovie.Title;
								postTheseMovies.director = addedMovie.Director;
								postTheseMovies.year = addedMovie.Year;
								postTheseMovies.poster = addedMovie.Poster;
								console.log(postTheseMovies)
								
								let options = {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify(postTheseMovies),
								};
								fetch('https://adamina-jackie-cinema.glitch.me/movies', options)
									.then((response) => console.log(response.json()))
									
							})
						$('#movieWatchlist').location.reload();
							
					})
				})


			
			//const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
			// const url = '/posts';
			// const options = {
			//     method: 'POST',
			//     headers: {
			//         'Content-Type': 'application/json',
			//     },
			//     body: JSON.stringify(blogPost),
			// };
			// fetch(url, options)
			//     .then(/* post was created successfully */)
			//     .catch(/* handle errors */);
			
			
			
			
			
			
			
			
			

			// API request for recommended movie section
			Promise.all([interstellarData, duneData, jokerData, halloweenKillsData])
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

					
					// creating watchlist from database information
					
					
					
					// //Creating add a movie click event listener
					// $('#submit-movie-button').click(function(event){
					// 	event.preventDefault();
					//
					// var userMovie = $('#movie-title').val()
					//
					//
					// //Taking users input for movie search
					// 	fetch(`https://www.omdbapi.com/?t=${userMovie}/&apikey=e2480ab6`)
					// 		.then((response)=> response.json())
					// 		.then((addedMovie)=> {
					// 			console.log(addedMovie);
					// 			addedMovie.id = 7
					// 			console.log(addedMovie)
					//
					// 			var card = ''
					// 			let imdbRating = addedMovie.imdbRating
					// 			let title = addedMovie.Title
					// 			let director = addedMovie.Director
					// 			let rated = addedMovie.Rated
					// 			let releasedYear = addedMovie.Year
					// 			let moviePoster = addedMovie.Poster
					//
					// 			card += `
					// 			<div class="card m-5 bg-dark text-white">
					// 				<img src="${moviePoster}" width="300" height="445" alt="" class="card-top">
					// 				<div class="card-body">
					// 					<ul class="list-unstyled pl-0">
					// 						<li>
					// 							<p class="card-text d-flex align-items-center justify-content-start">
					// 								<img src="images/star.png" class="mr-1" width="16" height="16" alt="star"> ${imdbRating}
					// 							</p>
					// 						</li>
					// 						<li>
					// 							<p class="card-text" style="font-weight: bold">
					// 								${title}
					// 							</p>
					// 						</li>
					//
					// 						<li>
					// 							<p class="card-text">
					// 								Rated: ${rated}
					// 							</p>
					// 						</li>
					// 						<li>
					// 							<p class="card-text">
					// 								Directed by: ${director}
					// 							</p>
					// 						</li>
					// 						<li>
					// 							<p class="card-text">
					// 								Year Realeased: ${releasedYear}
					// 							</p>
					// 						</li>
					// 					</ul>
					// 				</div>
					// 			</div>
					// 			`
					// 			$("#movieWatchlist").html(card)
					// 		})
					//
					// })
					
				})
		}, 1500)
		
		
	})
	
})