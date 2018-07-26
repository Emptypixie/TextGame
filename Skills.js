/**A skill to damage opponent*/
var Slash = {
    description: "",
    skill1: function () {
        return 10;//damage amount
    }
};

/**A passive skill to increase Attack by 1 */
var Courage = {
    description: "",
    skill1: function (self_creatuere) {self_creatuere.Attack += 1;  }
};

/**A  skill to breathe dragon fire*/
var DragonBreath = {
    description: "",
    skill1: function (){return 1000;}
};