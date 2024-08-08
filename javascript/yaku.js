import Deck from "./deck.js";
import Card from "./deck.js"

export class Yaku {
    constructor(cardArr=[]){
    this.cardArr = cardArr;

    this.hasYaku = false;

    this.almostArr = [];
    this.atArr = [];



    this.yakus = [];
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

    removeYakuDuplicates(arr) {
        let unique = arr.reduce(function (acc, cur) {
            if (!acc.includes(curr.name))
                acc.push(curr);
            return acc;
        }, []);
        return unique;

    }

    clear(){
        this.cardArr = cardArr;    
        this.hasYaku = false;
        this.hasKoiKoid = false;        
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
        if((this.containsRain&&this.lights.length==3)||this.lights.length==2){
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
        this.almostArr = this.removeDuplicates(this.almostArr);
        if (this.almostChaff == true&&this.chaff.includes(card)){
            this.almostArr.push(card)
            return;
            
        }
        if (this.almostAnimal == true&&this.animal.includes(card)){
            this.almostArr.push(card)
            return;
        }
        if (this.almostRibbon == true&&this.ribbon.includes(card)){
            this.almostArr.push(card)
            return;
        }
        if (this.almostLights == true&&this.lights.includes(card)){
            this.almostArr.push(card)
            return;
        }
        
        if (this.almostBDB == true&&this.BDB.includes(card)){
            this.almostArr.push(card)
            return;
        }
        if (this.almostRPR == true&&this.RPR.includes(card)){
            this.almostArr.push(card)
            return;
        }
        if (this.almostBPR == true&&this.BPR.includes(card)){
            this.almostArr.push(card)
            return;

        }
        if (this.almostLWR == true&&this.LWR.includes(card)){
            this.almostArr.push(card)
            return;
        }
        if (this.almostCBV == true&&this.CBV.includes(card)){
            this.almostArr.push(card)
            return;
        }
        if (this.almostMV == true&&this.MV.includes(card)){
            this.almostArr.push(card)
            return;
        }
        
    }

    //for displaying captured card names
    isAt(card){
        this.atArr = this.removeDuplicates(this.atArr);

        if (this.atLWR == true&&this.LWR.includes(card)){
            this.atArr.push(card)
            return;
        }
        if (this.atCBV == true&&this.CBV.includes(card)){
            this.atArr.push(card)
            return;
        }
        if (this.atMV == true&&this.MV.includes(card)){
            this.atArr.push(card)
            return;
        }
        if (this.atBDB == true&&this.BDB.includes(card)){
            this.atArr.push(card)
            return;
        }
        if (this.atRPR == true&&this.RPR.includes(card)){
            this.atArr.push(card)
            return;
        }
        if (this.atBPR == true&&this.BPR.includes(card)){
            this.atArr.push(card)
            return;
    
        }
        
        if (this.atChaff == true&&this.chaff.includes(card)){
            this.atArr.push(card)
            return;
            
        }
        if (this.atAnimal == true&&this.animal.includes(card)){
            this.atArr.push(card)
            return;
        }
        if (this.atRibbon == true&&this.ribbon.includes(card)){
            this.atArr.push(card)
            return;
        }
        if (this.atLights == true&&this.lights.includes(card)){
            this.atArr.push(card)
            return;
        }
        
    }

    

    getYakus(){
        if (this.atLWR == true){
            this.yakus.push("Lights With Rain")
            this.yakus = this.yakus.filter(e => e !== 'Lights')
        }
        if (this.atCBV == true){
            this.yakus.push("Cherry Blossom Viewing")
        }
        if (this.atMV == true){
            this.yakus.push("Moon Viewing")
        }
        if (this.atBDB == true){
            this.yakus.push("Boar, Deer, Butterflies")
        }
        if (this.atRPR == true){
            this.yakus.push("Red Poetry Ribbons")
        }
        if (this.atBPR == true){
            this.yakus.push("Blue Poetry Ribbons")
        
        }
        
        if (this.atChaff == true){
            this.yakus.push("Chaff")
            
        }
        if (this.atAnimal == true){
            this.yakus.push("Animals")
        }
        if (this.atRibbon == true){
            this.yakus.push("Ribbons")
        }
        if (this.atLights == true&&this.atLWR ==false){
            this.yakus.push("Lights")
        }
    
    this.yakus = this.removeDuplicates(this.yakus);
        
    }
        
        
    scoreByName(name){
        var points = 0;
        if (name=="Chaff"){
            points = this.chaff.length - 9;

            return points;
        }
        else if (name=="Animals"){
            points = this.animal.length - 4;
          
            return points;
        }
        else if (name=="Ribbons"){
            points = this.ribbon.length - 4;
            return points;
        }
        else if (name=="Lights"){
            if(this.lights.length==3){
                points = 5;
            }
            else if(this.lights.length){
                points = 8;
            }
            return points;
        }

        else if (name=="Lights With Rain"){
            if(this.lights.length==3){
                points = 7;
            }
            else if (this.lights.length==4){
                points = 10;
            }
            return points;
        }
        else if (name=="Cherry Blossom Viewing"){
            points = 5;
            return points;
        }
        else if (name=="Moon Viewing"){
            points = 5;
            return points;
        }
        else if (name=="Boar, Deer, Butterflies"){
            var mod = 0;
            if (this.animal.length>3){
                mod = this.animal.length - 3;
            }


            points = 5 + mod;
            return points;
        }
        else if (name=="Red Poetry Ribbons"){
            var mod = 0;
            if (this.ribbon.length>3){
                mod = this.ribbon.length - 3;
            }


            points = 5 + mod;
            return points;
        }
        else if (name=="Blue Poetry Ribbons"){
            var mod = 0;
            if (this.ribbon.length>3){
                mod = this.ribbon.length - 3;
            }


            points = 5 + mod;
            return points;
        }
        else {
            return points;
        }
    }

    scoreTotal(names){
        var score = 0
        for(var i=0;i<names.length;i++){
            score+=this.scoreByName(names[i])
        }
        return score;
    }
    
    

    



    

}









export default Yaku;