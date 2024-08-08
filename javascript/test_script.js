import CPULogic from "./cpu_logic.js";
import Deck from "./deck.js"
import Yaku from "./yaku.js"


//test script is a modification to easily debug scoring and koi-koi rules

//let deck = new Deck();
//deck.newDeck();
//deck.shuffle();
let deck;

var startingPlayer;
var playerScoring = new Yaku([]);
let player = {
    hand: [],
    capturedCards: [],
    score: 0,
    yakus: [],
    roundPoints: 0,
    hasKoiKoid: false,
    justWon: false,
    startedThisRound: false,
    cancledKoiKoi: false,
    justKoiKoid: false
}

var cpuScoring = new Yaku([]);
let cpu = {
    hand: [],
    capturedCards: [],
    score: 0,
    //firstYakus : [],
    roundPoints: 0,
    hasKoiKoid: false,
    justWon: false,
    startedThisRound: true,
    cancledKoiKoi: false,
    justKoiKoid: false,
    shownCard: ""
}

function clearOppCards(opp){
    opp.hand = [];
    opp.capturedCards = [];
    opp.roundPoints = 0;
    opp.hasKoiKoid = false;
    opp.justKoiKoid = false;
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


let round = 0;
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

        //blackout cpu card
        img.style.filter="brightness(0%)"
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
 
}



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



    function getTempPoints(opp){
        var tempPoints = 0
        if(opp==player){
           for (const y in opp.yakus){
                tempPoints+=playerScoring.scoreByName(opp.yakus[y])
            }
        }
        else if (opp==cpu){
            for (const y in opp.yakus){
                tempPoints+=cpuScoring.scoreByName(opp.yakus[y])
            }
        } 
        return tempPoints;
    }


function playerKoiKoiOption(){
    var scoringPromt = ""
    for (const y in player.yakus){
        scoringPromt += `
        You have ${playerScoring.scoreByName(playerScoring.yakus[y])} points with ${player.yakus[y]}!
        `;
    }
    
    if(confirm(`${scoringPromt}Would you like to Koi Koi?
        `)){
        console.log("you've koi koid")
        player.hasKoiKoid = true;
        console.log(player.hasKoiKoid)

        //update so player doesn't win if they get a yaku this flip
        playerScoring.getYakus();
        player.yakus = playerScoring.yakus;
        player.roundPoints = getTempPoints(player);
        player.justKoiKoid = true;
    }
    else{
        console.log("ya won by not koi koiing")
        player.cancledKoiKoi = true;
        playerWinAlert();
    }

}

function cpuKoiKoiOption(){
    var scoringPromt = ""
    for (const y in cpu.yakus){
        scoringPromt += `
        You have ${cpuScoring.scoreByName(cpu.yakus[y])} points with ${cpu.yakus[y]}!
        `;
    }
    
    //use this alert for testing, automate later
    if(confirm(`${scoringPromt}Would you like cpu to Koi Koi?
        `)){
        console.log("cpu has koi koid")
        cpu.hasKoiKoid = true;
        console.log(cpu.hasKoiKoid)
        //update round points so win doesn't happen on the flip
        cpuScoring.getYakus();   
        cpu.yakus = cpuScoring.yakus;
        cpu.roundPoints = getTempPoints(cpu);
        cpu.justKoiKoid = true;
    }
    else{
        console.log("cpu won not koi koing")
        cpu.cancledKoiKoi = true;
        cpuWinAlert();
    }

}

//make sure to let the last winner start the next round
function playerWinAlert(){
    var scoringPromt = ""
    var tempPoints = 0
    //The win should only take place after the flip turn, therefore i am setting the win condition to be at the start of the round right after the flip
    //player win condition
    console.log("in player win")
    if (turn=="cpu hand"||player.cancledKoiKoi==true||(player.hand.length==0&&cpu.hand.length==0)){
       
        scoringPromt="You've won this round!\n\n"

        for (const y in player.yakus){
            scoringPromt += `
            You have ${playerScoring.scoreByName(playerScoring.yakus[y])} points with ${player.yakus[y]}!
            `;
            tempPoints+=playerScoring.scoreByName(playerScoring.yakus[y])
        }

        if (tempPoints>=7){
            tempPoints=tempPoints*2;
            scoringPromt+="\nX2 points for getting over 7 points\n"
        }
        if (cpu.hasKoiKoid){
            tempPoints=tempPoints*2;
            scoringPromt+="\nX2 points because the cpu has called Koi-Koi\n"

        }
        scoringPromt+=`That will award you ${tempPoints} point(s) this round`
        alert(scoringPromt)
        player.score+=tempPoints
        //make sure to add a way to reset all vaules except for player score
        player.justWon=true;
        console.log(`im in player just won funtion and the result is${player.justWon}`)
        newRound();
    }
}

    //cpu win conditions
    function cpuWinAlert(){
        var scoringPromt = ""
        var tempPoints = 0
        console.log("in cpu win")
        if (turn=="player hand"||cpu.cancledKoiKoi==true||(player.hand.length==0&&cpu.hand.length==0)){   
            scoringPromt="The CPU has won this round!\n\n"
            for (const y in cpu.yakus){
                scoringPromt += `
                Cpu has ${cpuScoring.scoreByName(cpuScoring.yakus[y])} points with ${cpuScoring.yakus[y]}!
                `;
                tempPoints+=cpuScoring.scoreByName(cpuScoring.yakus[y])
            }

            if (tempPoints>=7){
                tempPoints=tempPoints*2;
                scoringPromt+="\nX2 points for getting over 7 points\n"
            }
            if (player.hasKoiKoid){
                tempPoints=tempPoints*2;
                scoringPromt+="\nX2 points because player has called Koi-Koi\n"

            }
            scoringPromt+=`That will award the cpu ${tempPoints} point(s) this round`
            alert(scoringPromt)
            cpu.score+=tempPoints
            //make sure to add a way to reset all vaules except for player score
            cpu.justWon = true;
            console.log(`im in cpu just won funtion and the result is${cpu.justWon}`)

            newRound();
            
    }
}



