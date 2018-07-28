/**each hp and mp bar max length */
var MAXBARLENGTH = 100;

/**
 * fight according to style
 * @param {number} num use static variables like ATTACK, DEFNSE
 */
function fight(num){
    var m = Map[player.x][player.y].monster;
    var i = getRand(0, m.length - 1);
    var opponent = m[i];

    damageFunc(player, opponent);//player attacks opponent

    sleep(500, function(){
        if(opponent.hpnow <= 0){//check if opponent hp is 0
            defeatedOpponent(opponent);
        }
        if(m.length == 0){//check if there are monsters in currnent room
            sleep(1500, removeCombat());
            game_state = PLAY_NON_COMBAT;
        } else {
            for(let i = 0; i < m.length; i++){
                damageFunc(m[i], player);
                if(player.hpnow <= 0){//player dead!
                    playerDefeated(m[i]);
                }
            }
        }
    });
}

/**
 * Use when opponent monster is defeated.
 * @param {Creature} opponent the opponent creature
 */
function defeatedOpponent(opponent){
    var m = Map[player.x][player.y].monster;
    adddiv("You defeated " + opponent.name + ".");
    adddiv_c("You gained " + opponent.xp + " xp.", "yellow");
    player.xp += opponent.xp;
    let nextlvxp = getxpforlv(player.level + 1);
    while(player.xp > nextlvxp){
        if(player.level != 100){
                player.level += 1;
                adddiv_c("You leveled up! You are now level " + player.level + ".", "lime");
                nextlvxp = getxpforlv(player.level + 1);
        } else {
            adddiv("You are already max level. You cannot gain any more xp.");
            break;
        }
    }
    {
        if(player.level != 100)
            adddiv((nextlvxp - player.xp) + " xp till next level.");
    }
    var index = m.indexOf(opponent);//delete monster from current room
    m.splice(index, 1);
}

function getxpforlv(L){
    return Math.floor(1.2 * 1 / 8 * L * (L - 1) + 75 * (Math.pow(2, (L - 1) / 7) - 1) / (1 - Math.pow(2, - 1 / 7)) - 0.109 * L);
}


/**
 * Use when player is defeated.
 * @param {monster} monster the monster that gave the final blow.
 */
function playerDefeated(monster){
    sleep(3000, function(){
        alert("You were killed by " + monster.name + ". Game will restart.");
        emptyConsole();
        setwelcomepage();
        emptyCombatarea();
        game_state = STARTPAGE;
    });
}
/**
 * 
 * @param {Creature} c_att attacking creature
 * @param {Creature} c_def defending creature
 */
function damageFunc(c_att, c_def){
    var dmg = damageCalc(c_att, c_def);//damage player deals to opponent
    if(dmg < 0) {dmg = 0;}
    c_def.hpnow -= dmg;
    adddiv(c_att.name + " deals " + dmg +" damage to " + c_def.name + ".");
    redrawlife(c_def, dmg);
    redrawmp(c_def, 0);//put used mp value in second argument
}

/**
 * Calculates damage the offending creature deals to defending creature.
 * @param {Creature} c_att The attacking Creature
 * @param {Creature} c_def the deffending Creature
 */
function damageCalc(c_att, c_def){
    var dmg = c_att.Attack * 10 + c_att.level;
    var reduc = c_def.Defense * 5 + c_def.level;
    dmg -= reduc;
    return dmg;
}

/**
 * Appends player and monster name, hp, mp bar to #combat_area
 * Also adds string "combat with monster1, monster2, .... bega." before #placeholder
 */
function drawCombat(){
    var m = Map[player.x][player.y].monster;
    if(m.length != 0){
        var str = "Combat with ";
        for(let i = 0; i < m.length; i++){
            draw_name_hp_mp(m[i]);
            str += m[i].name;
            if(i + 1 != m.length){
                str += ", ";
            } else {
                str += " began.";
            }
        }
        adddiv(str);
        addlineafter();
        draw_name_hp_mp(player);        
    } else {
        adddiv("There is no monster to fight...");
        game_state = PLAY_NON_COMBAT;
    }
    
}

/**
 * Append creature's name, hp, mp bar to #combat_area
 * @param {Creature} creature creature to draw name, hp, mp
 */
function draw_name_hp_mp(creature){
    var ele = $('<div>').css({"text-align": "center"});
    ele.attr("id",creature.id);
    $("#combat_area").append(ele);
    drawname(creature);
    drawnewlife(creature);
    drawnewmp(creature);
    $("#console").scrollTop($("#console").height());
}

/**
 * Redraws the hp bar of creature.
 * @param {Creature} creature 
 */
