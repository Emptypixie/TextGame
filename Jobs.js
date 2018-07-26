/**
 * dictionary of job classes
 */
var JOBDICT = {
    
};

class Job{
    constructor(name){
        this.name = name;
        this.maxlevel = 15;
        this.level = 1;
        /**skill name (lower case string) : skill instance */
        this.skill = {};
        /**passive skill name (lower case string) : passive skill instance */
        this.passiveskill = {};
        /**spell name (lower case string) : spell instance */
        this.spell = {};
        this.setskill();
        this.setpassiveskill();
        this.setspell();
    }

    setskill(){
        alert("set skill! ( " + (typeof this) + " )");
    }

    setpassiveskill(){
        alert("set passive skill! ( " + (typeof this) + " )")
    }

    setspell(){
        alert("set spell! ( " + (typeof this) + " )");
    }
}

class Warrior extends Job{
    setskill(){
        this.skill["slash"] = Slash;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage;
    }

    setspell(){
        this.spell = {};
    }
} 
JOBDICT["warrior"] = new Warrior("warrior");

class Mage extends Job{
    setskill(){
        this.skill["slash"] = Slash;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage;
    }

    setspell(){
        this.spell = {};
    }
} 
JOBDICT["mage"] = new Mage("mage");

class Ranger extends Job{
    setskill(){
        this.skill["slash"] = Slash;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage;
    }

    setspell(){
        this.spell = {};
    }
} 
JOBDICT["ranger"] = new Ranger("ranger");

class Priest extends Job{
    setskill(){
        this.skill["slash"] = Slash;
    }

    setpassiveskill(){
        this.passiveskill["courage"] = Courage;
    }

    setspell(){
        this.spell = {};
    }
} 
JOBDICT["priest"] = new Priest("priest");