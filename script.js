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



function displayCards(){
    //still need to render captured cards

    //these remove all children of the card display areas (cards)
    player_hand.innerHTML = '';
    field.innerHTML = '';
    cpu_hand.innerHTML = '';

    //note to self
    //made hacky way to remove cards by setting the id to the image name

    for (let i = 0;i<player.hand.length;i++){
        let img = document.createElement("img");
        img.src = player.hand[i].imgName;
        img.id = player.hand[i].cardName;
        img.class = `player.hand[${i}]`
        img.addEventListener('click',cardClick);   
        player_hand.appendChild(img);
    }

    //change this to flipped over cards
    for (let i=0;i<cpu.hand.length;i++){
        let img = document.createElement("img");
        img.src = cpu.hand[i].imgName;   
        cpu_hand.appendChild(img);
    }

    for (let i=0;i<fieldCards.length;i++){
        let img = document.createElement("img");
        img.src = fieldCards[i].imgName;  
        field.appendChild(img);
    }
}

function initialDeal(deck){

    for (let i = 0;i<8;i++){
        player.hand.push(deck.cards.pop());      
    }   

    for (let i = 0;i<8;i++){
        cpu.hand.push(deck.cards.pop());
    }

    for (let i = 0;i<8;i++){
        fieldCards.push(deck.cards.pop());
    }
    displayCards();
}

function cardClick(){
    for (let i = 0;i<player.hand.length;i++){
        
        if(this.id == player.hand[i].cardName){
            console.log(player.hand[i].cardName)

            player.hand.splice(i,1);
        }

        }
    displayCards();
}



function play(){
    
   
    initialDeal(deck);
    
}

export default play();