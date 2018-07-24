// Write JavaScript here 

/**
 * Counter of ObjParent. Used for ids
 */
var count = 0;

/**
 * Size of Map to generate. width = height = map size.
 */
var Map_Size = 5;
var ATTACK = 0;
var DEFENSE = 1;
var EVADE = 2;
var RUNAWAY = 3;

var TYPINGSPEED = 30;
var TYPEMINRAN = 5;
var TYPEMAXRAN = 10;

/**
 * Object to store rooms.s
 */
var Map;

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
        if(this.level < 5){
            if(ran < this.level / 2){
                m = new Goblin('Goblin');
            } else {
                m = new Zombie('Zombie');
            }
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

class Goblin extends Monster{
    setmaxminlv(){
        this.maxlevel = 10;
        this.minlevel = 1;
    }

    examine(){
        return "goblin...";
    }
};

class Zombie extends Monster{
    setmaxminlv(){
        this.maxlevel = 10;
        this.minlevel = 1;
    }

    examine(){
        return "Zombie...";
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




var player = new Player("");


var STARTPAGE = 0;
var SETUP = 1;
var PLAY_NON_COMBAT = 2;
var COMBAT = 3;

/**
 * State of the game.
 */
var game_state = STARTPAGE;

/**
 * Called when the document (the web site) is ready.
 */
$(document).ready(function(){
    setwelcomepage();
    $("form").submit(submit);
});

/**
 * Sets up the title screen.
 */
function setwelcomepage(){
    adddiv('####################################');
    adddiv('Welcome to Text RPG');
    adddiv('- Play -');
    adddiv('- Option -');
    adddiv('- Help -');
    adddiv('####################################');
    addline();
}

/**
 * Called when input was made.
 */
function submit(){
    var input = getinput();
    if(input.toLowerCase() != ''){
        adddiv(">> " + $("#command_line").val().toString());
        if(game_state === STARTPAGE){
            input.toLowerCase();
            if(input === "help"){
                adddiv('help');
            } else if(input === "play"){
                game_state = SETUP;
                adddiv('What is your name?');
            } else if(input === 'option'){
                adddiv('Options');
            }
        } else if(game_state === SETUP){
            setupplayer(input);
            adddiv('Hello ' + player.name +'! Welcome to the World of Text RPG!\nType in commands to play through.');
            generatemap();
            game_state = PLAY_NON_COMBAT;
        } else if(game_state === PLAY_NON_COMBAT){
            input.toLowerCase();
            if(input === "map"){
                showmap();
            } else if(input === "exit" || input === "quit"){
                adddiv('Goodbye');
                game_state = STARTPAGE;
                setwelcomepage();
            } else if(startWith(input,"look")){
                var name = input.substring("look ".length);
                if(name.length > 0){
                    exa(name);
                }
            } else if(startWith(input, "fight")){
                var str = input.substring("fight ".length);
                game_state = COMBAT;
                drawCombat();
            } else if(input === "room"){
                let m = Map[player.x][player.y].monster;
                var names = "";
                for(let i = 0; i < m.length; i++){
                    names += m[i].name + " level " + m[i].level + "\n";
                }
                addp(names);
            }
        } else if(game_state === COMBAT){
            input.toLowerCase();
            if(input === "attack" || input === "a"){
                fight(ATTACK);
            } else if(input === "defend" || input === "d"){
                fight(DEFENSE);
            } else if(input === "evade" || input === "e"){
                fight(EVADE);
            } else if(input === "run away" || input === "r"){
                fight(RUNAWAY);
            }
        }
        aftersubmit();
    }
}

function aftersubmit(){
    $('#command_line').val("");
    addline();
    window.scrollTo(0, document.body.scrollHeight);
}

function getinput(){
    return $("#command_line").val().toString();
}

/**
 * Adds a HTML element (div) before the #placeholder.
 * Does not have a typing effect.
 * @param {String} str the element's text
 */
function adddiv_inst(str){
    $('<div>', {text: str}).css("text-align", "center").insertBefore("#placeholder");
}

/**
 * Adds a HTML element (div) before the #placeholder.
 * Has a typing effect.
 * @param {String} str The element's text.
 */
function adddiv(str){//$('<div>', { text:str}).css("text-align", "center").insertBefore("#placeholder").fadeIn(1000);
    var ele = $('<div>');
    ele.css("text-align", "center").insertBefore("#placeholder");
    typeWriter(ele, str, 0);
}

/**
 * Adds a HTML element (div) before the #placeholder.
 * Has a typing effect.
 * @param {String} str The element's text.
 * @param {String} color the color
 */
function adddiv_c(str, color){//$('<div>', { text:str}).css("text-align", "center").insertBefore("#placeholder").fadeIn(1000);
    var ele = $('<div>');
    ele.css({'text-align': 'center', 'color': color}).insertBefore("#placeholder");
    typeWriter(ele, str, 0);
}


/**
 * Adds a HTML element (p) before the #placeholder.
 * Has a typing effect.
 * @param {String} str The elemen's text.
 */
function addp(str){//$('<div>', { text:str}).css("text-align", "center").insertBefore("#placeholder").fadeIn(1000);
    var ele = $('<p>');
    ele.css("text-align", "center").insertBefore("#placeholder");
    $('</p>').insertBefore("#placeholder");
    typeWriter(ele, str, 0);
}

/**
 * Add a typing effect to a HTML element's text.
 * @param {HTMLElement} ele HTML element.
 * @param {String} str String to type into HTML element.
 * @param {number} i Should be 0 at first.
 */
function typeWriter(ele, str, i){
    var interval =  TYPINGSPEED + getRand(TYPEMINRAN, TYPEMAXRAN);
    if(i < str.length){
        ele.text(ele.text() + str.charAt(i));
        i++;
        window.setTimeout(typeWriter, interval, ele, str, i);
    }
}

/**
 * Delete letters from a HTML element's text
 * @param {HTMLElement} ele HTML element
 * @param {number} i number of letters to delete
 */
function typeWriterDel(ele, i){
    var interval = TYPINGSPEED + getRand(TYPEMINRAN, TYPEMAXRAN);
    var str = ele.text();
    str = str.substring(0, str.length - 1);
    if(i > 0){
        ele.text(str);
        i -= 1;
        window.setTimeout(typeWriterDel, interval, ele, i);
    }
}

/**
 * Adds a new <p> element.
 */
function addline(){//new line
    var ele = $('<p>').css("text-align", "center").insertBefore("#placeholder");
    $('</p>').css("text-align", "center").insertBefore("#placeholder");
}

/**
 * Makes a dot dot dot effect.
 */
function dotdotdot(){
    var ele = $('<div>');
    ele.css("text-align", "center").insertBefore("#placeholder");
    var str = ".......";
    var speed = 1500 / str.length;    
    typeWriter(ele, str, 0, speed);
}

/**
 * Adds a div element with the object's description.
 * @param {String} name name of the object
 */
function exa(name){ //examine
    var i = 0;
    var obj = lookforobj(name);
    if(obj != undefined){
        adddiv(name + ": " + obj.examine());
    } else {
        adddiv("'" + name + "' was not found");
    } 
}

/**
 * Looks for a ObjParent child. Returns ObjParent child.
 * @param {String} name name of the object to look for.
 * @returns {ObjParent} ObjParent
 */
function lookforobj(name){
    var i = 0;
    var m = Map[player.x][player.y].monster;
    for(i = 0; i < m.length; i++){
        var monster = m[i];
        if(monster.name.toLowerCase() === name.toLowerCase()){
            return monster;
        }
    }
    return undefined;
}



/**
 * Set up the player.
 * @param {String} name 
 */
function setupplayer(name){
    player.name = name;
    player.desc = "The Main Player.";
    player.x = Math.floor(Map_Size / 2);
    player.y = player.x;
    player.init();
}

/**
 * 
 * Returns a random number between min and max.
 * @param {number} min minimum number
 * @param {number} max maximum number
 * @type {number}
 */
function getRand(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * Checks if a text starts with a word or phrase.
 * @param {String} txt Text to look into
 * @param {String} word Word or phrase to look for
 * @type {boolean}
 */
function startWith(txt, word){
    var a = txt.substr(0, txt.indexOf(" "));
    if(a == word){
        return true;
    } else {
        return (txt === word);
    }
}

/**
 * Reset and create the map.
 */

function generatemap(){
    Map = new Array(Map_Size);
    for(let y = 0; y < Map_Size; y++){
        Map[y] = new Array(Map_Size).fill(0);
    } //initiation of array

    var i = 0;
    var j = i;
    for(i = 0; i < Map_Size; i++){
        for(j = 0; j < Map_Size; j++){
            var name = i + "_" + j;
            var room = new Room(name);
            room.setupRoom(false, i, j);
            Map[i][j] = room;
        }
    }
}

/**
 * shows map
 */
function showmap(){
    var str = "";
    for(let i = 0; i < Map_Size; i++){
        for(let j = 0; j < Map_Size; j++){
            str += ("[ level = " + Map[i][j].name + " ]");  
        }
        adddiv(str);
        str = "";
    }
}