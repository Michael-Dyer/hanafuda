import Deck from "./deck.js"

let deck = new Deck();
deck.newDeck();
deck.shuffle();

let player = {
    hand: [],
    capturedCards: [],

}

let cpu = {
    hand: [],
    capturedCards: [],

}

let fieldCards = [];

var player_hand = document.getElementById("player_hand");
var field = document.getElementById("field");
var cpu_hand = document.getElementById("cpu_hand");



function initialDeal(deck){
    //refactor to render cards at any event instead of just displaying cards 
    //deal to player 
    for (let i = 0;i<8;i++){
        let img = document.createElement("img");

        player.hand.push(deck.cards.pop());

        img.src = player.hand[i].imgName;
        
        let create = document.createElement("div");
    
        player_hand.append(create)
        player_hand.appendChild(img);
        
    }

    //deal to cpu 
    for (let i = 0;i<8;i++){
        let img = document.createElement("img");

        cpu.hand.push(deck.cards.pop());

        img.src = cpu.hand[i].imgName;
        
        let create = document.createElement("div");
    
        cpu_hand.append(create)
        cpu_hand.appendChild(img);
        
    }

    //deal to field 
    for (let i = 0;i<8;i++){
        let img = document.createElement("img");

        fieldCards.push(deck.cards.pop());

        img.src = fieldCards[i].imgName;
        
        let create = document.createElement("div");
    
        field.append(create)
        field.appendChild(img);
        
    }

}

function play(){
    initialDeal(deck);
   
}

export default play();