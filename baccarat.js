// sounds
var dealCard = new Audio('sound/deal_cards.mp3')
var bankerDraws = new Audio('sound/banker_draws.mp3')
var playerDraws = new Audio('sound/player_draws.mp3')
var showDown = new Audio('sound/showdown!.mp3')
var bankerWinner = new Audio('sound/banker_wins.mp3')
var playerWinner = new Audio('sound/player_wins.mp3')
var itsATie = new Audio('sound/its_a_tie.mp3')
var royalFlushSound = new Audio('sound/with_royal_flush.mp3')
var threeOfAKindSound = new Audio('sound/with_3_of_a_kind.mp3')
var threePicturesSound = new Audio('sound/with_3_pictures.mp3')
var naturalNinePair = new Audio('sound/natural_9_pair.mp3')
var naturalNineSuited = new Audio('sound/natural_9_suited.mp3')
var naturalNine = new Audio('sound/natural_9.mp3')
var naturalEightPair = new Audio('sound/natural_8_pair.mp3')
var naturalEightSuited = new Audio('sound/natural_8_suited.mp3')
var naturalEight = new Audio('sound/natural_8.mp3')

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

var dealAlr = 0
// -----GGGGAME STARTTTTTTTT-----
document.getElementById('deal').addEventListener('click', function () {
  if (dealAlr === 0) {
    deal(player)
    deal(banker)

    deal(player)
    deal(banker)

    showCardInHTML(player)
    showCardInHTML(banker)

    pHandType.text(checkTwoCardsHandType(player))
    bHandType.text(checkTwoCardsHandType(banker))

    pValue.text(checkValue(player))
    bValue.text(checkValue(banker))

    pMultiplier.text(checkTwoCardsMultiplier(player))
    bMultiplier.text(checkTwoCardsMultiplier(banker))

    display.text(find2CardsWinner())
    // sound
    dealCard.play()
    dealCard.addEventListener('ended', function () {
      if (find2CardsWinner() === 'BANKER WINS') {
        bankerWinner.play()
      } else if (find2CardsWinner() === 'PLAYER WINS') {
        playerWinner.play()
      } else if (find2CardsWinner() === 'ITS A TIE') {
        itsATie.play()
      }
    })
    // bankMoney()
    dealAlr++
  } else if (dealAlr === 1) {
    clearCardInHTML(player)
    clearCardInHTML(banker)

    player = {
      type: 'player',
      cards: []
    }
    banker = {
      type: 'banker',
      cards: []
    }

    pHandType.text(' ')
    bHandType.text(' ')

    pValue.text('0')
    bValue.text('0')

    pMultiplier.text(' ')
    bMultiplier.text(' ')

    display.text('NEW HAND')

    dealAlr = 0
    counterDeal = 0
    dealCounter = 0
  }
}) // DEALING

// Player Draw
var dealCounter = 0
document.getElementById('pDraw').addEventListener('click', function () {
  if (dealAlr === 1) {
    if (dealCounter === 0) {
      playerDraws.play()
      deal(player)
      var div5 = document.getElementById('player3')
      var cardvz = dth(player)
      // div5.textContent = cardvz[2]
      div5.innerHTML = "<span class='ace-profits'>" + cardvz[2] + '</span>'
      div5.innerHTML = "<img class ='card' src='imgs/Cards/" + cardvz[2] + ".png'/>"
      dealCounter++
    }
    pHandType.text(checkThreeCardsHandType(player))
    pValue.text(checkValue(player))
    pMultiplier.text(checkThreeCardsMultiplier(player))
  }
})

var counterDeal = 0
$('#bDraw').on('click', function () {
  if (dealAlr === 1) {
    if (counterDeal === 0) {
      bankerDraws.play()
      deal(banker)
      var div6 = document.getElementById('banker3')
      var cardvz = dth(banker)
      // div6.textContent = cardvz[2]
      // div6.innerHTML = "<span class='ace-profits'>"+ cardvz[2] + "</span>"
      div6.innerHTML = "<img class ='card' src='imgs/Cards/" + cardvz[2] + ".png'/>"
      counterDeal++
    }
    bHandType.text(checkThreeCardsHandType(banker))
    bValue.text(checkValue(banker))
    bMultiplier.text(checkThreeCardsMultiplier(banker))
  }
})

var display = $('#display')

var pHandType = $('#playerHandType')
var pValue = $('#playerValue')
var pMultiplier = $('#playerMultiplier')

var bHandType = $('#bankerHandType')
var bValue = $('#bankerValue')
var bMultiplier = $('#bankerMultiplier')

document.getElementById('fight').addEventListener('click', function () {
  display.text(find3CardsWinner())
// showDown.play()
// if (find3CardsWinner() === 'BANKER WINS') {
//   bankerWinner.play() + royalFlushSound.play()
// } else if (find3CardsWinner() === 'PLAYER WINS') {
//   playerWinner.play() + royalFlushSound.play()
// } else if (find3CardsWinner() === 'ITS A TIE') {
//
// }
})

