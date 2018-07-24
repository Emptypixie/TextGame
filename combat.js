function combat(){
    var m = Map[player.x][player.y].monster;
    
    drawmp(player);
    drawlife(player);
    addlineafter();
    for(let i = 0; i < m.length; i++){
        
        drawmp(m[i]);
        drawlife(m[i]);
    }
    
}

function drawlife(creature){
    str = creature.name + " HP: ";

    for(let i = 0; i < creature.maxhp; i++){
        str += "|";
    }
    var ele = $('<div>').css("text-align", "center").insertAfter("#placeholder");
    ele.attr("id", creature.id + "hp");
    var speed = 20/str;
    typeWriter(ele, str, 0, speed);

}

function drawmp(creature){
    str = creature.name + " MP: ";

    for(let i = 0; i < creature.maxhp; i++){
        str += "|";
    }
    var ele = $('<div>').css("text-align", "center").insertAfter("#placeholder");
    ele.attr("id", creature.id + "mp");
    var speed = 20/str;
    typeWriter(ele, str, 0, speed);
}

function addlineafter(){
    var ele = $('<p>').css("text-align", "center").insertAfter("#placeholder");
    ele.text("----------------  vs  ----------------");
    ele.attr("id", "vs");
}