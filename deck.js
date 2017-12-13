var suits = ['&spades;', '&hearts;', '&clubs;', '&diams;'];
var ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

/*
 * Class representing a single card.
 * Mainly exists so that rank and suit can be stored separately.
 */
function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;

  if ((suit === '&hearts;') || (suit === '&diams;') || (suit === '(low)')) this.color = 'red';
  else this.color = 'black';
}

/* Display the card as a color-correct rank and suit. Assumes client is a browser. */
Card.prototype.toString = function() {
  //console.log('Card.toString()');
  return '<span style="color: ' + this.color + ';">' + this.rank + this.suit + '</span>';
}


/*
 * Class representing a single deck.
 * Once cards are dealt they no longer belong to the deck - to replenish a deck create a new one.
 */
function Deck() {
  this.currentDeck = [];
  for (var s = 0; s < suits.length; s++) {
    for (var r = 0; r < ranks.length; r++) {
      this.currentDeck.push(new Card(ranks[r], suits[s]));
    }
  }
  this.currentDeck.push(new Card('Joker', '(low)'));
  this.currentDeck.push(new Card('Joker', '(high)'));
}

/* Shuffle according to Fisher-Yates */
Deck.prototype.shuffle = function() {
  //console.log('Deck.shuffle()');
  var j, x, i;
  for (i = this.currentDeck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = this.currentDeck[i];
    this.currentDeck[i] = this.currentDeck[j];
    this.currentDeck[j] = x;
  }
}

/* Take the top card off the deck */
Deck.prototype.dealOne = function() {
  //console.log('Deck.dealOne()');
  if (this.currentDeck.length < 1) throw new Error('No cards to deal');
  return this.currentDeck.pop();
}

/* Display the deck in the current order. Primarily for debugging. */
Deck.prototype.toString = function() {
  //console.log('Deck.toString()');
  var ret = '';
  for (var c = 0; c < this.currentDeck.length; c++) {
    ret += this.currentDeck[c].toString() + ' ';
  }
  return ret;
}

module.exports = Deck, Card;
