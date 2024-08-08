import CPULogic from "./cpu_logic.js";
import Deck from "./deck.js"
import Yaku from "./yaku.js"


//test script is a modification to easily debug scoring and koi-koi rules

let deck = new Deck();
deck.newDeck();
deck.shuffle();

var startingPlayer;
var playerScoring = new Yaku([]);
let player = {
    hand: [],
    capturedCards: [],
    score: 0,
    yakus: [],
    firstYakus :[],
    roundPoints: 0,
    hasKoiKoid: false
}

var cpuScoring = new Yaku([]);
let cpu = {
    hand: [],
    capturedCards: [],
    score: 0,
    yakus: [],
    firstYakus : [],
    roundPoints: 0,
    hasKoiKoid: false
}

let fieldCards = [];
let flippedCard = "";

let clickedPlayerCard = "";
let clickedFieldCard = "";

let fieldClickFlag = 0;
let playerCardClickFlag = 0;
let fieldCardClickFlag = 0;

//this flag is responsible for not letting cpu move unless clicked
let mainClickFlag = 0;
let cpu_flag = 0;

//make cpu logic
var brain = new CPULogic(cpu.hand,fieldCards,cpu.capturedCards,player.capturedCards,flippedCard)


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
var main = document.getElementById("everything");
var turn_text = document.getElementById("turn");

main.addEventListener('click', mainClick);

field.addEventListener('click',fieldClick);   

function mainClick(){
    mainClickFlag = 1;
    play();

}

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
            //console.log(clickedFieldCard);
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

