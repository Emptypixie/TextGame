
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
        this.race = undefined;
        /**active skill */
        this.skill = [];
        /**passive skill */
        this.passiveskill = [];
        /**spell */
        this.spell = [];
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
            Math.pow(this.level + 1, 0.641917 * 
                Math.log10(this.attack * 2 + 
                    this.defense * 1.2+ 
                    this.magic * 2 + 
                    this.magicdef * 1.2 + 
                    this.prayer * 1.2 + 
                    this.resistance * 1.2 + 
                    this.hp + this.mp)
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

    constructor(name){
        super(name);
        this.weapon = new SteelSword();
        this.armour = new SteelPlateBody();
        this.desc = "The Main Player.";
        this.x = Math.floor(Map_Size / 2);
        this.y = this.x;
        this.init();
    }
    /**
     * 
     * @param {Item} obj object to add into inv
     */
    addinv(obj){
        /**inv = inventory */
        this.inv.push(obj);
    }
    
    /**reset player stats, job, race */
    init(){
        this.level = 0;
        this.attack = 0;
        this.defense = 0;
        this.magic = 0;
        this.magicdef = 0;
        this.speed = 0;
        this.hp = 0;
        this.mp = 0;
        this.prayer = 0;
        this.resistance = 0;
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
        jobname = jobname.toLowerCase();
        switch (jobname){
            case 'warrior':
            case '1':
                this.job[0] = new jWarrior(player);
                break;
            case 'mage':
            case '2':
                this.job[0] = new jMage(player);
                break;
            case 'ranger':
            case '3':
                this.job[0] = new jRanger(player);
                break;
            case 'priest':
            case '4':
                this.job[0] = new jPriest(player);
                break;
        }

        if(this.job[0] != undefined){
            this.job[0].levelup();
            this.job[0].level -= 1;
            this.level += 1;
            return true;//success
        } else {
            adddiv(jobname + ": no such job the list.");
            console.log(jobname + ": no such job the list.");
            return false;//fail
        }
    }

    /**set race of player 
     * @param {String} racename the race name
     * @returns {boolean} true if success, false if fail
    */
    setRace(racename){
        racename = racename.toLowerCase();
        switch(racename){
            case 'human':
            case '1':
                this.race = new rHuman(this);
                break;
            case 'skeleton':
            case '2':
                this.race = new rSkeleton(this);
                break;
            case 'zombie':
            case '3':
                this.race = new rZombie(this);
                break;
            case 'dragon':
            case '4':
                this.race = new rDragon(this);
                break;
        }
        if(this.race != undefined){
            this.race.levelup();
            this.race.level -= 1;
            this.level += 1;
            return true;//success
        } else {
            adddiv(racename + ": no such race the list.")
            console.log(racename + ": no such race the list.");
            return false;//fail
        }
    }

    levelup(){
        player.level += 1;
        this.attack += 1;
        this.defense += 1;
        this.magic += 1;
        this.magicdef += 1;
        this.speed += 1;
        this.hp += 10;
        this.mp += 10;
        this.prayer += 1;
        this.resistance += 1;
        this.hpnow = this.hp;
        this.mpnow = this.mp;
    }
};


