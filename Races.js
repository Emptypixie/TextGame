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
    
    levelup(){
        this.level += 1;
        
        this.creature.hp += 10;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 10;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 5;
        this.creature.magicdef += 3;
        this.creature.attack += 3;
        this.creature.defense += 3;
        this.creature.speed += 2;
        this.creature.prayer += 10;
        this.creature.resistance += 5;
    }
}

class rHuman extends Race{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'human');
        } else {
            super(creature, name);
        }
        this.maxlevel = 1;
    }

    addskill(){
        this.creature.skill = [];
    }

    addpassiveskill(){
        this.creature.passiveskill = [];
    }

    addspell(){
        this.creature.spell = [];
    }

    addstat(){
        this.creature.hp += 1;
    }

    levelup(){
        this.creature.hp += 10;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 10;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 5;
        this.creature.magicdef += 3;
        this.creature.attack += 5;
        this.creature.defense += 3;
        this.creature.speed += 2;
        this.creature.prayer += 1;
        this.creature.resistance += 5;
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

    levelup(){
        this.level += 1;
        
        this.creature.hp += 10;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 10;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 5;
        this.creature.magicdef += 3;
        this.creature.attack += 5;
        this.creature.defense += 3;
        this.creature.speed += 2;
        this.creature.prayer += 0;
        this.creature.resistance += 5;
    }
}

class rDragon extends Race{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'dragon');
        } else {
            super(creature, name);
        }
        this.maxlevel = 5;
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

    levelup(){
        this.level += 1;
        
        this.creature.hp += 50;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 50;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 30;
        this.creature.magicdef += 30;
        this.creature.attack += 30;
        this.creature.defense += 30;
        this.creature.speed += 10;
        this.creature.prayer += 1;
        this.creature.resistance += 100;
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

    levelup(){
        this.level += 1;
        
        this.creature.hp += 6;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 4;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 3;
        this.creature.magicdef += 3;
        this.creature.attack += 3;
        this.creature.defense += 3;
        this.creature.speed += 2;
        this.creature.prayer += 0;
        this.creature.resistance += 2;
    }
}
