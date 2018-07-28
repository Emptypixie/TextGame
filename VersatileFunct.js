
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
        /*if(i < str.length){
            ele.text(ele.text() + str.charAt(i));
            i++;
        } */
        return window.setTimeout(typeWriter, interval, ele, str, i);
    } else {
        //scrollBottomConsole();
        return true;
    }
}

/**Scroll to the bottom of #console */
function scrollBottomConsole(){
    $("#console").scrollTop($("#combat_area").offset().top + $("#combat_area").height());
}
/**
 * Delete letters from a HTML element's text
 * @param {HTMLElement} ele HTML element
 * @param {number} i number of letters to delete
 */
function typeWriterDel(ele, i){
    var str = ele.text();
    var interval = getInterval(str);
    str = str.substring(1, str.length - 1);
    if(i > 0){
        ele.text(str);
        i -= 2;
        return window.setTimeout(typeWriterDel, interval, ele, i);
    } else return true;
}

/**
 * Adds a new <p> element.
 */
function addline(){//new line
    var ele = $('<p>').css("text-align", "center").insertBefore("#placeholder");
    $('</p>').css("text-align", "center").insertBefore("#placeholder");
    //scrollBottomConsole();
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
 * 
 * @param {number} waitSec time to wait in mill sec
 * @param {*} callbackFunc what to do after time runs out
 */
function sleep(waitSec, callbackFunc){
    var spanedSec = 0;
    var id = setInterval(function(){
        spanedSec += 100;
        if(spanedSec >= waitSec){
            clearInterval(id);
            if(callbackFunc){
                callbackFunc();
            }
        }
    }, 100);
}

/**
 * Calculate interval from TYPINGSPEED and the string's length.
 * @param {string} str what to type in.
 */
function getInterval(str){
    return str.length / TYPINGSPEED + getRand(TYPEMINRAN, TYPEMAXRAN);
}

function separateNum(num){
    var n = num;
    var str = "";
    for(let i = Math.floor((String(num).length - 1) / 3); i > 0; i--){
        str += Math.floor(Number(num) / Math.pow(10, i * 3));
        num -= Math.floor(Number(num) / Math.pow(10, i * 3)) *  Math.pow(10, i * 3);
        str += ",";
    }
    str += num;

    return str;
}