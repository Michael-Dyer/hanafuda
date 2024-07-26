import Deck from "./deck.js"

let deck = new Deck();
deck.newDeck();
deck.shuffle();

var playerCards = document.getElementById("player cards");

 //This will display deck and show all cards
function test() {
    var playerCards = document.getElementById("player cards");

    for (let i = 0;i<deck.cards.length;i++){
    let img = document.createElement("img");

    img.src = deck.cards[i].imgName;
    
    let create = document.createElement("div");

    create.textContent = (`${deck.cards[i].month} ${deck.cards[i].value}`);
    playerCards.append(create)
    playerCards.appendChild(img);
    

    }
}

export default test();