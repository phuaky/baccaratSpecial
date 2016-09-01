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

// -----DEAL CARDS-----分牌！！！
function deal (ghost) {
  var takeTopCard = shuffledDeck.shift()
  ghost.cards.push(takeTopCard)
}
//  BANKER VS PLAYER
var player = {
  type: 'player',
  cards: []
}
var banker = {
  type: 'banker',
  cards: []
}

// ------Assign value & suit to index in array------
function getValue (zerba) {
  if (zerba % 13 >= 10) {
    return 0
  } else {
    return zerba % 13
  }
}
// ------GET SUIT OF CARDS ------
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
// ------GET PICTURE & VALUE CARDS ------
function getFace (zabra) {
  if (zabra % 13 === 11) {
    return 'Jack'
  } else if (zabra % 13 === 12) {
    return 'Queen'
  } else if (zabra % 13 === 0) {
    return 'King'
  } else if (zabra % 13 === 1) {
    return 'Ace'
  } else {
    return zabra % 13
  }
}
// ------FIND PICTURE------
function getPic (zabra) {
  var abra = zabra % 13
  if (abra === 11) {
    return 1
  } else if (abra === 12) {
    return 2
  } else if (abra === 0) {
    return 12
  } else
    return -1
}
// -------CHECK FOR STRAIGHTS -------
// function getStraights (zeebra) {
//   var zee = zeebra % 13
// }

// ----------COMBINE FACE AND SUIT-----------
function getCard (card) {
  var face = getFace(card)
  var suit = getSuit(card)
  return face + ' ' + suit
}

// DEAL TO HTML
function dth (input) {
  var hand_array = []
  for (var i = 0; i < input.cards.length; i++) {
    hand_array.push(getCard(input.cards[i]))
  }
  return hand_array
}

// Sum of 2 cards or 3 cards
function score (input) {
  var card1 = input.cards[0]
  var card2 = input.cards[1]
  var card3 = input.cards[2]
  var twoCardsValue = getValue(card1) + getValue(card2)
  var threeCardsValue = getValue(card1) + getValue(card2) + getValue(card3)
  if (input.cards.length === 2) {
    var n = twoCardsValue.toString()
    var singleValue1 = n.charAt(n.length - 1)
    return singleValue1
  } else if (input.cards.length === 3) {
    var m = threeCardsValue.toString()
    var singleValue2 = m.charAt(m.length - 1)
    return singleValue2
  }
}
// Suits player is holding, can check 3 cards
function suitty (input) {
  var card1 = input.cards[0]
  var card2 = input.cards[1]
  var card3 = input.cards[2]
  if (input.cards.length === 2) {
    if (getSuit(card1) === getSuit(card2)) {
      console.log('you have 2 ' + getSuit(card1))
      return 200
    } else {
      console.log('you have ' + getSuit(card1) + ' and ' + getSuit(card2))
    }
  } else if (input.cards.length === 3) {
    if (getSuit(card1) === getSuit(card2) && getSuit(card2) === getSuit(card3)) {
      console.log('you have 3 ' + getSuit(card3))
      return 300
    } else {
      console.log('you have no same suits')
    }
  }
}

var dealAlr = 0
// -----GGGGAME STARTTTTTTTT-----
document.getElementById('deal').addEventListener('click', function () {
  if (dealAlr === 0) {
    deal(player)
    deal(banker)

    deal(player)
    deal(banker)

    // deal(player)
    // deal(banker)

    showCardInHTML(player)
    showCardInHTML(banker)

    pHandType.text(natural(player))
    bHandType.text(natural(banker))

    pValue.text(checkValue(player))
    bValue.text(checkValue(banker))

    pMultiplier.text(checkTwoCardsMultiplier(player))
    bMultiplier.text(checkTwoCardsMultiplier(banker))

    console.log("player's score " + score(player))
    console.log("banker's scrore " + score(banker))

    dealAlr++
  }
})

