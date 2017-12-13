var Deck = require('./deck');
var assert = require('assert');

/* Tests the Deck class (and by proxy Card, too) for the requirements of the code challenge */
describe('deck of cards', function() {

  /* length was set by rank/suit for 52 cards must be at least 104 characters */
  it('generates a deck of cards', function() {
    var deck = new Deck();
    assert.ok(deck.toString().length >= 104, 'Cards were not generated');
  });

  /* assumes that when shuffled the first three cards cannot remain the first three */
  it('shuffles randomly', function() {
    var firstThree = '<span style="color: black;">A&spades;</span> <span style="color: black;">K&spades;</span> <span style="color: black;">Q&spades;</span>';

    var deck = new Deck();
    deck.shuffle();
    assert.ok(!(deck.toString().startsWith(firstThree)), 'Cards were not shuffled');
  });

  /* assumes cards were created with two of diamonds last, so it is on top of deck */
  it('deals the top card', function() {
    var topCard = '<span style="color: black;">Joker(high)</span>';

    var deck = new Deck();
    assert.equal(topCard, deck.dealOne().toString());
  });

  /* when there are no cards in the deck, dealing one fails */
  it('deals all the cards, then fails', function() {
    var deck = new Deck();
    for (var i = 0; i < 54; i++) {
      assert.ok(deck.dealOne(), 'Ran out of cards early');
    }
    assert.equal(deck.toString(), '', 'Did not run out of cards');

    assert.throws(() => deck.dealOne(), /No cards/, 'Unexpected error');
  });
});