// ----- FIND HANDTYPE -----
function checkTwoCardsHandType (person) { // FOR 2 CARDS
  return natural(person)
}
function checkThreeCardsHandType (person) { // FOR 3 CARDS
  if (royalFlush(person)) {
    return 'ROYALFLUSH'
  } else if (trips(person)) {
    return 'TRIPLE'
  }  else if (picCube(person)) {
    return '3 PICTURES'
  } else if (suitCube(person)) {
    return '3 SAME SUIT'
  } else {
    return ' '
  }
}
// ----- FIND VALUE -----
function checkValue (person) {
  return score(person)
} // SCORE OF HAND
// ----- CHECK MULTIPLIER -----
function checkTwoCardsMultiplier (person) { // FOR 2 CARDS
  if (natural(person)) {
    if (pair(person)) {
      return '2'
    } else if (suitSuit(person)) {
      return '2'
    }
    return '1'
  }
  if (pair(person)) {
    return '2'
  } else if (suitSuit(person)) {
    return '2'
  }
}
function checkThreeCardsMultiplier (person) { // FOR 3 CARDS
  if (royalFlush(person)) {
    return '7'
  } else if (trips(person)) {
    return '5'
  }  else if (picCube(person)) {
    return '3'
  } else if (suitCube(person)) {
    return '3'
  } else {
    return ' '
  }
}

// -----FIND WINNER----- only 2 cards.
var bankerWins = 'BANKER WINS'
var playerWins = 'PLAYER WINS'
var draw = 'ITS A TIE'

function find2CardsWinner () {
  if (naturalDecider(banker) > 0 || naturalDecider(player) > 0) {
    if (naturalDecider(banker) === naturalDecider(player)) {
      return draw
    } else if (naturalDecider(banker) > naturalDecider(player)) {
      return bankerWins
    } else if (naturalDecider(banker) < naturalDecider(player)) {
      return playerWins
    }
  }
} // BEFORE DRAW CARDS WINNER CHECK
function find3CardsWinner () { // AFTER DRAW CARDS WINNER CHECK
  if (royalFlush(player) && royalFlush(banker)) { // CHECK FOR ROYALFLUSH
    return draw + ', BOTH HAVE ROYALFLUSH'
  } else if (royalFlush(player)) {
    playerWinner.play()
    playerWinner.addEventListener('ended', function () {
      royalFlushSound.play()
    })
    return playerWins + ' WITH ROYALFLUSH'
  } else if (royalFlush(banker)) {
    bankerWinner.play()
    bankerWinner.addEventListener('ended', function () {
      royalFlushSound.play()
    })
    return bankerWins + ' WITH ROYALFLUSH'
  }
  if (trips(player) && trips(banker)) { // CHECK FOR TRIPLE
    return draw + ', BOTH HAVE TRIPLE'
  } else if (trips(player)) {
    playerWinner.play()
    playerWinner.addEventListener('ended', function () {
      threeOfAKindSound.play()
    })
    return playerWins + ' WITH TRIPLE'
  } else if (trips(banker)) {
    bankerWinner.play()
    bankerWinner.addEventListener('ended', function () {
      threeOfAKindSound.play()
    })
    return bankerWins + ' WITH TRIPLE'
  }
  if (picCube(player) && picCube(banker)) { // CHECK FOR 3 PICTURES
    return draw + ', BOTH HAVE 3 PICTURES'
  } else if (picCube(player)) {
    playerWinner.play()
    playerWinner.addEventListener('ended', function () {
      threePicturesSound.play()
    })
    return playerWins + ' WITH 3 PICTURES'
  } else if (picCube(banker)) {
    bankerWinner.play()
    bankerWinner.addEventListener('ended', function () {
      threePicturesSound.play()
    })
    return bankerWins + ' WITH 3 PICTURES'
  }
  if (score(banker) === score(player)) { // CHECK SCORES
    var three_suits0 = threeSuitsCheck()
    if (three_suits0 === (draw + ', BOTH HAVE 3 SUITS')) { return three_suits0; }
    itsATie.play()
    return draw
  } else if (score(banker) > score(player)) {
    var three_suits1 = threeSuitsCheck()
    if (three_suits1 === (bankerWins + ' WITH 3 SUITS')) { return three_suits1; }
    bankerWinner.play()
    return bankerWins
  } else if (score(banker) < score(player)) {
    var three_suits2 = threeSuitsCheck()
    if (three_suits2 === (playerWins + ' WITH 3 SUITS')) { return three_suits2; }
    playerWinner.play()
    return playerWins
  }
}

