
/**
 * All object's Parent
 */
class ObjParent{
    /**
     * ObjParent's constructor.
     * @param {String} name The name of the object.
     */
    constructor(name){
        if(name == undefined){
            name = 'id = ' + count;
        }
        /**Object name. */
        this.name = name;
        /**Object id */
        this.id = count;
        /**Object description */
        this.desc = this.name.toString + "...";
        count++;
    }
    
    /**
     * Set the location of the object.
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setlocation(x, y){
        /**Object x coordinate */
        this.x = x;
        /**Object y coordinate */
        this.y = y;
    }

    /**
     * returns the object description
     */
    examine(){
        return this.desc;
    }
}


/**
 * All Item parent
 */
class Item extends ObjParent{

};

/**
 * All creature's parent
 */
class Creature extends ObjParent{

    constructor(name){
        super(name);
        /**Choose from jobs.js */
        this.job = [];
        /**creature race */
        this.race = [];
        /**active skill */
        this.skill = {};
        /**passive skill */
        this.passiveskill = {};
        /**spell */
        this.spell = {};
        /**xp owned by creature. monsters will drop it for players.
         * players will lose it when they are defeated.
         */
        this.xp = 0;
    }

    /**
     * Set Creature's stat levels 
     * Stat should have attack, def, magic, magic def,
     *  speed, hp, mp, Prayer, resistance
     * @param {number} level Creature's level
    */
    setlevel(level){
        var l = this.adjustlevel(level);
        /**the creature's level */
        this.level = l;
        /**Attack level */
        this.attack = l;
        /**Defense level */
        this.defense = l;
        /**Magic level */
        this.magic = l;
        /**Magic def */
        this.magicdef = l;
        /**Speed level */
        this.speed = l;
        /**HP level */
        this.hp = l * 10;
        /**MP level */
        this.mp = l * 10;
        /**Prayer level */
        this.prayer = l;
        /**Resistance level */
        this.resistance = l;
        this.hpnow = this.hp;
        this.mpnow = this.mp;
    }

    /**adjust monster level to set level */
    adjustlevel(level){
        var l = level;
        if(l < this.minlevel){
            return this.minlevel;
        }
        if(l > this.maxlevel){
            return this.maxlevel;
        }
        return l;
    }

    /**Set job of creature. this.job is a array. */
    setJob(){
        throw new Error("Set job of " + this.name + "!");
    }

    /**Set of race of creature */
    setRace(){
        throw new Error("Set job of " + this.name + "!");
    }
};




/**All monster's parent */
class Monster extends Creature{
    /**
     * @param {*} name the name of this monster
     */
    constructor(name){
        super(name);
        this.basexp = 0;
        /**instance of self */
        this.setJob();
        this.setRace();
    }
    /**
     * Call this first...
     * This sets name, leve, xp
     * @param {number} level level of monster.
     */
    setup(level){
        this.setmaxminlv();
        this.setlevel(level);
        this.setxp();
    }

    /**set min and max level of monster */
    setmaxminlv(){
        throw new Error('set max min level!' + this.name);
    }

    /**sets xp of monster. Make sure to do setlevel first */
    setxp(){
        this.xp = Math.ceil(
        this.basexp 
        + (1 + 0.1425 * 
            Math.pow(this.level, 0.6 * 
                Math.log10(this.Attack * 1.3 + 
                    this.Defense * 1.2+ 
                    this.Magic * 1.3 + 
                    this.MagicDef * 1.2 + 
                    this.Prayer * 1.2 + 
                    this.Resistance * 1.2 + 
                    this.HP)
                )
            )
        );
    }

};





/**
 * Room Class
 */
class Room extends ObjParent{
    /**sets room level according to room location */
    setlevel(){
        var midx = Math.floor(Map_Size / 2);
        var midy = midx;
        var dist = Room.getdistance(midx, midy, this.x, this.y);
        /**Room level */
        this.level = Math.ceil(dist) + 1;
    }

    setNPC(){

    }

    setMonster(){
        /**monsters in room */
        this.monster = [];
        var ran = getRand(0,this.level);
        var m;
        if(this.level < 10){
            if(ran < this.level / 2){
                m = new Goblin('Goblin');
            } else {
                m = new Zombie('Zombie');
            }
        } else if(this.level < 20){
            if(ran < this.level / 2){
                m = new Dark_Warrior('Dark Warrior');
            } else {
                m = new Dark_Priest('Dark Priest');
            }
        } else {
            m = new Black_Dragon(name='Black Dragon');
        }
        m.x = this.x;
        m.y = this.y;
        m.setup(this.level);
        this.monster.push(m);
    }

    /**
     * Sets up room. Should call this first.
     * @param {boolean} safety If the room is safe or not. 
     * @param {number} x x pos of room
     * @param {number} y y pos of room
     */
    setupRoom(safety, x, y){
        this.setlocation(x, y);
        this.safe = safety;
        this.setlevel();
        if(!this.safe){
            this.setMonster();
        } else {
            this.setNPC();
        }

    }


    /**
     * Returns the distance between two points.
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     */
    static getdistance(x1, y1, x2, y2){
        var a = x1 - x2;
        var b = y1 - y2;
        var c = Math.sqrt(a*a + b*b);
        return c;
    }
};



/**The Player class */
class Player extends Creature{
    /**
     * 
     * @param {Item} obj object to add into inv
     */
    addinv(obj){
        this.inv.push(obj);
    }
    
    /**reset player stats, job, race */
    init(){
        this.level = 99;
        this.attack = 1000;
        this.defense = 100;
        this.magic = 1;
        this.magicdef = 1;
        this.speed = 1;
        this.hp = 1000;
        this.mp = 1;
        this.prayer = 1;
        this.resistance = 1;
        this.hpnow = this.hp;
        this.mpnow = this.mp;
    }

    /**Overrides Creature setlevel */
    setlevel(level){
        this.level = level;
    }

    /**
     * Add a job to player.job (dict).
     * @param {String} jobname 
     * @returns {boolean} true if success, false if fail
     */
    setJob(jobname){
        switch (jobname){
            case 'warrior':
                this.job[0] = new jWarrior(player, jobname);
                break;
            case 'mage':
                this.job[0] = new jMage(player, jobname);
                break;
            case 'ranger':
                this.job[0] = new jRanger(player, jobname);
                break;
            case 'priest':
                this.job[0] = new jPriest(player, jobname);
                break;
        }

        if(this.job[0] != undefined){
            return true;//success
        } else {
            console.log(jobname + ": no such job the list");
            return false;//fail
        }
    }

    setRace(){
        this.race[0] = new rHuman(player, jobname);
    }
};


