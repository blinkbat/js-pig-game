/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// select current score element (setter)
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>';

// read current score from dom (getter)
//var currentScore = document.querySelector('#current-' + activePlayer).textContent;

// create vars
var scores, roundScore, activePlayer, winningScore, prevRoll;

// set winning default
winningScore = 100;

//create funcs
function nextTurn() {
	//clear and end turn
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';

	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = roundScore;

	//ternary operator - ? = if, : = else
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	//toggle active classes
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

}

function clearBoard() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;

	// hide dice on load
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';

	//set init values. don't need # here because of getElementById
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	//set P1 active
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

clearBoard();

// ROLL DICE LISTENER
// anonymous callback func is called by the eventListener func
document.querySelector('.btn-roll').addEventListener('click', function() {
	// random number
	var die1 = Math.floor( Math.random() * 6 ) + 1;
	var die2 = Math.floor( Math.random() * 6 ) + 1;
	var dice = die1 + die2;

	// display result
	var die1DOM = document.querySelector('.dice');
	die1DOM.style.display = 'block';
	// change dice img
	die1DOM.src = 'dice-' + die1 + '.png';

	var die2DOM = document.querySelector('.dice2');
	die2DOM.style.display = 'block';
	// change dice img
	die2DOM.src = 'dice-' + die2 + '.png';

	// update player score IF two 6s in a row
	if (dice == 6 && prevRoll == 6) {
		scores[activePlayer] = 0;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		alert("Two sixes in a row = score flushed!");
		nextTurn();

	// update round score if roll over 1
	} else if (die1 !== 1 && die2 !== 1) {
		//add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		prevRoll = dice;

	} else {
		alert("Rolled a one. :(");
		nextTurn();
	}

});

// HOLD BUTTON LISTENER
document.querySelector('.btn-hold').addEventListener('click', function() {
	//add current score to global
	scores[activePlayer] += roundScore;
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	//check if player has won
	if (scores[activePlayer] >= winningScore) {
		alert(":: Player " + (activePlayer + 1) + " wins. ::");
		clearBoard();
		
	} else {
		nextTurn();
	}


});

// NEW BOARD LISTENER
document.querySelector('.btn-new').addEventListener('click', clearBoard);

// SET SCORE LISTENER
document.querySelector('.panel-submit').addEventListener('click', function() {
	winningScore = document.querySelector('.panel-score').value;
	alert("New winning score: " + winningScore);

});


