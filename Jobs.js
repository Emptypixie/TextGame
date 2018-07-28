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
        /**skill name (lower case string) : skill instance */
        this.skill = {};
        /**passive skill name (lower case string) : passive skill instance */
        this.passiveskill = {};
        /**spell name (lower case string) : spell instance */
        this.spell = {};
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
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell = {};
    }

    addstat(){
        this.creature.hp += 1;
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
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell = {};
    }

    addstat(){
        this.creature.hp += 1;
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
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell = {};
    }

    addstat(){
        this.creature.hp += 1;
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
        this.creature.skill["slash"] = Slash1;
    }

    addpassiveskill(){
        this.creature.passiveskill["courage"] = Courage1;
    }

    addspell(){
        this.creature.spell = {};
    }

    addstat(){
        this.creature.hp += 1;
    }
} 

var jobDict = {0:"warrior", 1:"mage", 2:"ranger", 3:"priest"};