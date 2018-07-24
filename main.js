// Write JavaScript here 

/**
 * List that contains all children of ObjList.
 */
var ObjList = [];

/**
 * Counter of ObjList length.
 */
var count = 0;

/**
 * Size of Map to generate. width = height = map size.
 */
var Map_Size = 5;

/**
 * All object's Parent
 */
class ObjParent{
    /**
     * ObjParent's constructor.
     * @param {String} name The name of the object.
     */
    constructor(name){
        ObjList.push(this);
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

}

/**
 * All creature's parent
 */
class Creature extends ObjParent{

    /**
     * Set Creature's stat levels 
     * Stat should have attack, def, magic, range, hp, mp, prayer, summoning
     * @param {number} level Creature's level
    */
    setlevel(level){
        /**Attack level */
        this.Attack = level;
        /**Deffence level */
        this.Deffence = level;
        /**Magic level */
        this.Magic = level;
        /**Range level */
        this.Range = level;
        /**HP level */
        this.HP = level * 10;
        /**MP level */
        this.MP = level * 5;
        /**Prayer level */
        this.prayer = level;
        /**Summoning level */
        this.summoning = level;
    }
};

/**All monster's parent */
class Monster extends Creature{
    get xp(){
        return this.xp;
    }
    set xp(xp){
        this.xp = xp;
    }
};

class Goblin extends Monster{
    examine(){
        return "goblin...";
    }
};

/**The Player class */
class Player extends Creature{
    
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
    if($("#command_line").val().toString().toLowerCase() != ''){
        adddiv(">> " + $("#command_line").val().toString());
        if(game_state === STARTPAGE){
            var input = $("#command_line").val().toString().toLowerCase();
            if(input === "help"){
                adddiv('help');
            } else if(input === "play"){
                game_state = SETUP;
                adddiv('What is your name?');
            } else if(input === 'option'){
                adddiv('Options');
            }
        } else if(game_state === SETUP){
            var input = $("#command_line").val().toString();
            setupplayer(input);
            adddiv('Hello ' + player.name +'! Welcome to the World of Text RPG!\nType in commands to play through.');
            //set up map, monsters...
            var goblin = new Goblin('Goblin');
            game_state = PLAY_NON_COMBAT;
        } else if(game_state === PLAY_NON_COMBAT){
            var input = $("#command_line").val().toString().toLowerCase();
            if(input === "map"){
                map();
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
                if(str.length > 0){
                    game_state = COMBAT;
                }
            }
        } else if(game_state === COMBAT){
            adddiv("combat stuff");
        }
        
        $('#command_line').val("");
        addline();
        window.scrollTo(0, document.body.scrollHeight);
    }
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
    var speed = 20 / str.length;
    typeWriter(ele, str, 0, speed);
}

/**
 * Add a typing effect to a HTML element's text.
 * @param {HTMLElement} ele 
 * @param {String} str String to type into HTML element.
 * @param {number} i Should be 0 at first.
 * @param {number} speed Speed of typing. ex) 20 / str
 */
function typeWriter(ele, str, i, speed){
    var interval =  speed + getRand(5, 10);
    if(i < str.length){
        ele.text(ele.text() + str.charAt(i));
        i++;
        window.setTimeout(typeWriter, interval, ele, str, i, speed);
    }
}

/**
 * Adds a new <p> element.
 */
function addline(){//new line
    $('<p>').css("text-align", "center").insertBefore("#placeholder");
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
    /*
    var found = 0;
    for(i = 0; i < ObjList.length; i++){
        var obj = ObjList[i];
        if(obj.name.toLowerCase() === name.toLowerCase()){
            adddiv(txt + ": " + obj.examine());
            found = 1;
            break;
        }
    }
    if(found === 0){
        adddiv("'" + txt + "' was not found");
    }*/
}

function lookforobj(name){
    var i = 0;
    for(i = 0; i < ObjList.length; i++){
        var obj = ObjList[i];
        if(obj.name.toLowerCase() === name.toLowerCase()){
            return obj;
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
        return false;
    }
}
