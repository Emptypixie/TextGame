var WEAPON = 0;
var ARMOUR = 1;
class Equipment extends Item{
    constructor(name){
        if(name == undefined)
            name == "Equipment";
        super(name);
        this.attack = 0;
        this.defense = 0;
        this.magic = 0;
        this.magicdefense = 0;
        this.speed = 0;
        this.prayer = 0;
        this.resistance = 0;
        this.type = undefined;
        this.addstat();
    }
    addstat(){
        throw new Error("add stat in weapon" + typeof this);
    }
}

class SteelSword extends Equipment{
    constructor(){
        super("Steel Sword");
        this.type = WEAPON;
    }
    addstat(){
        this.attack += 20;
        this.speed += 10;
        this.defense += 10;
    }
}

class SteelPlateBody extends Equipment{
    constructor(){
        super("Steel Plate body");
        this.type = ARMOUR;
    }
    addstat(){
        this.attack += 20;
        this.speed += 10;
        this.defense += 30;
    }
}