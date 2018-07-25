// Write JavaScript here 

/**
 * Counter of ObjParent. Used for ids
 */
var count = 0;

/**
 * Size of Map to generate. width = height = map size.
 */
var Map_Size = 3;

var ATTACK = 0;
var DEFENSE = 1;
var EVADE = 2;
var RUNAWAY = 3;

var TYPINGSPEED = 10;
var TYPEMINRAN = 5;
var TYPEMAXRAN = 10;

var VKLEFT = 37;
var VKUP = 38;
var VKRIGHT = 39;
var VKDOWN = 40;

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
        $("#command_line").keyup(keyinput);
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
    
    let l = $("#console > div").length + $("#console > p").length;

    if(l > 100){
        for(let i = 0; i < 5; i++){
            $("#console > div")[0].remove();
        }
    }

    $("#console").scrollTop($("#console").height());//scroll #console to bottom
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

function keyinput(e){
    var keynum = e.which;
    console.log(keynum);
    //console.log("x: " + player.x + ", y: " + player.y);
    if(keynum == VKUP){
        if(player.x != 0){
            player.x -= 1;
        }
    } else if(keynum == VKDOWN){
        if(player.x != Map_Size - 1){
            player.x += 1;
        }
    } else if(keynum == VKLEFT){
        if(player.y != 0){
            player.y -= 1;
        }
    } else if(keynum == VKRIGHT){
        if(player.y != Map_Size - 1){
            player.y += 1;
        }
    }
}