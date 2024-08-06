isAt(card){
    this.atArr = this.removeDuplicates(this.atArr);
    if (this.almostChaff == true&&this.chaff.includes(card)){
        this.atArr.push(card)
        return;
        
    }
    if (this.almostAnimal == true&&this.animal.includes(card)){
        this.atArr.push(card)
        return;
    }
    if (this.almostRibbon == true&&this.ribbon.includes(card)){
        this.atArr.push(card)
        return;
    }
    if (this.almostLights == true&&this.lights.includes(card)){
        this.atArr.push(card)
        return;
    }
    
    if (this.almostBDB == true&&this.BDB.includes(card)){
        this.atArr.push(card)
        return;
    }
    if (this.almostRPR == true&&this.RPR.includes(card)){
        this.atArr.push(card)
        return;
    }
    if (this.almostBPR == true&&this.BPR.includes(card)){
        this.atArr.push(card)
        return;

    }
    if (this.almostLWR == true&&this.LWR.includes(card)){
        this.atArr.push(card)
        return;
    }
    if (this.almostCBV == true&&this.CBV.includes(card)){
        this.atArr.push(card)
        return;
    }
    if (this.almostMV == true&&this.MV.includes(card)){
        this.atArr.push(card)
        return;
    }
    
}