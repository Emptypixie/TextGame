class Goblin extends Monster{
    constructor(name){
        if(name == undefined){
            super('goblin');
        } else {
            super(name);
        }
        this.basexp = 10;
    }
    setmaxminlv(){
        this.maxlevel = 10;
        this.minlevel = 1;
    }

    setJob(){
        this.job[0] = new jWarrior(this);
    }

    setRace(){
        this.race = new rGoblin(this);
    }

    examine(){
        return "goblin...";
    }
};

class Zombie extends Monster{
    constructor(name){
        if(name == undefined){
            super('zombie');
        } else {
            super(name);
        }
        this.basexp = 10;
    }
    setmaxminlv(){
        this.maxlevel = 10;
        this.minlevel = 1;
    }

    setJob(){
        this.job[0] = new jWarrior(this);
    }

    setRace(){
        this.race = new rSkeleton(this);
    }

    examine(){
        return "Zombie...";
    }
};

class Dark_Warrior extends Monster{
    constructor(name){
        if(name == undefined){
            super('dark warrior');
        } else {
            super(name);
        }
        this.basexp = 20;
    }
    setmaxminlv(){
        this.maxlevel = 20;
        this.minlevel = 10;
    }

    setJob(){
        this.job[0] = new jWarrior(this);
    }

    setRace(){
        this.race = new rHuman(this);
    }

    examine(){
        return "A sinister warrior.";
    }
}

class Dark_Priest extends Monster{
    constructor(name){
        if(name == undefined){
            super('dark priest');
        } else {
            super(name);
        }
        this.basexp = 20;
    }
    setJob(){
        this.job[0] = new jPriest(this);
    }

    setRace(){
        this.race = new rHuman(this);
    }

    setmaxminlv(){
        this.maxlevel = 20;
        this.minlevel = 10;
    }

    examine(){
        return "A sinister priest.";
    }
}

class Black_Dragon extends Monster{
    constructor(name){
        if(name == undefined){
            super('black dragon');
        } else {
            super(name);
        }
        this.basexp = 1000;
    }
    setJob(){
        this.job = [];
    }

    setRace(){
        this.race = new rDragon(this);
    }
    
    setmaxminlv(){
        this.maxlevel = 10000;
        this.minlevel = 100;
    }

    examine(){
        return "A legendary black dragon.";
    }
}