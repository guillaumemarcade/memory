const cardsArray = [
  {
    "name": "pig",
    "img": "img/pig.webp"
  },
  {
    "name": "sheep",
    "img": "img/sheep.webp"
  },
  {
    "name": "chicken",
    "img": "img/chicken.webp"
  },
  {
    "name": "cow",
    "img": "img/cow.webp"
  },
  {
    "name": "horse",
    "img": "img/horse.webp"
  },
  {
    "name": "beaver",
    "img": "img/beaver.webp"
  },
  {
    "name": "rabbit",
    "img": "img/rabbit.webp"
  },
  {
    "name": "fox",
    "img": "img/fox.webp"
  },
  {
    "name": "racoon",
    "img": "img/racoon.webp"
  },
  {
    "name": "wolf",
    "img": "img/wolf.webp"
  },
  {
    "name": "bear",
    "img": "img/bear.webp"
  },
  {
    "name": "squirrel",
    "img": "img/squirrel.webp"
  }
];

function createImageCardsArray(cardsArray) {
  return cardsArray.map(card => ({
    ...card,
    type: "image"
  }));
}

function createTextCardsArray(cardsArray) {
  return cardsArray.map(card => ({
    ...card,
    type: "text"
  }));
}

const imageCardsArray = createImageCardsArray(cardsArray);
const textCardsArray = createTextCardsArray(cardsArray);

const gameGrid = imageCardsArray
  .concat(textCardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let score = 0;
let attemptsCount = 0;
let lastMatch = "";

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img, type } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  if (type == 'text') back.textContent = name;
  else back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const updateScoreBoard = () => {
  if (score == cardsArray.length) document.body.classList.add("success");
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.textContent = score + " / " + attemptsCount;

  const gamificationDiv = document.getElementById('gamification');
  const image = gamificationDiv.querySelector('img');

  // Change the image source
  if (image && lastMatch != "") {
    console.log(`img/${lastMatch}0.webp`);
      image.src = `img/${lastMatch}0.webp`; // Replace with your new image URL
      console.log(image.src);
  }
};

const match = () => {
  score++;
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.textContent = score;
  const selected = document.querySelectorAll('.selected');
  lastMatch = selected[0].dataset.name;
  console.log("lastMatch="+lastMatch);
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  attemptsCount++;
  updateScoreBoard();

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      const audioPlayer = document.getElementById(firstGuess);
      audioPlayer.play();
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      const audioPlayer = document.getElementById(secondGuess);
      audioPlayer.play();
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