function checkWinConditions(){
    playerScoring.getYakus();
    cpuScoring.getYakus();
    
    cpu.yakus = cpuScoring.yakus;
    player.yakus = playerScoring.yakus;

    console.log("cpu stats----")
    console.log(cpu.roundPoints)
    console.log(getTempPoints(cpu))

    console.log("player stats----")
    console.log(player.roundPoints)
    console.log(getTempPoints(player))

    //player koi koi condition
    if (player.hasKoiKoid==false&&playerScoring.yakus.length>0&&cpu.hasKoiKoid==false){
        console.log("in player koi koi option")
        playerKoiKoiOption();       
    }

    //cpu koi koi condition
    if (cpu.hasKoiKoid==false&&cpuScoring.yakus.length>0&&player.hasKoiKoid==false){
        console.log("in cpu koi koi option")
        cpuKoiKoiOption();
    }

    //player win on having points after cpu koi koid
    if (player.roundPoints<getTempPoints(player)&&cpu.hasKoiKoid==true){
        console.log("in player win after a koi koi by opp")
        playerWinAlert();
    }

    //cpu win if points after koi koi
    if (cpu.roundPoints<getTempPoints(cpu)&&player.hasKoiKoid==true){
        console.log("in cpu win after koi koi by opp")
        cpuWinAlert();
    }
   
    //player gets more points after koi koi
    if(player.roundPoints<getTempPoints(player)&&player.roundPoints>0){
        console.log("inregular player win")
        playerWinAlert();    
    }

    //cpu gets more points after koi koi
    if(cpu.roundPoints<getTempPoints(cpu)&&cpu.roundPoints>0){
        console.log("in reg cpu win")
        cpuWinAlert();    
    }

    



}



function newRound(){
    cpu.shownCard = ""
    player.cancledKoiKoi = false;
    cpu.cancledKoiKoi = false;
    round++;
    playerScoring.clear();
    cpuScoring.clear();
    clearOppCards(player);
    clearOppCards(cpu);

    fieldCards = [];
    flippedCard = "";

    clickedPlayerCard = "";
    clickedFieldCard = "";

    fieldClickFlag = 0;
    playerCardClickFlag = 0;
    fieldCardClickFlag = 0;

    mainClickFlag = 0;
    cpu_flag = 0;
    console.log(`player justwon ${player.justWon}`)
    console.log(`cpu justwon ${cpu.justWon}`)

    
    
    //tie condition
    if(player.justWon==false&&cpu.justWon==false){
        if(player.startedThisRound==true){
            turn="cpu hand"
            cpu.startedThisRound=true;
            player.startedThisRound=false;
        }
        else if (cpu.startedThisRound==true){
            turn="player hand"
            player.startedThisRound=true;
            cpu.startedThisRound=false;
        }
    }
    else if(player.justWon==true){
        player.justWon=false;
        turn="player hand"
        player.startedThisRound=true;
        cpu.startedThisRound=false;
    }
    else if(cpu.justWon==true){
        cpu.justWon=false;
        turn="cpu hand"
        cpu.startedThisRound=true;
        player.startedThisRound=false;
    }

    deck = new Deck();
    deck.newDeck()
    deck.shuffle();
    initialDeal(deck);
    display();
    
    brain.update(cpu.hand,fieldCards,cpu.capturedCards,player.capturedCards,flippedCard);
    

  
}

//make sure the right opp starts
function checkTie(){
    if(turn=="player hand"||turn=="cpu hand"){
        if(player.hand.length==0&&cpu.hand.length==0){
            playerScoring.getYakus();
            cpuScoring.getYakus();
    
            cpu.yakus = cpuScoring.yakus;
            player.yakus = playerScoring.yakus;

            if (cpu.yakus.length>0){
                cpuWinAlert();

            }
            else if (player.yakus.length>0){
                playerWinAlert();
            }
            else{
                alert("Tie game: no points awarded")
            }

        

    
        newRound();
        }
    }
}


//initialDeal(deck);
newRound();

//make sure to implement a tie if neither player gets a yaku
function play(){
    display();

    checkTie()

    


    playerScoring.fill(player.capturedCards);
    cpuScoring.fill(cpu.capturedCards);
    playerScoring.check();
    cpuScoring.check();
    
    if (turn == "player hand"){
        cpu.justKoiKoid=false;
        playerHandTurn();
    }

    else if (turn == "player flip"){
        playerFlipTurn();
        if (player.justKoiKoid==true){
        }
        else{
            checkWinConditions();
        }
    }
    else if (turn == "cpu hand"){
        cpuHandTurn();
        player.justKoiKoid=false;
    }
    else if (turn == "cpu flip"){
        cpuFlipTurn();
        clickedFieldCard = "";


        if (cpu.justKoiKoid==true){
        }
        else{
            checkWinConditions();
        }
    }


    mainClickFlag = 0;
    fieldClickFlag = 0;
    clickedFieldCard = "";
    display();
}   


export default play();