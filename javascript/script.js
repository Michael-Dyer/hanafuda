import CPULogic from "./cpu_logic.js";
import Deck from "./deck.js"
import Yaku from "./yaku.js"

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
    score: 0,
    brain: new CPULogic,
}

let fieldCards = [];
let flippedCard = "";

let clickedPlayerCard = "";
let clickedFieldCard = "";

let fieldClickFlag = 0;
let playerCardClickFlag = 0;
let fieldCardClickFlag = 0;

let round = 1;
//turn can be "player hand" "player flip" "cpu hand" "cpu flip"
let turn = "player hand";

var player_hand = document.getElementById("player_hand");
var field = document.getElementById("field");
var cpu_hand = document.getElementById("cpu_hand");
var player_score = document.getElementById("player_score");
var cpu_score = document.getElementById("cpu_score");
var player_captured_cards = document.getElementById("player_captured_cards");
var cpu_captured_cards = document.getElementById("cpu_captured_cards");
var partial_deck = document.getElementById("deck");

field.addEventListener('click',fieldClick);   



function playerCardClick(){
    playerCardClickFlag = 1;
    if (turn == "player hand"){
    for (let i = 0;i<player.hand.length;i++){
        
            if(this.id == player.hand[i].cardName){
                clickedPlayerCard = player.hand[i];
            }
        }
    
    }
    
    play();
}

function fieldCardClick(){
    for (let i = 0;i<fieldCards.length;i++){
        
        if(this.id == fieldCards[i].cardName){
            clickedFieldCard = fieldCards[i];
            console.log(clickedFieldCard);
        }
    }

}

function fieldClick(){
    fieldClickFlag = 1;

    play();
}


//field.innerHTML ="" clears field
function flipCard(){
    flippedCard = deck.cards.pop();
    
   
}

function removeCard(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}

function displayCards(){

    //these remove all children of the card display areas (cards)
    player_hand.innerHTML = '';
    field.innerHTML = '';
    cpu_hand.innerHTML = '';
    player_captured_cards.innerHTML = "";
    cpu_captured_cards.innerHTML = "";
    partial_deck.innerHTML = "";

    player_score.textContent = `Player score: ${player.score}`;
    cpu_score.textContent = `CPU score: ${cpu.score}`;
    //note to self
    //id is the card name
    player_captured_cards.textContent = "Player Cards: ";
    cpu_captured_cards.textContent = "CPU Cards: ";

    for(let i = 0;i<player.capturedCards.length;i++){
        player_captured_cards.textContent += `${player.capturedCards[i].cardName}: `;
        //player_captured_cards += " ";
    }

    for(let i = 0;i<cpu.capturedCards.length;i++){
        cpu_captured_cards.textContent += `${cpu.capturedCards[i].cardName}: `;
        //player_captured_cards += " ";
    }



    for (let i = 0;i<player.hand.length;i++){
        let img = document.createElement("img");
        img.src = player.hand[i].imgName;
        img.id = player.hand[i].cardName;
        img.setAttribute('class', 'card');
        img.addEventListener('click',playerCardClick);  
        if(turn == "player hand"){
            if (clickedPlayerCard == player.hand[i]){
                img.style.border = '1em solid yellow';
            }
        } 
        player_hand.appendChild(img);
    }

    if (flippedCard!=""){
        let img = document.createElement("img");
        img.src = flippedCard.imgName;
        img.id = flippedCard.cardName;
        img.id = "flipped";
        img.setAttribute('class', 'flipped_card');
        partial_deck.appendChild(img);
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
        //this will show what can be played for the player
        if(turn == "player hand"){
            if (clickedPlayerCard.month == fieldCards[i].month){
                img.style.border = '1em solid yellow';
            }
        } 

        if(turn == "player flip" || turn == "cpu flip"){
            
            if (flippedCard.month == fieldCards[i].month){
                img.style.border = '1em solid yellow';
            }
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

function matchMade(){
    //consider trying animation
    if (turn == "player hand"){
        player.capturedCards.push(clickedFieldCard);
        player.capturedCards.push(clickedPlayerCard);
        
        removeCard(player.hand, clickedPlayerCard);
        removeCard(fieldCards, clickedFieldCard);
    }

    if (turn == "player flip"){
        player.capturedCards.push(clickedFieldCard);
        player.capturedCards.push(flippedCard);

        removeCard(fieldCards, clickedFieldCard)
        flippedCard = "";
        
    }
        

}


initialDeal(deck);

function playerHandTurn(){
    if (clickedPlayerCard!=""){


        //this bit of logic will check if a field card has been clicked before the actual field
        //and reset the player and field card after if no match was made
        if(clickedFieldCard!=""&&clickedPlayerCard!=""){

            //player has found a match
            if(clickedFieldCard!=""&&clickedFieldCard.month==clickedPlayerCard.month){
                matchMade();
                turn = "player flip";
                fieldCardClickFlag = 0;
            }
        
        fieldClickFlag = 0;
        clickedPlayerCard="";
        }
        console.log(fieldCardClickFlag);
        if(fieldClickFlag == 1){

            fieldCards.push(clickedPlayerCard);
            removeCard(player.hand, clickedPlayerCard);
            clickedPlayerCard = ""
            turn = "player flip";
        }
    fieldClickFlag = 0;
    clickedFieldCard = "";
    

    }
 
}

function playerFlipTurn(){
    if (flippedCard==""){
        flipCard();
    }
    
    if(clickedFieldCard!=""){
        if(clickedFieldCard.month==flippedCard.month){
            matchMade();
            turn = "cpu hand";
            fieldClickFlag = 0;
        }
        //clickedFieldCard="";
    }

    if(fieldClickFlag == 1){
        fieldCards.push(flippedCard);
        flippedCard = "";
        turn = "cpu hand";
    }
    

}

function play(){
   displayCards();

    if (turn == "player hand"){
        playerHandTurn();
    }

    if (turn == "player flip"){
        playerFlipTurn();
    }

    //remeber to set clickedPlayerCard to "" when leaving cpu flip turn

    console.log(turn);
    fieldClickFlag = 0;
    clickedFieldCard = "";
    displayCards();
}   

var yaku = new(Yaku(deck));

export default play();