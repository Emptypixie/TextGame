class rGoblin extends Job{
    constructor(name){
        if(name == undefined){
            super('goblin');
        } else {
            super(name);
        }
    }

    setskill(){
        this.skill["slash"] = Slash1;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage1;
    }

    setspell(){
        this.spell = {};
    }
}

class rHuman extends Job{
    constructor(name){
        if(name == undefined){
            super('human');
        } else {
            super(name);
        }
    }

    setskill(){
        this.skill["slash"] = Slash1;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage1;
    }

    setspell(){
        this.spell = {};
    }
}

class rSkeleton extends Job{
    constructor(name){
        if(name == undefined){
            super('skeleton');
        } else {
            super(name);
        }
    }
    setskill(){
        this.skill["slash"] = Slash1;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage1;
    }

    setspell(){
        this.spell = {};
    }
}

class rDragon extends Job{
    constructor(name){
        if(name == undefined){
            super('dragon');
        } else {
            super(name);
        }
    }
    setskill(){
        this.skill["dragon breath"] = DragonBreath1;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage1;
    }

    setspell(){
        this.spell = {};
    }
}