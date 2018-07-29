/**
 * Parent class of jobs and races.
 * Constructor does not need any values.
 * The constructor adds skill, passive skill, spell and stats.
 * If a better version of a skill/ps/spell is added, the weaker one will be removed.
 * */
class Job{
    /**
     * @param {Creature} creature The creature gettin this job / race (new jobname(this))
     * @param {String} name The name of the creature. Not needed.
     */
    constructor(creature, name){
        this.name = name;
        this.maxlevel = 15;
        this.level = 1;
        this.creature = creature;
        this.addskill();
        this.addpassiveskill();
        this.addspell();
        this.addstat();
    }
    /**Add skill(s) to creatrue. Called in constructor */
    addskill(){
        alert("add skill! ( " + (typeof this) + " )");
    }

    /**Add passive skill(s) to creatrue. Called in constructor */ 
    addpassiveskill(){
        alert("add passive skill! ( " + (typeof this) + " )")
    }

    /**Add spell(s) to creatrue. Called in constructor */ 
    addspell(){
        alert("add spell! ( " + (typeof this) + " )");
    }
    

    /**Add stat(s) to creatrue. Called in constructor */ 
    addstat(){
        alert("add spell! ( " + (typeof this) + " )");
    }
}

class jWarrior extends Job{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'warrior');
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

    levelup(){
        this.level += 1;
        
        this.creature.hp += 20;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 5;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 0;
        this.creature.magicdef += 1;
        this.creature.attack += 10;
        this.creature.defense += 5;
        this.creature.speed += 3;
        this.creature.prayer += 0;
        this.creature.resistance += 5;
    }
} 

class jMage extends Job{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'mage');
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

    levelup(){
        this.level += 1;
        
        this.creature.hp += 5;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 20;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 10;
        this.creature.magicdef += 5;
        this.creature.attack += 1;
        this.creature.defense += 1;
        this.creature.speed += 3;
        this.creature.prayer += 0;
        this.creature.resistance += 5;
    }
} 

class jRanger extends Job{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'ranger');
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

    levelup(){
        this.level += 1;
        
        this.creature.hp += 10;
        this.creature.hpnow = this.creature.hp;
        this.creature.mp += 8;
        this.creature.hpnow = this.creature.mp;
        this.creature.magic += 1;
        this.creature.magicdef += 1;
        this.creature.attack += 4;
        this.creature.defense += 3;
        this.creature.speed += 6;
        this.creature.prayer += 0;
        this.creature.resistance += 4;
    }
} 

class jPriest extends Job{
    constructor(creature, name){
        if(name == undefined){
            super(creature, 'priest');
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

var jobDict = {0:"warrior", 1:"mage", 2:"ranger", 3:"priest"};