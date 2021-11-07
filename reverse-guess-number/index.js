// Interval to be guessed from
let initialMinimum = 1;
let initialMaximum = 100;

// Guesses a number from the interval minimum (inclusive), maximum (inclusive)
function guessNumber(minimum, maximum) {
	return Math.floor((minimum + maximum) / 2);
}

window.addEventListener("load", function () {
	let counter; // number of guesses
	let currentMinimum; // lowet number to guess next
	let currentMaximum; // highest number to guess next
	let currentGuess; // current guess

	// Get references to needed HTML elements
	let lowerBoundElement = document.querySelector(".lowerBound");
	let upperBoundElement = document.querySelector(".upperBound");
	let guessButtonSection = document.querySelector(".guessButtonSection");
	let guessButton = document.querySelector(".guessButton");
	let guessedNumberSection = document.querySelector(".guessedNumberSection");
	let guessedNumberElement = document.querySelector(".guessedNumber");
	let controlSection = document.querySelector(".controlSection");
	let lowerButton = document.querySelector(".lowerButton");
	let higherButton = document.querySelector(".higherButton");
	let bingoButton = document.querySelector(".bingoButton");

	// ----------------------------------------

	// Resets everything to the initial state
	function resetGame() {
		// Render initial bounds information
		lowerBoundElement.innerHTML = initialMinimum;
		upperBoundElement.innerHTML = initialMaximum;

		// Show and hide appropriate sections
		guessButtonSection.style.display = "";
		guessedNumberSection.style.display = "none";
		controlSection.style.display = "none";

		// Reset variables
		counter = 0;
		currentMinimum = initialMinimum;
		currentMaximum = initialMaximum;
	}

	// Guesses the next number and shows it to the user
	function guessAndRedraw() {
		console.log(`Currently, I'm guessing from this interval: ${currentMinimum} <= ? <= ${currentMaximum}`);
		currentGuess = guessNumber(currentMinimum, currentMaximum);
		console.log(`My guess is: ${currentGuess}`);
		guessedNumberElement.innerHTML = currentGuess;
		counter = counter + 1;
	}

	// ----------------------------------------

	resetGame();

	// Click listener for the "guess" button
	guessButton.addEventListener("click", function () {
		// Hide the "guess button" section
		guessButtonSection.style.display = "none";
		// Show the other sections
		guessedNumberSection.style.display = "";
		controlSection.style.display = "";
		// Make the first guess
		guessAndRedraw();
	});

	// Click listener for the "lower" button
	lowerButton.addEventListener("click", function () {
		if (currentGuess !== currentMinimum) {
			// Update the current maximum and make another guess
			currentMaximum = currentGuess - 1;
			guessAndRedraw();
		} else {
			alert("Cheater!");
		}
	});

	// Click listener for the "higher" button
	higherButton.addEventListener("click", function () {
		if (currentGuess !== currentMaximum) {
			// Update the current minimum and make another guess
			currentMinimum = currentGuess + 1;
			guessAndRedraw();
		} else {
			alert("Cheater!");
		}
	});

	// Click listener for the "bingo" button
	bingoButton.addEventListener("click", function () {
		alert(`I needed ${counter} guesses to win.`);
		resetGame();
	});
});
