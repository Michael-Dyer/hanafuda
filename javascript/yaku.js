import Deck from "./deck.js";
import Card from "./deck.js"

export class Yaku {
    constructor(cardArr){
    this.cardArr = cardArr;

    this.isYaku = false;
    this.hasKoiKoid = false;

    this.almostChaff = false;
    this.almostAnimal = false;
    this.almostRibbon = false;
    this.almostLights = false
    
    this.almostBDB = false;
    this.almostRPR = false;
    this.almostBPR = false;
    this.almostLWR = false;
    this.almostCBV = false;
    this.almostMV = false;

    this.atChaff = false;
    this.atAnimal = false;
    this.atRibbon = false;
    this.atLights = false
    
    this.atBDB = false;
    this.atRPR = false;
    this.atBPR = false;
    this.atLWR = false;
    this.atCBV = false;
    this.atMV = false;
   
    
    this.chaff = [];
    this.animal = [];
    this.ribbon = [];
    this.lights = [];

    
    this.BDB = [];
    this.RPR = [];
    this.BPR = [];
    this.CBV = [];
    this.MV = [];

    this.containsRain = false;
    this.LWR = [];
    
    }

    clear(){
    this.isYaku = false;
    this.hasKoiKoid = false;

    this.almostChaff = false;
    this.almostAnimal = false;
    this.almostRibbon = false;
    this.almostLights = false
    
    this.almostBDB = false;
    this.almostRPR = false;
    this.almostBPR = false;
    this.almostLWR = false;
    this.almostCBV = false;
    this.almostMV = false;

    this.atChaff = false;
    this.atAnimal = false;
    this.atRibbon = false;
    this.atLights = false
    
    this.atBDB = false;
    this.atRPR = false;
    this.atBPR = false;
    this.atLWR = false;
    this.atCBV = false;
    this.atMV = false;
   
    
    this.chaff = [];
    this.animal = [];
    this.ribbon = [];
    this.lights = [];

    
    this.BDB = [];
    this.RPR = [];
    this.BPR = [];
    this.CBV = [];
    this.MV = [];

    this.containsRain = false;
    this.LWR = [];
    }

    fill(A=this.cardArr){
        for(var i = 0;i<A.length;i++){
            
            if (A[i].value == "rain"){
                this.LWR.push(A[i])
                this.containsRain = true;
            }

            if(A[i].value == "boar" || A[i].value == "deer" || A[i].value == "butterflies" ){
                this.BDB.push(A[i]);   
            }

            if(A[i].value == "red poem ribbon"){
                this.RPR.push(A[i]);
            }

            if(A[i].value == "blue poem ribbon"){
                this.BPR.push(A[i]);
            }

            if (A[i].value == "sake"){
                this.CBV.push(A[i])
                this.MV.push(A[i])
            }

            if (A[i].value == "curtain"){
                this.CBV.push(A[i])
            }

            if (A[i].value == "moon"){
                this.MV.push(A[i])
            }

            if(A[i].isLight){
                this.lights.push(A[i])
            }

            if(A[i].isChaff){
                this.chaff.push(A[i])
            }

            if(A[i].isAnimal){
                this.animal.push(A[i])
            }

            if(A[i].isRibbon){
                this.ribbon.push(A[i])
            }
        }
    }

    check(){
        if(this.chaff.length>=10){
            this.atChaff = true;
        }
        if(this.chaff.length==9){
            this.almostChaff = true;
        }

        if(this.animal.length>=5){
            this.atAnimal = true;
        }
        if(this.animal.length==4){
            this.almostAnimal=true;
        }

        if(this.ribbon.length>=5){
            this.atRibbon = true;
        }
        if(this.ribbon.length==4){
            this.almostRibbon=true;
        }

        if(this.lights.length>=3){
            this.atLights=true;
        }
        
        if(this.lights.length==2){
            this.almostLights=true;
        }

        if(this.lights.length>=3&&this.containsRain==true){
            this.atLWR=true;
        }
        if((this.containsRain&&this.lights.length==2)||this.lights.length==2){
            this.almostLWR=true;
        }

        if(this.BDB.length>=3){
            this.atBDB=true;
        }
        if(this.BDB.length==2){
            this.almostBDB=true;
        }

        if(this.RPR.length>=3){
            this.atRPR=true;
        }
        if(this.RPR.length==2){
            this.almostRPR=true;
        }
        
        if(this.BPR.length>=3){
            this.atBPR=true;
        }
        if(this.BPR.length==2){
            this.almostBPR=true;
        }

        if(this.MV.length==2){
            this.atMV=true;
        }
        if(this.MV.length==1){
            this.almostMV=true;
        }

        if(this.CBV.length==2){
            this.atCBV=true;
        }
        if(this.CBV.length==1){
            this.almostCBV=true;
        }

    }
    

}
var deck = new Deck(); 
deck.newDeck();


var yaku = new Yaku(deck.cards);









export default Yaku;