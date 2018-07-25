// Write JavaScript here 

/**
 * Counter of ObjParent. Used for ids
 */
var count = 0;

/**
 * Size of Map to generate. width = height = map size.
 */
var Map_Size = 20;

var ATTACK = 0;
var DEFENSE = 1;
var EVADE = 2;
var RUNAWAY = 3;

var TYPINGSPEED = 10;
var TYPEMINRAN = 5;
var TYPEMAXRAN = 10;

/**
 * Object to store rooms.s
 */
var Map;




var player;


var STARTPAGE = 0;
var SETUP = 1;
var PLAY_NON_COMBAT = 2;
var COMBAT = 3;

/**
 * State of the game.
 */
var game_state = STARTPAGE;

var LOADED = false;
/**
 * Called when the document (the web site) is ready.
 */
$(document).ready(function(){
    if(!LOADED){
        setwelcomepage();
        $("form").submit(submit);
        player = new Player("");
    }
    LOADED = true;
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
    return typeWriter(ele, str, 0);
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
    return typeWriter(ele, str, 0);
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
    return typeWriter(ele, str, 0);
}

/**
 * Add a typing effect to a HTML element's text.
 * @param {HTMLElement} ele HTML element.
 * @param {String} str String to type into HTML element.
 * @param {number} i Should be 0 at first.
 */
function typeWriter(ele, str, i){
    var interval =  getInterval(str);
    if(i < str.length){
        ele.text(ele.text() + str.charAt(i));
        i++;
        return window.setTimeout(typeWriter, interval, ele, str, i);
    } else return true;
}

/**
 * Delete letters from a HTML element's text
 * @param {HTMLElement} ele HTML element
 * @param {number} i number of letters to delete
 */
function typeWriterDel(ele, i){
    var interval = getInterval(i);
    var str = ele.text();
    str = str.substring(0, str.length - 1);
    if(i > 0){
        ele.text(str);
        i -= 1;
        return window.setTimeout(typeWriterDel, interval, ele, i);
    } else return true;
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
    for(let i = player.x - 2; i < player.x + 3; i++){
        for(let j = player.y - 2; j < player.y + 3; j++){
            if(i == player.x && j == player.y){
                str += "|   - here -   |";
            } else if(i >= 0 && i < Map_Size && j >= 0 && j < Map_Size){
                let lev = Map[i][j].level;
                str += ("|Level: " + lev + "|");  
            }
        }
        adddiv(str);
        str = "";
    }
}

function getInterval(str){
    return str.length / TYPINGSPEED + getRand(TYPEMINRAN, TYPEMAXRAN);
}