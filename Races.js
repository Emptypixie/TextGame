class Race extends Job{
    constructor(creature, name){
        if(creature == undefined || name == undefined)
            throw Error("check constructor of " + typeof this);
        else
            super(creature, name);
    }
}

class rGoblin extends Race{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'goblin');
        } else {
            super(creature, name);
        }
    }

    addskill(){
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell = {};
    }

    addstat(){
        this.creature.HP += 1;
    }
}

class rHuman extends Race{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'human');
        } else {
            super(creature, name);
        }
    }

    addskill(){
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell = {};
    }

    addstat(){
        this.creature.HP += 1;
    }
}

class rSkeleton extends Race{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'skeleton');
        } else {
            super(creature, name);
        }
    }

    addskill(){
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell = {};
    }

    addstat(){
        this.creature.HP += 1;
    }
}

class rDragon extends Race{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'dragon');
        } else {
            super(creature, name);
        }
    }
    addskill(){
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell["fireball"] = FireBall1;
    }

    addstat(){
        this.creature.HP += 1;
    }
}