function threeSuitsCheck () {
  if (suitCube(player) && suitCube(banker)) { // CHECK FOR 3 SUITS
    return draw + ', BOTH HAVE 3 SUITS'
  } else if (suitCube(player)) {
    return playerWins + ' WITH 3 SUITS'
  } else if (suitCube(banker)) {
    return bankerWins + ' WITH 3 SUITS'
  }
  return false
}
function pairCheck () {
  if (pair(player) && pair(banker)) { // CHECK FOR PAIR
    return draw + ', BOTH HAVE PAIRS'
  } else if (pair(player)) {
    return playerWins + ' WITH PAIR'
  } else if (pair(banker)) {
    return bankerWins + ' WITH PAIR'
  }
  return false
}
function suitSuitCheck () {
  if (suitSuit(player) && suitSuit(banker)) { // CHECK FOR SUITED
    return draw + ', BOTH HAVE SUITED'
  } else if (suitSuit(player)) {
    return playerWins + ' WITH SUITED'
  } else if (suitSuit(banker)) {
    return bankerWins + ' WITH SUITED'
  }
  return false
}

// --- ALL THE FUNCTIONSSSSS -----
function natural (person) {
  if (score(person) > 8) {
    if (pair(person)) {
      console.log('9pair')

      bankerWinner.addEventListener('ended', function () {
        naturalNinePair.play()
      })
      playerWinner.addEventListener('ended', function () {
        naturalNinePair.play()
      })
      return 'NATURAL 9 PAIR'
    } else if (suitSuit(person)) {
      console.log('9suited')
      bankerWinner.addEventListener('ended', function () {
        naturalNineSuited.play()
      })
      playerWinner.addEventListener('ended', function () {
        naturalNineSuited.play()
      })
      return 'NATURAL 9 SUITED'
    } else {
      bankerWinner.addEventListener('ended', function () {
        console.log('illegal play1')

        naturalNine.play()
      })
      playerWinner.addEventListener('ended', function () {
        console.log('illegal play2')

        naturalNine.play()
      })
      console.log('just9')
      return 'NATURAL 9'
    }
  } else if (score(person) > 7) {
    if (pair(person)) {
      console.log('8suit')
      bankerWinner.addEventListener('ended', function () {
        naturalEightPair.play()
      })
      playerWinner.addEventListener('ended', function () {
        naturalEightPair.play()
      })
      return 'NATURAL 8 PAIR'
    } else if (suitSuit(person)) {
      console.log('8pair')
      bankerWinner.addEventListener('ended', function () {
        naturalEightSuited.play()
      })
      playerWinner.addEventListener('ended', function () {
        naturalEightSuited.play()
      })
      return 'NATURAL 8 SUITED'
    } else {
      console.log('just8')
      bankerWinner.addEventListener('ended', function () {
        naturalEight.play()
      })
      playerWinner.addEventListener('ended', function () {
        console.log('just8player')

        naturalEight.play()
      })
      return 'NATURAL 8'
    }
  }
}
function naturalDecider (person) {
  if (score(person) > 8) {
    if (pair(person)) {
      return 4
    } else if (suitSuit(person)) {
      return 4
    }
    return 3
  } else if (score(person) > 7) {
    if (pair(person)) {
      return 2
    } else if (suitSuit(person)) {
      return 2
    }
    return 1
  } else {
    return -1
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
function royalFlush (person) {
  return ((getSuit(person.cards[0]) === getSuit(person.cards[1]) && getSuit(person.cards[1]) === getSuit(person.cards[2])) && (getPic(person.cards[0]) > 0 && getPic(person.cards[1]) > 0 && getPic(person.cards[2]) > 0))
}

// DOM MANIPULATION HERE
function showCardInHTML (person) {
  for (var i = 0; i < person.cards.length; i++) {
    var id = person.type + (i + 1)
    var div = document.getElementById(id)
    var cardz = dth(person)
    div.innerHTML = "<img class ='card' src='imgs/Cards/" + cardz[i] + ".png'/>"
  }
}

function clearCardInHTML (person) {
  for (var i = 0; i < person.cards.length; i++) {
    var id = person.type + (i + 1)
    var div = document.getElementById(id)
    var cardz = dth(person)
    div.innerHTML = ''
  }
}

// ----------BETTING ELEMENT----------
var bankerMoney = 500000
var bankerCredits = $('#bankerCredits')
var playerMoney = 10000
var playerCredits = $('#playerCredits')
var playerPlacedBet = []
// var currentBet = $('#betDisplay').val()
// console.log(currentBet)
function distributeMoney () {
  bankerCredits.text(bankerMoney)
  playerCredits.text(playerMoney)
}

distributeMoney()

// function bet (amount) {
//   playerMoney - amount
//   currentBet = amount
// }
//
// bet(500)
//
// function payOut(){
//   return currentBet * checkTwoCardsMultiplier()

// currentBet * checkThreeCardsMultiplier()
// }

// bet(500)
// payOut()
// console.log(currentBet)
// console.log()
$('#bet').on('click', function () {
  event.preventDefault()
  playerPlacedBet = []
  
  playerPlacedBet.push($('#betAMT').val())
  console.log(playerPlacedBet)
  $('#betDisplay').text(playerPlacedBet);
})
