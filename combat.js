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
            adddiv("You defeated " + opponent.name + ".");
            var index = m.indexOf(opponent);//delete monster from current room
            m.splice(index, 1);
        }
        if(m.length == 0){//check if there are monsters in currnent room
            sleep(1500, removeCombat());
            game_state = PLAY_NON_COMBAT;
        } else {
            for(let i = 0; i < m.length; i++){
                damageFunc(m[i], player);
                if(player.hpnow <= 0){//player dead!
                    sleep(1000, function(){
                        adddiv("You were killed by " + m[i] + ".");
                    });
                }
            }
        }
    });
}


/**
 * 
 * @param {Creature} c_att attacking creature
 * @param {Creature} c_def defending creature
 */
function damageFunc(c_att, c_def){
    var dmg = damageCalc(c_att, c_def);//damage player deals to opponent
    c_def.hpnow -= dmg;
    adddiv(c_att.name + " deals " + dmg +" damage to " + c_def.name + ".");
    redrawlife(c_def, dmg);
    redrawmp(c_def);
    var c = 0;
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
    var ele = $(id);
    //ele.text(numtoline(creature.hpnow));
    return typeWriterDel(ele, dmg);
}

/**
 * Redraws the mp bar of crearture.
 * @param {Creature} creature 
 */
function redrawmp(creature){
    var id = "#" + creature.id + "mp";
    var ele = $(id);
    ele.text(numtoline(creature.mpnow));
}

/**
 * Draws new HP bar in combat_area.
 * @param {Creature} creature 
 */
function drawnewlife(creature){
    str = numtoline(creature.hpnow);
    var ele = $('<div>').css({"text-align": "center", "color": "red"});
    ele.attr("id", creature.id + "hp");
    $("#combat_area").append(ele);
    return typeWriter(ele, str, 0);
}

/**
 * Draws new MP bar in combat_area.
 * @param {Creature} creature 
 */
function drawnewmp(creature){
    str = numtoline(creature.mpnow);
    var ele = $('<div>').css({"text-align": "center", "color": "blue"});
    ele.attr("id", creature.id + "mp");
    $("#combat_area").append(ele);
    return typeWriter(ele, str, 0);
}

/**
 * Draws creature name in combat_area
 * @param {Creature} creature 
 */
function drawname(creature){
    str = creature.name;
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
    ch1 = $("#combat_area > div"); //array of div with creature id
    for(let i = 0; i < ch1.length; i++){
            var ele = $("#" + ch1[i].id);
            removeCombatElement(ele, ele.text().length);
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
    str = str.substring(0, str.length - 1);
    if(i > 0){
        ele.text(str);
        i -= 1;
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