// Player Draw
var dealCounter = 0
document.getElementById('pDraw').addEventListener('click', function () {
  if (dealCounter === 0) {
    deal(player)
    var div5 = document.getElementById('player3')
    var cardvz = dth(player)
    div5.textContent = cardvz[2]
    dealCounter++
  }
  pValue.text(checkValue(player))
  pMultiplier.text(checkThreeCardsMultiplier(player))
})

var counterDeal = 0
$('#bDraw').on('click', function () {
  if (counterDeal === 0) {
    deal(banker)
    var div6 = document.getElementById('banker3')
    var cardvz = dth(banker)
    div6.textContent = cardvz[2]
    counterDeal++
  }
  bValue.text(checkValue(banker))
  bMultiplier.text(checkThreeCardsMultiplier(banker))
})

var display = $('#display')

var pHandType = $('#playerHandType')
var pValue = $('#playerValue')
var pMultiplier = $('#playerMultiplier')

var bHandType = $('#bankerHandType')
var bValue = $('#bankerValue')
var bMultiplier = $('#bankerMultiplier')

document.getElementById('fight').addEventListener('click', function () {
    display.text(findWinner())
})

// ----- CHECK MULTIPLIER -----
function checkTwoCardsMultiplier (person) {
  if (natural(person)) {
    if (pair(person)) {
      return '2x'
    } else if (suitSuit(person)) {
      return '2x'
    }
    return '1x'
    }
  if (pair(person)) {
    return '2x'
  } else if (suitSuit(person)) {
    return '2x'
  }
}

function checkThreeCardsMultiplier (person) {
  if (trips(person)) {
    return '5x'
  }  else if (picCube(person)) {
    return '3x'
  } else if (suitCube(person)) {
    return '3x'
  } else{
    return 'Multiplier'
  }
}

// ----- FIND VALUE -----
function checkValue (person) {
  return score(person)
}

// -----FIND WINNER----- only 2 cards.
function findWinner () {
  if (pair(player) && pair(banker)) { // CHECK FOR PAIR
    return 'BOTH HAVE PAIRS'
  } else if (pair(player)) {
    return 'PLAYER HAS PAIR'
  } else if (pair(banker)) {
    return 'BANKER HAS PAIR'
  }
  if (suitSuit(player) && suitSuit(banker)) { // CHECK FOR SUITED
    return 'BOTH HAVE SUITED'
  } else if (suitSuit(player)) {
    return 'PLAYER HAS SUITED'
  } else if (suitSuit(banker)) {
    return 'BANKER HAS SUITED'
  }
  if (suitCube(player) && suitCube(banker)) { // CHECK FOR 3 SUITED
    return 'BOTH HAVE 3 SUITED'
  } else if (suitCube(player)) {
    return 'PLAYER HAS 3 SUITED'
  } else if (suitCube(banker)) {
    return 'BANKER HAS 3 SUITED'
  }
  if (picCube(player) && picCube(banker)) { // CHECK FOR 3 PICTURES
    return 'BOTH HAVE 3 PICTURES'
  } else if (picCube(player)) {
    return 'PLAYER HAS 3 PICTURES'
  } else if (picCube(banker)) {
    return 'BANKER HAS 3 PICTURES'
  }
  if (trips(player) && trips(banker)) { // CHECK FOR TRIPLE
    return 'BOTH HAVE TRIPLE'
  } else if (trips(player)) {
    return 'PLAYER HAS TRIPLE'
  } else if (trips(banker)) {
    return 'BANKER HAS TRIPLE'
  }
  if (score(banker) > score(player)) {
    return 'BANKER WINS!'
  } else if (score(player) > score(banker)) {
    return 'PLAYER WINS!'
  } else if (score(banker) === score(player)) {
    return "It's a DRAW"
  } else {
    console.log('BuGGGGGGGG')
    console.log('banker score is ' + score(banker) + 'player score is ' + score(player))
  }
}

// --- ALL THE FUNCTIONSSSSS -----


