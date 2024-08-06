import Deck from "./deck.js";
import Card from "./deck.js"

export class Yaku {
    constructor(cardArr=[]){
    this.cardArr = cardArr;

    this.hasYaku = false;

    this.allYakus = [];
    this.allYakus = [];
    this.allPoints = [];
    this.totalPoints = 0;

    this.almostChaff = false;
    this.almostAnimal = false;
    this.almostRibbon = false;
    this.almostLights = false;
    
    this.almostBDB = false;
    this.almostRPR = false;
    this.almostBPR = false;
    this.almostLWR = false;
    this.almostCBV = false;
    this.almostMV = false;

    this.atChaff = false;
    this.atAnimal = false;
    this.atRibbon = false;
    this.atLights = false;
    
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

    removeDuplicates(arr) {
        let unique = arr.reduce(function (acc, curr) {
            if (!acc.includes(curr))
                acc.push(curr);
            return acc;
        }, []);
        return unique;
    }

    clear(){
        this.cardArr = cardArr;    
        this.hasYaku = false;
        this.hasKoiKoid = false;        
        this.allYakus = [];
        this.allPoints = [];
        this.totalPoints = 0;        
        this.almostChaff = false;
        this.almostAnimal = false;
        this.almostRibbon = false;
        this.almostLights = false;
           
        this.almostBDB = false;
        this.almostRPR = false;
        this.almostBPR = false;
        this.almostLWR = false;
        this.almostCBV = false;
        this.almostMV = false;
        
        this.atChaff = false;
        this.atAnimal = false;
        this.atRibbon = false;
        this.atLights = false;
            
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

        //seems obvious now i could have used a more efficient list of list or map or something instead of formating so much text
        this.chaff  = this.removeDuplicates(this.chaff)
        this.animal = this.removeDuplicates(this.animal)
        this.ribbon = this.removeDuplicates(this.ribbon)
        this.lights = this.removeDuplicates(this.lights)


        this.BDB = this.removeDuplicates(this.BDB)
        this.RPR = this.removeDuplicates(this.RPR)
        this.BPR = this.removeDuplicates(this.BPR)
        this.CBV = this.removeDuplicates(this.CBV)
        this.MV = this.removeDuplicates(this.MV)
        this.LWR =  this.removeDuplicates(this.LWR)
    }


    check(){
        
        //this will allow the program to check if the score has changed so the win condition is only met during the change in yaku state

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
   
    //for displaying captured card names
    isAlmost(card){
        if (this.almostChaff == true){
            return this.chaff.includes(card);
        }
        if (this.almostAnimal == true){
            return this.animal.includes(card);
        }
        if (this.almostRibbon == true){
            return this.ribbon.includes(card);
        }
        if (this.almostLights == true){
            return this.lights.includes(card);
        }
        
        if (this.almostBDB == true){
            return this.BDB.includes(card);
        }
        if (this.almostRPR == true){
            return this.RPR.includes(card);
        }
        if (this.almostBPR == true){
            return this.BPR.includes(card);
        }
        if (this.almostLWR == true){
            return this.LWR.includes(card);
        }
        if (this.almostCBV == true){
            return this.CBV.includes(card);
        }
        if (this.almostMV == true){
            return this.MV.includes(card);
        }
    }

    //for displaying captured card names
    isAt(card){
        if (this.atChaff == true){
            return this.chaff.includes(card);
        }
        if (this.atAnimal == true){
            return this.animal.includes(card);
        }
        if (this.atRibbon == true){
            return this.ribbon.includes(card);
        }
        if (this.atLights == true){
            return this.lights.includes(card);
        }
        
        if (this.atBDB == true){
            return this.BDB.includes(card);
        }
        if (this.atRPR == true){
            return this.RPR.includes(card);
        }
        if (this.atBPR == true){
            return this.BPR.includes(card);
        }
        if (this.atLWR == true){
            return this.LWR.includes(card);
        }
        if (this.atCBV == true){
            return this.CBV.includes(card);
        }
        if (this.atMV == true){
            return this.MV.includes(card);
        }
    }

    returnYakus(A){
        var yakus = []
        var y = {
            name: "",
            cards: [],
            points: 0
        }
/*
        chaff
        animal
        ribbon
        lights
        
        LWR   
        BDB
        RPR
        BPR
        CBV
        MV*/
        for(var i = 0;i<A.length;i++){
       
        


        if (this.atChaff == true){
            y.name = "Chaff";
            y.cards = this.chaff;


            yakus.push(y);
        }
        if (this.atAnimal == true){
            y.name = "Animals";
            y.cards = this.animal;

            yakus.push(y);

        }
        if (this.atRibbon == true){
            y.name = "Ribbons";
            y.cards = this.ribbon;

            yakus.push(y);

        }
        if (this.atLights == true){
            y.name = "Lights";
            y.cards = this.lights;

            yakus.push(y);

        }
        if (this.atBDB == true){
            y.name = "Boar, Deer, Butterflies";
            y.cards = this.BDB;

            yakus.push(y);

        }
        if (this.atRPR == true){
            y.name = "Red Poetry Slips";
            y.cards = this.RPR;

            yakus.push(y);

        }
        if (this.atBPR == true){
            y.name = "Blue Poetry Slips";
            y.cards = this.BPR;

            yakus.push(y);

        }
        if (this.atLWR == true){
            y.name = "Lights with Rain";
            y.cards = this.LWR;

            yakus.push(y);

        }
        if (this.atCBV == true){
            y.name = "Cherry Blossom Viewing";
            y.cards = this.CBV;

            yakus.push(y);

        }
        if (this.atMV == true){
            y.name = "Moon Viewing";
            y.cards = this.MV;

            yakus.push(y);

        }
        console.log(yakus);
        
        }
    return yakus
    }



    

}









export default Yaku;