// Write JavaScript here 

/**
 * Counter of ObjParent. Used for ids
 */
var count = 0;

/**
 * Size of Map to generate. width = height = map size.
 */
var Map_Size = 50;

var ATTACK = 0;
var SKILLSPELL = 1;
var RUNAWAY = 2;

var TYPINGSPEED = 10;
var TYPEMINRAN = 1;
var TYPEMAXRAN = 5;

var VKLEFT = 37;
var VKUP = 38;
var VKRIGHT = 39;
var VKDOWN = 40;

/**
 * Object to store rooms.s
 */
var Map;


var STARTPAGE = 0;
var SETUP = 1;
var PLAY_NON_COMBAT = 2;
var COMBAT = 3;

/**
 * State of the game.
 */
var game_state = STARTPAGE;

/**the player object */
var player = new Player("Player name");

var LOADED = false;
/**
 * Called when the document (the web site) is ready.
 */
$(document).ready(function(){
    if(!LOADED){
        setwelcomepage();
        $("form").submit(submit);
        $("#command_line").keyup(keyinput);
        /*$("#console").bind("DOMNodeInserted",function(){
            sleep(500,);
        }); */
        window.setInterval(function(){
                $("#console").animate(
                    {scrollTop: $("#console").scrollTop() + $("#console").height()},
                     900, 'swing');
        }, 1000);
    }
    LOADED = true;
    
});

/**
 * Sets up the title screen.
 */
function setwelcomepage(){
    player = new Player("");
    adddiv('####################################');
    adddiv('Welcome to Text RPG');
    adddiv('- Play -');
    adddiv('- Option -');
    adddiv('- Help -');
    adddiv('####################################');
    addline();
}

/**reset player object. */
function resetPlayer(){
    player = new Player();
}

/**empty console except #placeholder and #combat_area. */
function emptyConsole(){
    ch1 = $("#console > *");
    for(let i = 0; i < ch1.length; i++){
        if(ch1[i].id != "placeholder" && ch1[i].id != "combat_area"){
            ch1[i].remove();
        }
    }
}

function emptyCombatarea(){
    $("#combat_area").empty();
}

/**
 * Called when input was made.
 */
function submit(){
    var input = getinput();
    if(input.toLowerCase() != ''){
        adddiv(">> " + $("#command_line").val().toString());
        if(game_state === STARTPAGE){
            input = input.toLowerCase();
            if(input === "help"){
                adddiv('help');
            } else if(input === "play"){
                game_state = SETUP;
                adddiv('What is your name?');
            } else if(input === 'option'){
                adddiv('Options');
            }
        } else if(game_state === SETUP){
            
            if(player.name == ""){
                setupplayer(input);
                adddiv('Hello ' + player.name +'! Welcome to the World of Text RPG!\nType in commands to play through.');
                sleep(900, function(){
                    addline();
                    adddiv("What class would you like to play?");
                    sleep(300, function(){
                        adddiv_list(["Warrior", "Mage", "Ranger", "Priest"]);
                    });
                });
            } else if(player.job.length == 0){
                if(player.setJob(input)){
                    addline();
                    adddiv("What race would you like to play?");
                    sleep(300, function(){
                        adddiv_list(["Human", "Skeleton", "Zombie", "Dragon"]);
                    });
                }
            } else if(player.race == undefined){
                if(player.setRace(input)){
                    addline();
                    adddiv("You start your adventure as a " + 
                    toUpper(player.race.name + " " + player.job[0].name)
                    + ".");
                    addline();
                    player.hpnow = player.hp;
                    player.mpnow = player.mp;
                    showstats(player);
                    generatemap();
                    game_state = PLAY_NON_COMBAT;
                }
            }
        } else if(game_state === PLAY_NON_COMBAT){
            input = input.toLowerCase();
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
                let m = monsterAtPlayerRoom();
                var names = "";
                for(let i = 0; i < m.length; i++){
                    names += m[i].name + " level " + m[i].level + "\n";
                }
                addp(names);
            } else if(input == 'stat' || input == 'stats'){
                showstats(player);
            }
        } else if(game_state === COMBAT){
            input = input.toLowerCase();
            if(input === "attack" || input === "a"){
                fight(ATTACK);
            } else if(input === "skill" || input === "spell" || input === "s"){
                fight(SKILLSPELL);
            } else if(input === "run" || input === "r"){
                fight(RUNAWAY);
            }
        }
        aftersubmit();
    }
}

function aftersubmit(){
    $('#command_line').val("");
    addline();
    //window.scrollTo(0, document.body.scrollHeight);
    
    let d = $("#console > div").length;
    let p = $("#console > p").length;
    if(d > 50){
        for(let i = 0; i < 5; i++){
            $("#console > div")[0].remove();
        }
    }
    if(p > 50){
        for(let i = 0; i < 5; i++){
            $("#console > p")[0].remove();
        }
    }

    //scrollBottomConsole();
    //$("#console").scrollTop($("#console").height() + $("#console").scrollTop());//scroll #console to bottom
    /*console.log("console scrolltop",$("#console").scrollTop());
    console.log('console height',$("#console").height());
    console.log('placeholder offset().top', $("#placeholder").offset().top); */
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
    var m = monsterAtPlayerRoom();
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
    player = new Player(name);//must be before generating map    
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

/**
 * 
 * @param {Creature} creature 
 */
function showstats(creature){
    adddiv(creature.name + " stats:");
    adddiv("Race: " + toUpper(creature.race.name));
    adddiv("Job: " + toUpper(arrayToCommaList(creature.job, true)));
    adddiv("Level: " + creature.level);
    adddiv("HP: " + creature.hpnow + " / " + creature.hp);
    adddiv("MP: " + creature.mpnow + " / " +creature.mp);
    adddiv("Attack: " + creature.attack);
    adddiv("Physical Defense: " + creature.defense);
    adddiv("Magic Attack: " + creature.magic);
    adddiv("Magic Defense: " + creature.magicdef);
    adddiv("Speed: " + creature.speed);
    adddiv("Prayer: " + creature.prayer);
    adddiv("Resistance: " + creature.resistance);
    addline();
    adddiv("Skill: " + toUpper(arrayToCommaList(creature.skill, true)));
    adddiv("Passive Skill: " + toUpper(arrayToCommaList(creature.passiveskill, true)));
    adddiv("Spell: " + toUpper(arrayToCommaList(creature.spell, true)));
}


function keyinput(e){
    var keynum = e.which;
    //console.log(keynum);
    //console.log("x: " + player.x + ", y: " + player.y);
    if(game_state == PLAY_NON_COMBAT){
        if(keynum == VKUP){
            if(player.x != 0){
                player.x -= 1;
                adddiv("You advance north.");
            } else {adddiv("You cannot go north. You are at the North most area!");}
        } else if(keynum == VKDOWN){
            if(player.x != Map_Size - 1){
                player.x += 1;
                adddiv("You advance south.");
            } else {adddiv("You cannot go south. You are at the South most area!");}
        } else if(keynum == VKLEFT){
            if(player.y != 0){
                player.y -= 1;
                adddiv("You advance west.");
            } else {adddiv("You cannot go west. You are at the West most area!");}
        } else if(keynum == VKRIGHT){
            if(player.y != Map_Size - 1){
                player.y += 1;
                adddiv("You advance east.");
            } else {adddiv("You cannot go east. You are at the East most area!");}
        }
    }
}