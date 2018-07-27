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

class jWarrior extends Job{
    constructor(name){
        if(name == undefined){
            super('warrior');
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

class jMage extends Job{
    constructor(name){
        if(name == undefined){
            super('mage');
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

class jRanger extends Job{
    constructor(name){
        if(name == undefined){
            super('ranger');
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

class jPriest extends Job{
    constructor(name){
        if(name == undefined){
            super('priest');
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