// blackjack.test.js
const { createDeck, shuffleDeck, dealHand, computePoints } = require('./blackjack');
const { test, expect, describe } = require('@jest/globals');

describe('Blackjack Game Functions', () => {

  test('createDeck should create 52 unique cards', () => {
    const deck = createDeck();
    expect(deck).toHaveLength(52);
    const uniqueCards = new Set(deck);
    expect(uniqueCards.size).toBe(52);
  });

  test('shuffleDeck should not change the number of cards', () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    expect(shuffled).toHaveLength(52);
    expect(new Set(shuffled).size).toBe(52);
  });

  test('shuffleDeck should change the card order', () => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    // It's random, but very unlikely to be same order
    expect(shuffled.join('')).not.toBe(deck.join(''));
  });

  test('dealHand should return N cards', () => {
    const deck = createDeck();
    const hand = dealHand(deck, 5);
    expect(hand).toHaveLength(5);
  });

  test('dealHand should throw error for invalid N', () => {
    const deck = createDeck();
    expect(() => dealHand(deck, 0)).toThrow();
    expect(() => dealHand(deck, 53)).toThrow();
  });

  test('computePoints should return correct total for numeric cards', () => {
    const hand = ['2S', '3D', '5H'];
    expect(computePoints(hand)).toBe(10);
  });

  test('computePoints should count face cards as 10', () => {
    const hand = ['KH', 'QD', 'JC'];
    expect(computePoints(hand)).toBe(30);
  });

  test('computePoints should handle Aces as 11 or 1 properly', () => {
    expect(computePoints(['AC', '2S'])).toBe(13); // 11 + 2
    expect(computePoints(['AC', '9D', 'AD'])).toBe(21); // 11 + 9 + 1
    expect(computePoints(['AD', 'KD', '9S'])).toBe(20); // Ace as 1
  });
});
