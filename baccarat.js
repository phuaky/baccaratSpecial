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


// showCardInHTML(player)
// console.log(player.cards)
//
// dth(player)
// console.log(dth(player))
//
// deal(player)
// showCardInHTML(player)
// console.log(player.cards)
//
// dth(player)
// console.log(dth(player))



// Sum of 2 cards or 3 cards
function score (input) {
  var card1 = input[Object.keys(input)[2]] // Find card from player
  var card2 = input[Object.keys(input)[3]] // Find card from player
  var card3 = input[Object.keys(input)[4]] // Find card from player
  var asd = getValue(card1) + getValue(card2)
  var qwe = getValue(card1) + getValue(card2) + getValue(card3)
  if (input.numberOfCardsOnHand === 2) {
    var n = asd.toString()
    var singleValue = n.charAt(n.length - 1)
    console.log('Your hand value is ' + singleValue)
    // input['sum'] = singleValue // NOT WORKING!!!
    return singleValue
  } else if (input.numberOfCardsOnHand === 3) {
    var m = qwe.toString()
    var singleValue1 = m.charAt(m.length - 1)
    console.log('Your hand value is ' + singleValue1)
    // input['sum'] = singleValue // NOT WORKING!!!
    return singleValue1
  }
}
// Suits player is holding, can check 3 cards
function suitty (INPUT) {
  var card1 = INPUT[Object.keys(INPUT)[2]] // Find card from player
  var card2 = INPUT[Object.keys(INPUT)[3]] // Find card from player
  var card3 = INPUT[Object.keys(INPUT)[4]] // Find card from player
  if (INPUT.numberOfCardsOnHand === 2) {
    if (getSuit(card1) === getSuit(card2)) {
      console.log('you have 2 ' + getSuit(card1))
    // return '200'
    } else {
      console.log('you have ' + getSuit(card1) + ' and ' + getSuit(card2))
    }
  } else if (INPUT.numberOfCardsOnHand === 3) {
    if (getSuit(card1) === getSuit(card2) && getSuit(card2) === getSuit(card3)) {
      console.log('you have 3 ' + getSuit(card3))
    // return '300'
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
    showCardInHTML(player)
    deal(banker)
    showCardInHTML(banker)
    deal(player)
    showCardInHTML(player)
    deal(player)
    showCardInHTML(player)


    dealAlr++
  // console.log("----AFTER DEALING " + shuffledDeck.join(' '))
// } else if (dealAlr === 1) {
//   deal(player)
//   showCardInHTML(player)
//   deal(banker)
//   showCardInHTML(banker)
 }
})

// Player Draw
document.getElementById('draw').addEventListener('click', function () {
  deal(player)
  var div5 = document.getElementById('p3')
  var cardvz = dth(player)
  div5.textContent = cardvz
  console.log(player)
  score(player); suitty(player)
})

document.getElementById('fight').addEventListener('click', function () {
  compareValue()
})

// -----CHECK WINNER----- only 2 cards.
function compareValue () {
  if (score(banker) > score(player)) {
    console.log('BANKER WINS!')
    return 'BANKER WINS!'
  } else if (score(player) > score(banker)) {
    console.log('PLAYER WINS!')
    return 'PLAYER WINS!'
  } else {
    console.log("It's a DRAW")
    return "It's a DRAW"
  }
}
function natural () {
  if (score(banker) || score(player) > 7) {
    console.log('')
  }
}

// DOM MANIPULATION HERE

function showCardInHTML(person) {
  for (var i = 0; i < person.cards.length; i++) {
    var id = person.type + (i + 1)
    var div = document.getElementById(id)
    var cardz = dth(person)
    div.textContent = cardz
    // $('#player1').html(cardz[i])
  }
}
