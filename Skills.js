/**A skill to damage opponent*/
var Slash1 = {
    description: "Weak slash attack. (10 damage)",
    skill: [function () {
        return 10;//damage amount
    }]
};

/**A passive skill to increase Attack by 1 */
var Courage1 = {
    description: "You feel a little brave. (+ 1 Attack)",
    skill: [function (self_creatuere) {
            self_creatuere.Attack += 1;  
        }]
};

/**A  skill to breathe dragon fire*/
var DragonBreath1 = {
    description: "Super hot! (1000 damage)",
    skill: [function (){return 1000;}]
};

/**spell to deal weak damage */
var FireBall1 = {
    description: "A small magical fire ball.",
    skill: [function(){return 10;}]
};