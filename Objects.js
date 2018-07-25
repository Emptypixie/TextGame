
/**
 * All object's Parent
 */
class ObjParent{
    /**
     * ObjParent's constructor.
     * @param {String} name The name of the object.
     */
    constructor(name){
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
        this.Attack = l;
        /**Defense level */
        this.Defense = l;
        /**Magic level */
        this.Magic = l;
        /**Magic def */
        this.MagicDef = l;
        /**Speed level */
        this.Speed = l;
        /**HP level */
        this.HP = l;
        /**MP level */
        this.MP = l;
        /**Prayer level */
        this.Prayer = l;
        /**Resistance level */
        this.Resistance = l;
        /**Max hp */
        this.maxhp = this.HP * 10;
        this.maxmp = this.MP * 10;
        this.hpnow = this.maxhp;
        this.mpnow = this.maxmp;
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
};

/**All monster's parent */
class Monster extends Creature{
    /**
     * Call this first...
     * This sets name, leve, xp
     * @param {number} level level of monster.
     */
    setup(level){
        this.setmaxminlv();
        this.setlevel(level);
        this.setxp();
        var found = 0;
        
    }

    /**set min and max level of monster */
    setmaxminlv(){
        throw new Error('set max min level!' + this.name);
    }

    /**sets xp of monster. Make sure to do setlevel first */
    setxp(){
        var best_att = this.Attack;
        if(best_att < this.Magic){
            best_att = this.Magic;
        }
        var best_def = this.Deffence;
        if(best_def < this.MagicDef){
            best_def = this.MagicDef;
        }
        /**xp gained for defeating monster */
        this.xp = best_att + best_def + this.HP + this.level;
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
            m = new Black_Dragon('Black Dragon');
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
    
    init(){
        this.level = 1;
        this.Attack = 1;
        this.Defense = 1;
        this.Magic = 1;
        this.MagicDef = 1;
        this.Speed = 1;
        this.HP = 1;
        this.MP = 1;
        this.Prayer = 1;
        this.Resistance = 1;
        this.maxhp = this.HP * 10;
        this.maxmp = this.MP * 10;
        this.hpnow = this.maxhp;
        this.mpnow = this.maxmp;
    }

    /**Overrides Creature setlevel */
    setlevel(level){
        this.level = level;
    }

};
