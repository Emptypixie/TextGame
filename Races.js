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
        addElementIfNotContain(this.creature.skill, Slash1);
    }

    addpassiveskill(){
        addElementIfNotContain(this.creature.passiveskill, Courage1);
    }

    addspell(){
        this.creature.spell = [];
    }

    addstat(){
        this.creature.hp += 13;
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
        addElementIfNotContain(this.creature.skill, Slash1);
    }

    addpassiveskill(){
        addElementIfNotContain(this.creature.passiveskill, Courage1);
    }

    addspell(){
        this.creature.spell = [];
    }

    addstat(){
        this.creature.hp += 1;
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
        addElementIfNotContain(this.creature.skill, Slash1);
    }

    addpassiveskill(){
        addElementIfNotContain(this.creature.passiveskill, Courage1);
    }

    addspell(){
        this.creature.spell = [];
    }

    addstat(){
        this.creature.hp += 2;
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
        addElementIfNotContain(this.creature.skill, Slash1);
    }

    addpassiveskill(){
        addElementIfNotContain(this.creature.passiveskill, Courage1);
    }

    addspell(){
        addElementIfNotContain(this.creature.spell, FireBall1);
    }

    addstat(){
        this.creature.hp += 100;
    }
}


class rZombie extends Race{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'zombie');
        } else {
            super(creature, name);
        }
    }
    addskill(){
        addElementIfNotContain(this.creature.skill, Slash1);
    }

    addpassiveskill(){
        addElementIfNotContain(this.creature.passiveskill, Courage1);
    }

    addspell(){
        addElementIfNotContain(this.creature.spell, FireBall1);
    }

    addstat(){
        this.creature.hp += 10;
    }
}
