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
let clickedPlayerCard = "";
let clickedFieldCard = "";

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
    //id is the card name

    for (let i = 0;i<player.hand.length;i++){
        let img = document.createElement("img");
        img.src = player.hand[i].imgName;
        img.id = player.hand[i].cardName;
        img.addEventListener('click',playerCardClick);   
        player_hand.appendChild(img);
    }

    //change this to flipped over cards
    for (let i=0;i<cpu.hand.length;i++){
        let img = document.createElement("img");
        img.src = cpu.hand[i].imgName;   
        cpu_hand.appendChild(img);
    }

    //field card
    for (let i=0;i<fieldCards.length;i++){
        let img = document.createElement("img");
        img.src = fieldCards[i].imgName;
        img.id = fieldCards[i].cardName;
        img.addEventListener('click',fieldCardClick); 
        //this will show what can be played, change this later
        if (clickedPlayerCard.month == fieldCards[i].month){
            img.style.border = '1em solid yellow';
        } 
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

function playerCardClick(){
    for (let i = 0;i<player.hand.length;i++){
        
        if(this.id == player.hand[i].cardName){
            clickedPlayerCard = player.hand[i];
            console.log(clickedPlayerCard);
        }
    }
    
}

function fieldCardClick(){
    for (let i = 0;i<fieldCards.length;i++){
        
        if(this.id == fieldCards[i].cardName){
            clickedFieldCard = fieldCards[i];
            console.log(clickedFieldCard);
        }
    }
    displayCards();
}


function play(){
    
   
    initialDeal(deck);
    
}

export default play();