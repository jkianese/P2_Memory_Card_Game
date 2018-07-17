/*, 
 * Create a list that holds all of your cards
 */

 const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
        "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", 
        "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", 
        "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

 function createCards(card) {
     return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 };       

const deck = document.querySelector('.deck'); 
const numMoves = document.querySelector('.moves');
// const stars = document.querySelector('.stars');
let moves = []; 
let openCards = [];


// variables from Walkthrough
let = toggledCards = []; 
let clockOff = true;
let time = 0; 
let clockId; 
let matched = 0;


let timer = {
    seconds: 0,
    minutes: 0,
    clearTime: -1
};


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() { 
        
    let cardHTML = shuffle(cards).map(function(card) {
        return createCards(card); 
    });
    moves = 0;
    numMoves.innerText = moves; 
    deck.innerHTML = (cardHTML.join('')); 
 }
startGame();
flipCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function flipCards() { 
    
    let allCards = document.querySelectorAll('.card');
        allCards.forEach(function(card) { 
            card.addEventListener('click', function(event) {  
                const clickCard = event.target;  
                if (!card.classList.contains('open') && 
                !card.classList.contains('show') && 
                !card.classList.contains('match') &&
                (twoCardsFlipped(clickCard))) {
                    openCards.push(this);
                        if (clockOff) {
                            startClock(); 
                            clockOff = false; 
                        }
                            card.classList.add('open', 'show'); 
                                if (openCards.length === 2) {
                                    checkForMatch(clickCard);
                                    updateScore(); 
                                }
                }    
            });
        });
}    

function checkForMatch() {
     
    if (openCards[0].dataset.card == openCards[1].dataset.card) {
        openCards[0].classList.add('match');
        openCards[0].classList.add('open');
        openCards[0].classList.add('show');

        openCards[1].classList.add('match');
        openCards[1].classList.add('open');
        openCards[1].classList.add('show');

        openCards = [];       
            
    } else {
        // no match
        setTimeout(function() {
            openCards.forEach(function(card) {
                card.classList.remove('open', 'show');
                    return false;  
                }); 
            openCards = [];
            }, 1000);
        }     
moves += 1; 
numMoves.innerText = moves;
} 
// Prevent 3rd card from being flipped
function twoCardsFlipped(clickCard) {
    return (
        clickCard.classList.contains('card') &&
        !clickCard.classList.contains('match') &&
        openCards.length < 2 &&
        !openCards.includes(clickCard)
    );      
}

// Score, Stars, Timer, Modal 
function updateScore () {
    if (moves === 12 || moves === 20) {
        // console.log("you have made " + moves + " moves. You lose one star!")
        removeStar(); 
    }
}

function removeStar() {
    Stars = document.querySelectorAll('.stars li'); 
    for (star of Stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
// clock

function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;
    
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}