function display(){

    //these remove all children of the card display areas (cards)
    player_hand.innerHTML = '';
    field.innerHTML = '';
    cpu_hand.innerHTML = '';
    player_captured_cards.innerHTML = "";
    cpu_captured_cards.innerHTML = "";
    partial_deck.innerHTML = "";
    turn_text.innerHTML = "";

    player_score.textContent = `Player score: ${player.score}`;
    cpu_score.textContent = `CPU score: ${cpu.score}`;
    turn_text.textContent = `Round: ${round} - Turn: ${turn}`
    //note to self
    //id is the card name
    player_captured_cards.textContent = "Player Cards: ";
    cpu_captured_cards.textContent = "CPU Cards: ";

    
    //edit this to highlight or bold matches or potential matches


    for(let i = 0;i<player.capturedCards.length;i++){
        let p = document.createElement("p");
        p.textContent = `${player.capturedCards[i].cardName}: `
        p.style.display = "inline";
        
        playerScoring.isAt(player.capturedCards[i]);
        playerScoring.isAlmost(player.capturedCards[i]);
        if (playerScoring.almostArr.includes(player.capturedCards[i])){
            p.style.border = "double"
        }
        
        if (playerScoring.atArr.includes(player.capturedCards[i])){
            p.style.border = "double"
            p.style.background = "yellow"
        }
        player_captured_cards.append(p);
    }
    

    for(let i = 0;i<cpu.capturedCards.length;i++){
        let p = document.createElement("p");
        p.textContent = `${cpu.capturedCards[i].cardName}: `
        p.style.display = "inline";
        
        cpuScoring.isAt(cpu.capturedCards[i]);
        cpuScoring.isAlmost(cpu.capturedCards[i]);
        if (cpuScoring.almostArr.includes(cpu.capturedCards[i])){
            p.style.border = "double"
        }
        
        if (cpuScoring.atArr.includes(cpu.capturedCards[i])){
            p.style.border = "double"
            p.style.background = "yellow"
        }
        cpu_captured_cards.append(p);
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

        if(turn == "player flip"){
            
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
    display();
}

function checkAllThree(matchCard, fieldCard){
    var numberOfMatches = 0;
    var monthArr = [];
    for (var i = 0;i<fieldCards.length;i++){
        if (matchCard.month == fieldCards[i].month){
            monthArr.push(fieldCards[i]);
            numberOfMatches++;
        }
    }
    return monthArr;

}

function captureThree(month,opp){
    //lazy double loop in case the cards are at the end
    for (var y= 0; y<3;y++){
    for (var i = 0;i<fieldCards.length;i++){
        if (fieldCards[i].month == month){
            opp.capturedCards.push(fieldCards[i]);
            removeCard(fieldCards, fieldCards[i]);
        }
    }
    }

    
}



function matchMade(){
    //consider adding in animation
    //make sure to add in rule to capture all three cards if that is an option
    playerScoring.fill(player.capturedCards);
    cpuScoring.fill(cpu.capturedCards);
    playerScoring.check();
    cpuScoring.check();
    


    if (turn == "player hand"){


        if (checkAllThree(clickedPlayerCard,clickedFieldCard).length==3){
            player.capturedCards.push(clickedPlayerCard);
            captureThree(clickedPlayerCard.month, player);
            removeCard(player.hand, clickedPlayerCard);




        }
        else{
        player.capturedCards.push(clickedFieldCard);
        player.capturedCards.push(clickedPlayerCard);
        
        removeCard(player.hand, clickedPlayerCard);
        removeCard(fieldCards, clickedFieldCard);
        }
    }

    if (turn == "player flip"){

        if (checkAllThree(flippedCard,clickedFieldCard).length==3){
            player.capturedCards.push(flippedCard);
            captureThree(flippedCard.month, player);
            flippedCard = "";



        }
        else{
        player.capturedCards.push(clickedFieldCard);
        player.capturedCards.push(flippedCard);

        flippedCard = "";
        removeCard(fieldCards, clickedFieldCard);
        }

    //this currently works
    playerScoring.fill(player.capturedCards);
    playerScoring.check();
    playerScoring.getYakus();
    
    player.firstYakus = playerScoring.yakus;
    
    

    if(player.firstYakus.length>0){
    console.log("bingo")}

    }

    if(turn == "cpu hand"){
        if (checkAllThree(brain.bestPair.card1,brain.bestPair.card2).length==3){
            cpu.capturedCards.push(brain.bestPair.card1);
            captureThree(brain.bestPair.card1.month, cpu);
            removeCard(cpu.hand, brain.bestPair.card1);

        }
        else{
        cpu.capturedCards.push(brain.bestPair.card1);
        cpu.capturedCards.push(brain.bestPair.card2);

        removeCard(cpu.hand, brain.bestPair.card1);
        removeCard(fieldCards, brain.bestPair.card2);
        }
    }


    if(turn == "cpu flip"){
        if (checkAllThree(brain.bestPair.card1,brain.bestPair.card2).length==3){
            cpu.capturedCards.push(brain.bestPair.card1);
            captureThree(brain.bestPair.card1.month, cpu);
            flippedCard = "";


        }
        else{
        cpu.capturedCards.push(brain.bestPair.card1);
        cpu.capturedCards.push(brain.bestPair.card2);

        flippedCard = "";
        removeCard(fieldCards, brain.bestPair.card2);
        }
        
    }


    playerScoring.fill(player.capturedCards);
    cpuScoring.fill(cpu.capturedCards);
    playerScoring.check();
    cpuScoring.check();

    
    

}

function scoringState(opp){
    var scoringPromt = ""
    for (const y in opp.firstYakus){
        scoringPromt += `You have scored 0 points for ${opp.firstYakus[y]}!
        `;
    }
    

    if(confirm(`${scoringPromt}Would you like to Koi Koi?
        `)){
        console.log("you've koi koid")
    }
    else{
        console.log("new round")
    }

}

function newRound(){

}






function playerHandTurn(){
    if (clickedPlayerCard!=""){
        //check to see if match can be made or not
        var containsMonth = false;
        for (let i=0;i<fieldCards.length;i++){
            if (clickedPlayerCard.month == fieldCards[i].month){
                containsMonth = true;
            }   
        } 
        
        
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
        if(fieldClickFlag == 1&&containsMonth==false){

            fieldCards.push(clickedPlayerCard);
            removeCard(player.hand, clickedPlayerCard);
            clickedPlayerCard = ""
            turn = "player flip";
        }
    fieldClickFlag = 0;
    clickedFieldCard = "";
    

    }
 
}//forgot flip cards HAVE to match with a card



function playerFlipTurn(){
    if (flippedCard==""){
        flipCard();
    }
    //check if match can be made
    var containsMonth = false;
        for (let i=0;i<fieldCards.length;i++){
            if (flippedCard.month == fieldCards[i].month){
                containsMonth = true;
            }   
        } 



    
    if(clickedFieldCard!=""){
        if(clickedFieldCard.month==flippedCard.month){
            matchMade();
            turn = "cpu hand";
            fieldClickFlag = 0;
        }
        //clickedFieldCard="";
    }

    if(fieldClickFlag == 1&&containsMonth==false){
        fieldCards.push(flippedCard);
        flippedCard = "";
        turn = "cpu hand";
    }
    brain.update(cpu.hand,fieldCards,cpu.capturedCards,player.capturedCards,flippedCard);
    cpu_flag = 0;
}

function cpuHandTurn(){

    if (cpu_flag==0&&mainClickFlag==1){
    brain.getHandPairs();
    cpu_flag = 1;
    }
    else if (mainClickFlag==1){
    //console.log("In CPU hand turn")
    brain.findWorstCard();
    
    if (brain.posiblePairs.length>0){
        matchMade();
        turn = "cpu flip";

    }
    else {
        fieldCards.push(brain.worstCard);
        removeCard(cpu.hand,brain.worstCard);
        turn = "cpu flip";        
    }
}
}

function cpuFlipTurn(){
    if (flippedCard==""&&mainClickFlag==1){
        flipCard();
    }
    else if(mainClickFlag ==1) {
    brain.update(cpu.hand,fieldCards,cpu.capturedCards,player.capturedCards,flippedCard);
    //console.log("in CPU flip turn");

    
    brain.findWorstCard();
    brain.getFlipPairs();
    
    if (brain.posiblePairs.length>0){
        matchMade();
        turn = "player hand";
    }
    else {
        fieldCards.push(flippedCard);
        flippedCard = "";
        turn = "player hand";
    }
}

}

initialDeal(deck);
function play(){
    display();

    playerScoring.fill(player.capturedCards);
    cpuScoring.fill(cpu.capturedCards);
    playerScoring.check();
    cpuScoring.check();
    
    if (turn == "player hand"){
        
        playerHandTurn();
    }

    else if (turn == "player flip"){
        playerFlipTurn();
    }
    else if (turn == "cpu hand"){
        cpuHandTurn();
        
    }
    else if (turn == "cpu flip"){
        cpuFlipTurn();
        clickedFieldCard = "";
    }

    //remeber to set clickedPlayerCard to "" when leaving cpu flip turn

    //console.log(turn);
    mainClickFlag = 0;
    fieldClickFlag = 0;
    clickedFieldCard = "";
    display();
}   

//var yaku = new(Yaku(deck));

export default play();