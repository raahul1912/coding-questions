// Step 1: Create a deck of 52 cards
 function createDeck() {
  const suits = ["S", "H", "D", "C"]; // Spades, Hearts, Diamonds, Clubs
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
  const deck = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(rank + suit);
    }
  }
  return deck;
}

// Step 2: Shuffle the deck
 function shuffleDeck(deck) {
  const shuffled = [...deck];
  return shuffled.sort(() => Math.random() - 0.5);
}

// Step 3: Deal a hand of N cards
 function dealHand(deck, n) {
  if (n <= 0 || n > deck.length) throw new Error("Invalid hand size");
  return deck.slice(0, n);
}

// Step 4: Compute Blackjack points
 function computePoints(hand) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    const rank = card[0];
    if (["J", "Q", "K", "T"].includes(rank)) {
      total += 10;
    } else if (rank === "A") {
      aces += 1;
      total += 11; // initially count as 11
    } else {
      total += parseInt(rank);
    }
  }

  // Adjust for Aces if total > 21
  while (total > 21 && aces > 0) {
    total -= 10; // change one Ace from 11 to 1
    aces -= 1;
  }

  return total;
}

// Example usage:
const deck = createDeck();
// console.log("Deck:", deck);
const shuffledDeck = shuffleDeck(deck);
const hand = dealHand(shuffledDeck, 2);
const points = computePoints(hand);

// console.log("Your hand:", hand);
// console.log("Points:", points);

module.exports = { createDeck, shuffleDeck, dealHand, computePoints };