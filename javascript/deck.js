const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class Card{
    constructor(month, value, imgName){
        this.month = month;
        this.value = value;
        this.imgName = imgName;
        this.cardName = `${month} ${value}`;
        this.potentialValue = 0;
        //check ribbon
        if (value == "red poem ribbon" || value == "blue poem ribbon" || value == "ribbon"){
            this.isRibbon = true;
        }
        else {
            this.isRibbon = false;
        }
        //check light
        if (value == "crane" || value == "moon" || value == "curtain" || value == "pheonix"){
            this.isLight = true;
        }
        else {
            this.isLight = false;
        }
        //check animal
        if (value == "animal" || value == "boar" || value == "deer" || value == "butterflies" || value == "sake"){
            this.isAnimal = true;
        }
        else {
            this.isAnimal = false;
        }
        //check chaff
        if (value == "chaff1" || value == "chaff2" || value == "chaff3"){
            this.isChaff = true;
        }
        else{
            this.isChaff = false;
        }

        //calculate potential initial value for cpu
        if (value == "sake" || value == "moon" || value == "curtain"){
            this.potentialValue = 20;
        }
        
        else if (this.isLight){
            this.potentialValue = 15;
        }
        else if (value == "rain"){
            this.potentialValue = 11;
        }

        else if (value == "red poem ribbon" || value == "blue poem ribbon"|| value == "boar" || value == "deer" || value == "butterflies"){
            this.potentialValue = 10;
        }

        else if (this.isAnimal||this.isRibbon){
            this.potentialValue = 5;
        }

        else {
            this.potentialValue = 1;
        }

    }

    
}


class Deck {   

    newDeck() {
        let cardArr = []
        for (let i = 0;i<months.length;i++){
            //cardArr.push(new Card(months[i], "chaff"));
            if (i == 0){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-01-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-01-03.jpg"));
                cardArr.push(new Card(months[i], "red poem ribbon", "./media/sm_Hana-01-02.jpg"));
                cardArr.push(new Card(months[i], "crane", "./media/sm_Hana-01-01.jpg"));
            }
            if (i == 1){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-02-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-02-03.jpg"));
                cardArr.push(new Card(months[i], "red poem ribbon", "./media/sm_Hana-02-02.jpg"));
                cardArr.push(new Card(months[i], "animal", "./media/sm_Hana-02-01.jpg"));
            }
            if (i == 2){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-03-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-03-03.jpg"));
                cardArr.push(new Card(months[i], "red poem ribbon", "./media/sm_Hana-03-02.jpg"));
                cardArr.push(new Card(months[i], "curtain", "./media/sm_Hana-03-01.jpg"));
            }
            if (i == 3){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-04-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-04-03.jpg"));
                cardArr.push(new Card(months[i], "animal", "./media/sm_Hana-04-01.jpg"));
                cardArr.push(new Card(months[i], "ribbon", "./media/sm_Hana-04-02.jpg"));
            }
            if (i == 4){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-05-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-05-03.jpg"));
                cardArr.push(new Card(months[i], "animal", "./media/sm_Hana-05-01.jpg"));
                cardArr.push(new Card(months[i], "ribbon", "./media/sm_Hana-05-02.jpg"));
            }
            if (i == 5){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-06-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-06-03.jpg"));
                cardArr.push(new Card(months[i], "blue poem ribbon", "./media/sm_Hana-06-02.jpg"));
                cardArr.push(new Card(months[i], "butterflies", "./media/sm_Hana-06-01.jpg"));
            }
            if (i == 6){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-07-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-07-03.jpg"));
                cardArr.push(new Card(months[i], "boar", "./media/sm_Hana-07-01.jpg"));
                cardArr.push(new Card(months[i], "ribbon", "./media/sm_Hana-07-02.jpg"));
            }
            if (i == 7){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-08-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-08-03.jpg"));
                cardArr.push(new Card(months[i], "animal", "./media/sm_Hana-08-02.jpg"));
                cardArr.push(new Card(months[i], "moon", "./media/sm_Hana-08-01.jpg"));
            }
            if (i == 8){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-09-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-09-03.jpg"));
                cardArr.push(new Card(months[i], "sake", "./media/sm_Hana-09-01.jpg"));
                cardArr.push(new Card(months[i], "blue poem ribbon", "./media/sm_Hana-09-02.jpg"));
            }
            if (i == 9){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-10-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-10-03.jpg"));
                cardArr.push(new Card(months[i], "deer", "./media/sm_Hana-10-01.jpg"));
                cardArr.push(new Card(months[i], "blue poem ribbon", "./media/sm_Hana-10-02.jpg"));
            }
            if (i == 10){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-11-04.jpg"));
                cardArr.push(new Card(months[i], "animal", "./media/sm_Hana-11-02.jpg"));
                cardArr.push(new Card(months[i], "ribbon", "./media/sm_Hana-11-03.jpg"));
                cardArr.push(new Card(months[i], "rain", "./media/sm_Hana-11-01.jpg"));
            }
            if (i == 11){
                cardArr.push(new Card(months[i], "chaff1", "./media/sm_Hana-12-04.jpg"));
                cardArr.push(new Card(months[i], "chaff2", "./media/sm_Hana-12-03.jpg"));
                cardArr.push(new Card(months[i], "chaff3", "./media/sm_Hana-12-02.jpg"));
                cardArr.push(new Card(months[i], "pheonix", "./media/sm_Hana-12-01.jpg"));
            }

        }
        this.cards = cardArr;
        return this;
    }

    shuffle() {
        let rand = Math.floor(Math.random() * this.cards.length);

        for (let x = 0; x<this.cards.length;x++){
            let rand = Math.floor(Math.random() * (this.cards.length));
            let temp = this.cards[x];
            this.cards[x] = this.cards[rand];
            this.cards[rand] = temp;
        }
    }
}



export default Deck;
