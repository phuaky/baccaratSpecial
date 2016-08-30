var deck = []
for (var i = 1; i < 53; i++) {
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
console.log(shuffledDeck.join(' '))

function deal () {
  return shuffledDeck.shift()
}

var card0 = deal()
var card1 = deal()
var card2 = deal()
var card3 = deal()

console.log(card0)
console.log(card1)
console.log(card2)
console.log(card3)

console.log(shuffledDeck.join(' '))

var player = {}
var banker = {}

// // ------Assign value & suit to index in array------
// function getValue (zerba) {
//   if (zerba % 13 >= 10) {
//     return 0
//   } else {
//     return zerba % 13
//   }
// }
//
// // ------GET SUIT OF CARDS ------
// function getSuit (zebra) {
//   var suit = Math.floor((zebra - 1) / 13)
//   if (suit === 0) {
//     return 'Diamonds'
//   } else if (suit === 1) {
//     return 'Clubs'
//   } else if (suit === 2) {
//     return 'Hearts'
//   } else if (suit === 3) {
//     return 'Spades'
//   }
// }
// // ------GET PICTURE CARDS ------
// // function getFace () {
// //   if (card % 13 == 11) {
// //     return 'Jack'
// //   } else if (card % 13 == 12) {
// //     return 'Queen'
// //   } else if (card % 13 == 0) {
// //     return 'King'
// //   } else {
// //     return "nil"
// //   }
// // }
//
// // Sum of 2 cards
// function score () {
//   var asd = getValue(card1) + getValue(card2)
//   var n = asd.toString()
//   var singleValue = n.charAt(n.length - 1)
//   console.log("Your total hand value is " + singleValue + " and ")
//   return singleValue
// }
// // Suits player is holding
// function suitty () {
//   if (getSuit(card1) === getSuit(card2)) {
//     console.log('you have ' + getSuit(card1) + ' pair')
//   } else {
//     console.log('you have ' + getSuit(card1) + ' and ' + getSuit(card2))
//   }
// }
// score()
// suitty()
