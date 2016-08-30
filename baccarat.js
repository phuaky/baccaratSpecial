var deck = [] //  Start with blank deck
for (var i = 1; i < 53; i++) { // Cards into deck
  deck.push(i)
}
//  Shuffle cards and store in array
var shuffledDeck = deck.sort(function (a, b) {
  if (Math.random() < 0.5) {
    return -1
  } else {
    return 1
  }
})
// console.log("------------STARTING DECK " + shuffledDeck.join(' '))

function deal (ghost) {
  var takeTopCard = shuffledDeck.shift()
  if (ghost.numberOfCardsOnHand === 0) {
    ghost['card1'] = takeTopCard
    ghost.numberOfCardsOnHand++
  } else if (ghost.numberOfCardsOnHand === 1) {
    ghost['card2'] = takeTopCard
    ghost.numberOfCardsOnHand++
  } else if (ghost.numberOfCardsOnHand === 2) {
    ghost['card3'] = takeTopCard
    ghost.numberOfCardsOnHand++
  }
}
//  BANKER VS PLAYER
var player = {
  type: 'player',
  numberOfCardsOnHand: 0,
  sum: 0
}
var banker = {
  type: 'banker',
  numberOfCardsOnHand: 0,
  sum: 0
}


// // ------Assign value & suit to index in array------
function getValue (zerba) {
  if (zerba % 13 >= 10) {
    return 0
  } else {
    return zerba % 13
  }
}

// // ------GET SUIT OF CARDS ------
function getSuit (zebra) {
  var suit = Math.floor((zebra - 1) / 13)
  if (suit === 0) {
    return 'Diamonds'
  } else if (suit === 1) {
    return 'Clubs'
  } else if (suit === 2) {
    return 'Hearts'
  } else if (suit === 3) {
    return 'Spades'
  }
}
// ------GET PICTURE CARDS ------
function getFace () {
  if (card % 13 == 11) {
    return 'Jack'
  } else if (card % 13 == 12) {
    return 'Queen'
  } else if (card % 13 == 0) {
    return 'King'
  } else {
    return "nil"
  }
}

// Sum of 2 cards
function score (INPUT) {
  var card1 = INPUT[Object.keys(INPUT)[2]] // Find card from player
  var card2 = INPUT[Object.keys(INPUT)[3]] // Find card from player
  var asd = getValue(card1) + getValue(card2)
  var n = asd.toString()
  var singleValue = n.charAt(n.length - 1)
  console.log('Your total hand value is ' + singleValue + ' and ')
  return singleValue
}
// Suits player is holding
function suitty (INPUT) {
  var card1 = INPUT[Object.keys(INPUT)[2]] // Find card from player
  var card2 = INPUT[Object.keys(INPUT)[3]]// Find card from player
  if (getSuit(card1) === getSuit(card2)) { // Identify suit
    console.log('you have ' + getSuit(card1) + ' pair')
  } else {
    console.log('you have ' + getSuit(card1) + ' and ' + getSuit(card2))
  }
}

// Check if player has PICTURE
function picture (INPUT) {
  var card1 = INPUT[Object.keys(INPUT)[2]] // Find card from player
  var card2 = INPUT[Object.keys(INPUT)[3]] // Find card from player

}

// -----GGGGAME STARTTTTTTTT-----
deal(banker); deal(player); //First deal
deal(banker); deal(player); //Second deal
console.log(banker);
score(banker); suitty(banker);
console.log(player)
score(player); suitty(player);
// console.log("----AFTER DEALING " + shuffledDeck.join(' '))



// -----CHECK WINNER-----
function compareValue () {
  if (score(banker) > score(player)) {
    console.log("BANKER WINS!");
    return "BANKER WINS!"
  } else if (score(player) > score(banker)) {
    console.log("PLAYER WINS!");
    return "PLAYER WINS!"
  } else {
    console.log("It's a DRAW");
    return "It's a DRAW"
  }
}

compareValue()
