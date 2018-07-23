// Write JavaScript here 

var ObjList = [];
var count = 0;

class ObjParent{
    constructor(name){
        ObjList.push(this);
        this.desc = 'A new object.';
        this.name = name;
        this.id = count;
        count++;
    }
    
    examine(){
        return this.desc;
    }
}

class Creature extends ObjParent{
    setstats(param){
        this.maxhp = param.maxhp;
    }    
};

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

class Player extends Creature{
    
};

var STARTPAGE = 0;
var SETUP = 1;
var PLAYING = 2;


var player = new Player('');

var game_state = STARTPAGE;


$(document).ready(function(){
    setwelcomepage();
    $("form").submit(submit);
});

function setwelcomepage(){
    adddiv('####################################');
    adddiv('Welcome to Text RPG');
    adddiv('- Play -');
    adddiv('- Help -');
    adddiv('####################################');
    addline();
}

function submit(){
    adddiv(">> " + $("#command_line").val().toString());
    if(game_state === STARTPAGE){
        var input = $("#command_line").val().toString().toLowerCase();
        if(input === "help"){
            adddiv('help');
        } else if(input === "play"){
            game_state = SETUP;
            adddiv('What is your name?');
        }
    } else if(game_state === SETUP){
        var input = $("#command_line").val().toString();
        setupplayer(input);
        adddiv('Hello ' + player.name +'! Welcome to the World of Text RPG!\nType in commands to play through.');
        //set up map, monsters...
        var goblin = new Goblin('Goblin');
        game_state = PLAYING;
    } else if(game_state === PLAYING){
        var input = $("#command_line").val().toString().toLowerCase();
        if(input === "map"){
            map();
        } else if(input === "exit" || input === "quit"){
            adddiv('Goodbye');
            game_state = STARTPAGE;
            setwelcomepage();
        } else if(input.includes("look")){
            var str = input.substring("look ".length);
            if(str.length > 0){
                exa(str);
            }
        }
    }
    $('#command_line').val("");
    addline();
    window.scrollTo(0, document.body.scrollHeight);
}

function adddiv_inst(str){
    $('<div>', {text: str}).css("text-align", "center").insertBefore("#placeholder");
}

function adddiv(str){//$('<div>', { text:str}).css("text-align", "center").insertBefore("#placeholder").fadeIn(1000);
    var ele = $('<div>');
    ele.css("text-align", "center").insertBefore("#placeholder");
    var speed = 20 / str.length;
    typeWriter(ele, str, 0, speed);
}

function typeWriter(ele, str, i, speed){
    var interval =  speed + getRand(5, 10);
    if(i < str.length){
        ele.text(ele.text() + str.charAt(i));
        i++;
        window.setTimeout(typeWriter, interval, ele, str, i, speed);
    }
}

function addline(){//new line
    $('<p>').css("text-align", "center").insertBefore("#placeholder");
    $('</p>').css("text-align", "center").insertBefore("#placeholder");
}

function dotdotdot(){
    var ele = $('<div>');
    ele.css("text-align", "center").insertBefore("#placeholder");
    var str = ".......";
    var speed = 1500 / str.length;    
    typeWriter(ele, str, 0, speed);
}

function exa(txt){ //examine
    var i = 0;
    var found = 0;
    for(i = 0; i < ObjList.length; i++){
        var obj = ObjList[i];
        if(obj.name.toLowerCase() === txt.toLowerCase()){
            adddiv(txt + ": " + obj.examine());
            found = 1;
            break;
        }
    }
    if(found === 0){
        adddiv(txt + " was not found");
    }
}

function setupplayer(name){
    player.name = name;
    player.desc = "The Main Player.";
}

function getRand(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

