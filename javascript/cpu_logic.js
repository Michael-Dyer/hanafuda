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

        this.posiblePairs = {

        }
    }

    update(hand,field,capturedCards,flippedCard=""){
        this.hand = hand;
        this.field = field;
        this.capturedCards = capturedCards;
        this.flippedCard = flippedCard;
    }


}



export default CPULogic;