function natural (person) {
  if (score(person) > 8) {
    if (pair(person)) {
      return 'NATURAL PAIR'
    } else if (suitSuit(person)) {
      return 'NATURAL SUITED'
    }
    return 'NATURAL'
  } else if (score(person) > 7) {
    if (pair(person)) {
      return 'NATURAL PAIR'
    } else if (suitSuit(person)) {
      return 'NATURAL SUITED'
    }
    return 'NATURAL'
  }
}
function pair (person) { // PAIR FUNCTION
  return getFace(person.cards[0]) === getFace(person.cards[1])
}
function suitSuit (person) { // SUITS FUNCTION
  return getSuit(person.cards[0]) === getSuit(person.cards[1])
}
function suitCube (person) {
  return (getSuit(person.cards[0]) === getSuit(person.cards[1]) && getSuit(person.cards[1]) === getSuit(person.cards[2]))
}
function picCube (person) {
  return (getPic(person.cards[0]) > 0 && getPic(person.cards[1]) > 0 && getPic(person.cards[2]) > 0)
}
function trips (person) {
  return (getFace(person.cards[0]) === getFace(person.cards[1]) && getFace(person.cards[1]) === getFace(person.cards[2]))
}

// DOM MANIPULATION HERE
function showCardInHTML (person) {
  for (var i = 0; i < person.cards.length; i++) {
    var id = person.type + (i + 1)
    var div = document.getElementById(id)
    var cardz = dth(person)
    div.textContent = cardz[i]
  }
}

// GOOD FUNCTIONS, MAYBE CAN STILL USE
// function natural (person) {
//   if (score(person) > 8) {
//     if (pair(person)) {
//       return 'NATURAL 9 PAIR'
//     } else if (suitSuit(person)) {
//       return 'NATURAL 9 SUITED'
//     }
//     return 'NATURAL 9'
//   } else if (score(person) > 7) {
//     if (pair(person)) {
//       return 'NATURAL 8 PAIR'
//     } else if (suitSuit(person)) {
//       return 'NATURAL 8 SUITED'
//     }
//     return 'NATURAL 8'
//   }
// }
// function findWinner () {
//   if (pair(player) && pair(banker)) { // CHECK FOR PAIR
//     return 'BOTH HAVE PAIRS'
//   } else if (pair(player)) {
//     return 'PLAYER HAS PAIR'
//   } else if (pair(banker)) {
//     return 'BANKER HAS PAIR'
//   }
//   if (suitSuit(player) && suitSuit(banker)) { // CHECK FOR SUITED
//     return 'BOTH HAVE SUITED'
//   } else if (suitSuit(player)) {
//     return 'PLAYER HAS SUITED'
//   } else if (suitSuit(banker)) {
//     return 'BANKER HAS SUITED'
//   }
//   if (suitCube(player) && suitCube(banker)) { // CHECK FOR 3 SUITED
//     return 'BOTH HAVE 3 SUITED'
//   } else if (suitCube(player)) {
//     return 'PLAYER HAS 3 SUITED'
//   } else if (suitCube(banker)) {
//     return 'BANKER HAS 3 SUITED'
//   }
//   if (picCube(player) && picCube(banker)) { // CHECK FOR 3 PICTURES
//     return 'BOTH HAVE 3 PICTURES'
//   } else if (picCube(player)) {
//     return 'PLAYER HAS 3 PICTURES'
//   } else if (picCube(banker)) {
//     return 'BANKER HAS 3 PICTURES'
//   }
//   if (trips(player) && trips(banker)) { // CHECK FOR TRIPLE
//     return 'BOTH HAVE TRIPLE'
//   } else if (trips(player)) {
//     return 'PLAYER HAS TRIPLE'
//   } else if (trips(banker)) {
//     return 'BANKER HAS TRIPLE'
//   }
//   if (score(banker) > score(player)) {
//     return 'BANKER WINS!'
//   } else if (score(player) > score(banker)) {
//     return 'PLAYER WINS!'
//   } else if (score(banker) === score(player)) {
//     return "It's a DRAW"
//   } else {
//     console.log('BuGGGGGGGG')
//     console.log('banker score is ' + score(banker) + 'player score is ' + score(player))
//   }
// }
