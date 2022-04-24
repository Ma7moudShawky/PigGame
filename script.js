'use strict';
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const globalScore0 = document.getElementById('score--0');
const globalScore1 = document.getElementById('score--1');
const dicePic = document.querySelector('.dice');
let currentScore, score, activePlayer, dice;
init();
function init() {
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  globalScore0.textContent = 0;
  globalScore1.textContent = 0;

  btnHold.disabled = false;
  btnRoll.disabled = false;

  btnRoll.style.cursor = 'Pointer';
  btnHold.style.cursor = 'Pointer';

  dicePic.classList.add('hidden');

  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;

  document
    .querySelector('.player--1')
    .classList.remove('player--winner', 'player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
}
// Roll Button
btnRoll.addEventListener('click', function () {
  dice = Math.trunc(Math.random() * 6 + 1);
  dicePic.classList.remove('hidden');
  dicePic.src = `dice-${dice}.png`;
  if (dice === 1) {
    switchPlayer();
  } else {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
});

//Switch Player
function switchPlayer() {
  console.log(activePlayer);
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// Hold Button
btnHold.addEventListener('click', function () {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 10) {
    dicePic.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.replace('player--active', 'player--winner');
    btnRoll.disabled = true;
    btnRoll.style.cursor = 'not-allowed';
    btnHold.disabled = true;
    btnHold.style.cursor = 'not-allowed';
  } else {
    switchPlayer();
  }
});

// New Button
btnNew.addEventListener('click', init);