function redrawlife(creature, dmg){
    var id = "#" + creature.id + "hp";
    var element = $(id);
    while(true){
        let len = element.text().length;
        if(len == 0) { //element not found
            break;
        } else if(len < dmg){ // dmg bigger than hp bar
            element.remove();
            dmg -= len;
            element = $(id);
        } else { // hp bar len > dmg
            element.text(numtoline(len - dmg));
            break;
        }
    } return true;
    
}

/**
 * Redraws the mp bar of crearture.
 * @param {Creature} creature 
 */
function redrawmp(creature, mpused){
    var id = "#" + creature.id + "mp";
    var element = $(id);
    while(true){
        let len = element.text().length;
        if(len == 0) { //element not found
            break;
        } else if(len < mpused){ // mpused bigger than one mp bar
            element.remove();
            mpused -= len;
            element = $(id);
        } else { // mp bar len > mpused
            element.text(numtoline(len - mpused));
            break;
        }
    } return true;
}

/**
 * Draws new HP bar in combat_area.
 * @param {Creature} creature 
 */
function drawnewlife(creature){
    var hp = creature.hpnow;
    while(hp > MAXBARLENGTH){
        let str = numtoline(MAXBARLENGTH);
        let ele = $('<div>').css({"text-align": "center", "color": "red"});
        ele.attr("id", creature.id + "hp");
        $("#combat_area").append(ele);
        typeWriter(ele, str, 0);
        hp -= MAXBARLENGTH;
    }
    let str = numtoline(hp);
    let ele = $('<div>').css({"text-align": "center", "color": "red"});
    ele.attr("id", creature.id + "hp");
    $("#combat_area").append(ele);
    typeWriter(ele, str, 0);
}
/**
 * Draws new MP bar in combat_area.
 * @param {Creature} creature 
 */
function drawnewmp(creature){
    var mp = creature.mpnow;
    while(mp > MAXBARLENGTH){
        let str = numtoline(MAXBARLENGTH);
        let ele = $('<div>').css({"text-align": "center", "color": "blue"});
        ele.attr("id", creature.id + "mp");
        $("#combat_area").append(ele);
        typeWriter(ele, str, 0);
        mp -= MAXBARLENGTH;
    }
    let str = numtoline(mp);
    let ele = $('<div>').css({"text-align": "center", "color": "blue"});
    ele.attr("id", creature.id + "mp");
    $("#combat_area").append(ele);
    return typeWriter(ele, str, 0);
}

/**
 * Draws creature name in combat_area
 * @param {Creature} creature 
 */
function drawname(creature){
    var str = creature.name  + " level " + creature.level;
    var ele = $('<div>').css("text-align", "center");
    ele.attr("id", creature.id + "name");
    $("#combat_area").append(ele);
    return typeWriter(ele, str, 0);
}
/**
 * appends --------vs--------- to #combat_area
 */
function addlineafter(){
    var ele = $('<p>').css("text-align", "center");
    ele.text("----------------  vs  ----------------");
    ele.attr("id", "vs");
    $("#combat_area").append(ele);
}

/**
 * Return '|' as string.
 * ex) num = 5, returns "|||||"
 * @param {number} num 
 */
function numtoline(num){
    var str = "";
    for(let i = 0; i < num; i++){
        str += "|";
    }
    return str;
}

/**
 * Remove combat drawings (HP, MP bars, etc)
 * empty id = combat_area
 */
function removeCombat(){
    var ch1 = $("#combat_area > div"); //array of div with creature id
    for(let i = 0; i < ch1.length; i++){
            var ele = $("#" + ch1[i].id);
            ele.attr('id', "#" + ch1[i].id + i);
            removeCombatElement(ele, ele.text().length);
            /*if(ele.length == 1){
                removeCombatElement(ele, ele.text().length);
            } else {
                ele.forEach(function(e){
                    removeCombatElement(e, e.text().length);
                });
            } */
    }
    removeCombatElement($("#vs"), $("#vs").text().length);
    
    //$("#combat_area").empty();
}

/**
 * Deletes text of html element in typewriter style,
 * then remove the element.
 * Used after combat
 * @param {} ele a jquery element
 * @param {number} i should be ele.text().length
 */
function removeCombatElement(ele, i){
    var interval = TYPINGSPEED + getRand(TYPEMINRAN, TYPEMAXRAN);
    var str = ele.text();
    str = str.substring(1, str.length - 1);
    if(i > 0){
        ele.text(str);
        i -= 2;
        window.setTimeout(removeCombatElement, interval, ele, i);
    } else {
        var ar = ele.siblings();
        if(ar.length != 0){
            //console.log("siblings left");
            ele.remove();
        } else {
            ele.parent().empty();
        }
    }    
}
