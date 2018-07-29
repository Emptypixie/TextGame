/**each hp and mp bar max length */
var MAXBARLENGTH = 100;

/**
 * fight according to style
 * @param {number} p_action use static variables like ATTACK, DEFNSE
 */
function fight(p_action){
    var m = monsterAtPlayerRoom();
    var i = getRand(0, m.length - 1);
    var opponent = m[i];

    damageFunc(player, opponent, p_action);//player attacks opponent

    sleep(500, function(){
        if(opponent.hpnow <= 0){//check if opponent hp is 0
            defeatedOpponent(opponent);
        }
        if(m.length == 0){//check if there are monsters in currnent room
            sleep(1500, removeCombat());
            game_state = PLAY_NON_COMBAT;
        } else {
            for(let i = 0; i < m.length; i++){
                damageFunc(m[i], player, p_action);
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
    var m = monsterAtPlayerRoom();
    adddiv("You defeated " + opponent.name + ".");

    playerGainXp(opponent.xp);

    var index = m.indexOf(opponent);//delete monster from current room
    m.splice(index, 1);
}

/**Xp calculation from my favorite game... */
function getxpforlv(L){
    return Math.floor(1.2 * 1 / 8 * L * (L - 1) + 75 * (Math.pow(2, (L - 1) / 7) - 1) / (1 - Math.pow(2, - 1 / 7)) - 0.109 * L);
}

/**
 * Adds xp to player.
 * Also check for level up.
 * @param {number} xp xp gained
 */
function playerGainXp(xp){
    adddiv_c("You gained " + xp + " xp.", "yellow");
    player.xp += xp;

    levelUp();
}

/** Check if player has enough xp for level up.
 * If so, then level up. Mulltiple level up is possible.
 */
function levelUp(){
    let nextlvxp = getxpforlv(player.level + 1);
    while(player.xp > nextlvxp){
        if(player.level != 100){
                player.levelup();
                adddiv_c("You leveled up! You are now level " + player.level + ".", "lime");
                nextlvxp = getxpforlv(player.level + 1);
        } else {
            adddiv("You are already max level. You cannot gain any more xp.");
            break;
        }
    }
    {
        if(player.level != 100){
            let str = separateNum(nextlvxp - player.xp);
            adddiv(str + " xp till next level.");
        }
    }
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
function damageFunc(c_att, c_def, p_action){
    var blockrate, parryrate, evaderate, hiderate;
    var dmg = damageCalc(c_att, c_def);//damage c_def deals to c_att
    var ran = getRand(0, 9999) / 10000; //0.0000 ~ 0.9999
    
    if(p_action == SKILLSPELL && c_att == player){
        //use skill
        console.log("player use skill");
    }

    if(p_action == RUNAWAY && c_def == player){
        hiderate = ((c_def.speed - c_att.speed) + (c_def.hpnow - c_att.hpnow) / 2) / 300 + 0.1;
        if(hiderate > ran){
            adddiv("You ran away.");
            game_state = PLAY_NON_COMBAT;
        } else {
            adddiv("You fail to ran away.");
        }
    }
    
    //evade, block, parry rate calculations.
    //evade: dmg = 0; block: dmg *= (1 - blockrate); parry: while(parryrate > ran){dmg*=parryrate; ran = getRand(0,4999)/5000;}
    
    if(game_state == COMBAT){
        evaderate = (c_def.speed * 0.99 - c_att.speed * 1.1) * 0.9 / 100;
        blockrate = (c_def.defense - c_att.attack) / 200;
        parryrate = getParryrate(c_def.speed, c_def.defense, c_att.speed, c_att.attack);
        if(evaderate > ran){
            dmg = 0;
            adddiv(c_def.name + " evaded " + c_att.name + "'s attack.");
        } else if(blockrate > ran){
            if(blockrate > 0.9) {blockrate == 0.9;}
            dmg *= (1 - blockrate);//damage c_def deals to c_att
            adddiv(c_def.name + " blocked " + c_att.name + "'s attack.");
        } else if(parryrate > ran){
            while(parryrate > ran){
                dmg *= parryrate;
                ran = getRand(0, 4999) / 5000;
            }
            adddiv(c_def.name + " parried " + c_att.name + "'s attack.");
        }
        
        if(dmg < 0) {dmg = 0;}
        dmg = Math.floor(dmg)
        c_def.hpnow -= dmg;
        adddiv(c_att.name + " deals " + dmg +" damage to " + c_def.name + ".");
        redrawlife(c_def);
        redrawmp(c_def);//put used mp value in second argument
    }
    
}

/**
 * Calculate parry rate (0 ~ 1)
 * @param {number} dspd defending creature.speed
 * @param {number} ddef defending creature.def
 * @param {number} aspd attacking creature.speed
 * @param {number} aatt attacking creature.atk
 */
function getParryrate(dspd, ddef, aspd, aatt){
    var a, b, c;
    b = Math.abs((4 * dspd - 3 * ddef) / (dspd + ddef));
    a = 10 - b;
    c = ((dspd - aspd) * a + (ddef - aatt) * b) / 2000;
    if(c <= 0){
        return 0.1;
    } else {
        return c + 0.1;
    }
}


/**
 * Calculates damage the offending creature deals to defending creature.
 * @param {Creature} c_att The attacking Creature
 * @param {Creature} c_def the deffending Creature
 */
function damageCalc(c_att, c_def){
    var dmg = c_att.attack * 10 + c_att.level;
    var reduc = c_def.defense * 5 + c_def.level;
    dmg -= reduc;
    return dmg;
}

/**
 * Appends player and monster name, hp, mp bar to #combat_area
 * Also adds string "combat with monster1, monster2, .... bega." before #placeholder
 */
function drawCombat(){
    $("#combat_area").empty();
    var m = monsterAtPlayerRoom();
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
    ele.attr("id", creature.id);
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
function redrawlife(creature){
    var id = "#" + creature.id + "hp";
    var element = $(id);
    var hprate = Math.ceil(creature.hpnow / creature.hp * MAXBARLENGTH);
    if(hprate < 0){hprate = 0;}
    let strred = numtoline(hprate);
    let strgray = numtoline(MAXBARLENGTH - hprate);
    element.html("<span id='" + creature.id + "hp0" + "' style='color: #ff0000'>" +
    strred + "</span><span id='" + creature.id + "hp1" + "' style='color: #29293d'>" + strgray + "</span>");
//29293d

    return true;
}

/**
 * Redraws the mp bar of crearture.
 * @param {Creature} creature 
 */
function redrawmp(creature){
    var id = "#" + creature.id + "mp";
    var element = $(id);
    var mprate = Math.ceil(creature.mpnow / creature.mp * MAXBARLENGTH);
    if(mprate < 0){mprate = 0;}
    let strred = numtoline(mprate);
    let strgray = numtoline(MAXBARLENGTH - mprate);
    element.html("<span id='" + creature.id + "mp0" + "' style='color: #0000ff'>" +
    strred + "</span><span id='" + creature.id + "mp1" + "' color='#00004d'>" + strgray + "</span>");
    return true;
}

/**
 * Draws new HP bar in combat_area.
 * @param {Creature} creature 
 */
function drawnewlife(creature){
    var hprate = Math.ceil(creature.hpnow / creature.hp * MAXBARLENGTH);
    
    let ele = $('<div>').css({"text-align": "center"});
    ele.attr("id", creature.id + "hp");
    $("#combat_area").append(ele);

    let strred = numtoline(hprate);
    let strgray = numtoline(MAXBARLENGTH - hprate);
    ele.html("<span id='" + creature.id + "hp0" + "' style='color: #ff0000'>" +
     strred + "</span><span id='" + creature.id + "hp1" + "' style='color: #29293d'>" + strgray + "</span>");
}
/**
 * Draws new MP bar in combat_area.
 * @param {Creature} creature 
 */
function drawnewmp(creature){
    var mprate = Math.ceil(creature.mpnow / creature.mp * MAXBARLENGTH);
    
    let ele = $('<div>').css({"text-align": "center"});
    ele.attr("id", creature.id + "mp");
    $("#combat_area").append(ele);

    let strred = numtoline(mprate);
    let strgray = numtoline(MAXBARLENGTH - mprate);
    ele.html("<span id='" + creature.id + "mp0" + "' style='color: #0000ff'>" +
     strred + "</span><span id='" + creature.id + "mp1" + "' color='#00004d'>" + strgray + "</span>");
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
        let ele = $("#" + ch1[i].id + "> span");
        if(ele.length == 2){//if it is a hp/mp bar
            let ele0 = $("#" + ch1[i].id + "0");
            let ele1 = $("#" + ch1[i].id + "1");
            ele0.attr('id', "#" + ch1[i].id + i);
            ele1.attr('id', "#" + ch1[i].id + i);
            removeCombatElement(ele0, ele0.text().length);
            removeCombatElement(ele1, ele1.text().length);
        } else {
            let ele0 = $("#" + ch1[i].id);
            ele0.attr('id', "#" + ch1[i].id + i);
            removeCombatElement(ele0, ele0.text().length);
        }
            
    }
    removeCombatElement($("#vs"), $("#vs").text().length);
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
