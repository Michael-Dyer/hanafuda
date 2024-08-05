import Deck from "./deck.js";
import Card from "./deck.js"
import Yaku from "./yaku.js"



export class CPULogic{
    constructor(hand,field,capturedCards,playerCapturedCards,flippedCard=""){
        this.hand = hand;
        this.field = field;
        this.capturedCards = capturedCards;
        this.flippedCard = flippedCard;
        this.playerCapturedCards = playerCapturedCards;
        this.yaku = new Yaku;

        this.posiblePairs = [];
        this.bestPair = [];
        this.worstCard = ""

    }

    update(hand,field,capturedCards,playerCapturedCards,flippedCard){
        this.hand = hand;
        this.field = field;
        this.capturedCards = capturedCards;
        this.flippedCard = flippedCard;
        this.playerCapturedCards = playerCapturedCards;
        //this.yaku = new Yaku;

        this.posiblePairs = [];
        this.bestPair = [];
        this.worstCard = ""

    }

    findWorstCard(){
        var lowestValue = this.hand[0].potentialValue;
        var worstIndex = 0;
        
        for(var i = 1;i<this.hand.length;i++){
            if(this.hand[i].potentialValue<lowestValue){
                lowestValue = this.hand[i].potentialValue;
                worstIndex = i;
            }
        }
        this.worstCard = this.hand[worstIndex];
        
    }

    getPossiblePairs(card){ 
        
        for(var i = 0;i<this.field.length;i++){
            var pair = {
                card1: "",
                card2: "",
            }

            if(card.month==this.field[i].month){
                
                pair.card1 = card;
                pair.card2 = this.field[i];
                
            }
            if (pair.card1!=""&&pair.card2!=""){
                this.posiblePairs.push(pair);

            }
        }

    }

    getFlipPairs(){

        this.getPossiblePairs(this.flippedCard)
        
        this.findBestPair();
    }

    

    findBestPair(){
        var highestValue = 0;
        var bestPairIndex = -1;
        for (var i = 0;i<this.posiblePairs.length;i++){
            var currentValue = this.posiblePairs[i].card1.potentialValue + this.posiblePairs[i].card2.potentialValue;

            if(currentValue >= highestValue){
                highestValue = currentValue;
                bestPairIndex = i;
            }
        }
        this.bestPair = this.posiblePairs[bestPairIndex]       
    }

    getHandPairs(){
        for(var i = 0;i<this.hand.length;i++){
            this.getPossiblePairs(this.hand[i]);
        }
        this.findBestPair();
    }



    

    

    


}



export default CPULogic;