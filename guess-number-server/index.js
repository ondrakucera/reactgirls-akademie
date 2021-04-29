const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

const games = {};

const createNewGame = () => ({
	id: Math.floor(Math.random() * 1000000),
	secretNumber: Math.floor(Math.random() * 101),
	createdAt: new Date().toISOString(),
	guesses: []
});

app.post('/games', (request, response) => {
	const game = createNewGame();
	if (games[game.id]) {
		throw new Error("Oops, we probably should have a better ID generator.");
	}
	games[game.id] = game;
	response.send(200, game.id);
});

app.post('/games/:id/guess', (request, response, next) => {
	const game = games[request.params.id];
	if (game) {
		const guessedNumber = request.body.secretNumber;
		game.guesses.push(guessedNumber);
		let resultCode;
		if (game.secretNumber === guessedNumber) {
			resultCode = "BINGO";
		} else if (game.secretNumber > guessedNumber) {
			resultCode = "TRY_HIGHER";
		} else {
			resultCode = "TRY_LOWER";
		}
		console.log(game);
		response.send({result: resultCode});
	} else {
		next();
	}
});

app.use(function (request, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	next();
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use((error, request, response, next) => {
	// whatever you want here, feel free to populate
	// properties on `err` to treat it differently in here.
	response.status(error.status || 500);
	response.send({error: error.message});
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use((request, response) => {
	response.status(404);
	response.send({error: "Not found."});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})
