var fs = require('fs');

var cards = JSON.parse(fs.readFileSync('src/data/cards.json'));

var RARITY = [];
var SET = [];

console.log(cards.length);

for (var i = 0; i < cards.length; i++) {
    if (RARITY.indexOf(cards[i].rarity) < 0) {
        RARITY.push(cards[i].rarity);
    }

    if (SET.indexOf(cards[i].set) < 0) {
        SET.push(cards[i].set);
    }

}

console.log(RARITY);
console.log(SET);