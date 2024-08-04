import Deck from "./deck.js"

let deck = new Deck();
deck.newDeck();
deck.shuffle();

let player = {
    hand: [],
    capturedCards: [],
    score: 0
}

let cpu = {
    hand: [],
    capturedCards: [],
    score: 0
}

let fieldCards = [];
let flippedCard = "";
let clickedPlayerCard = "";
let clickedFieldCard = "";

let round = 1;

var player_hand = document.getElementById("player_hand");
var field = document.getElementById("field");
var cpu_hand = document.getElementById("cpu_hand");
var player_score = document.getElementById("player_score");
var cpu_score = document.getElementById("cpu_score");
var player_captured_cards = document.getElementById("player_captured_cards");
var cpu_captured_cards = document.getElementById("cpu_captured_cards");
var partial_deck = document.getElementById("deck");

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
}


//field.innerHTML ="" clears field
function flipCard(){
    flippedCard = deck.cards.pop();
    
    let img = document.createElement("img");
    img.src = flippedCard.imgName;
    img.id = flippedCard.cardName;
    img.id = "flipped";
    img.setAttribute('class', 'flipped_card');


    partial_deck.appendChild(img);
}

function displayCards(){
    //still need to render captured cards

    //these remove all children of the card display areas (cards)
    player_hand.innerHTML = '';
    field.innerHTML = '';
    cpu_hand.innerHTML = '';

    player_score.textContent = `Player score: ${player.score}`;
    cpu_score.textContent = `CPU score: ${cpu.score}`;
    //note to self
    //id is the card name

    for(let i = 0;i<player.capturedCards.length;i++){
        player_captured_cards.textContent += `${player.capturedCards[i]} `;
        //player_captured_cards += " ";
    }

    for(let i = 0;i<cpu.capturedCards.length;i++){
        cpu_captured_cards.textContent += `${cpu.capturedCards[i]} `;
        //player_captured_cards += " ";
    }



    for (let i = 0;i<player.hand.length;i++){
        let img = document.createElement("img");
        img.src = player.hand[i].imgName;
        img.id = player.hand[i].cardName;
        img.setAttribute('class', 'card');
        img.addEventListener('click',playerCardClick);   
        player_hand.appendChild(img);
    }

    //change this to flipped over cards
    for (let i=0;i<cpu.hand.length;i++){
        let img = document.createElement("img");
        img.src = cpu.hand[i].imgName; 
        img.setAttribute('class', 'card');
  
        cpu_hand.appendChild(img);
    }

    //field card
    for (let i=0;i<fieldCards.length;i++){
        let img = document.createElement("img");
        img.src = fieldCards[i].imgName;
        img.id = fieldCards[i].cardName;
        img.addEventListener('click',fieldCardClick); 
        img.setAttribute('class', 'field_card');
      /*this will show what can be played, use this later
        if (clickedPlayerCard.month == fieldCards[i].month){
            img.style.border = '1em solid yellow';
        } */
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






function play(){
    
   
    initialDeal(deck);

    
    
}   


export default play();