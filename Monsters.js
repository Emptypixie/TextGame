class Goblin extends Monster{
    setmaxminlv(){
        this.maxlevel = 10;
        this.minlevel = 1;
    }

    examine(){
        return "goblin...";
    }
};

class Zombie extends Monster{
    setmaxminlv(){
        this.maxlevel = 10;
        this.minlevel = 1;
    }

    examine(){
        return "Zombie...";
    }
};

class Dark_Warrior extends Monster{
    setmaxminlv(){
        this.maxlevel = 20;
        this.minlevel = 10;
    }

    examine(){
        return "A sinister warrior.";
    }
}

class Dark_Priest extends Monster{
    setmaxminlv(){
        this.maxlevel = 20;
        this.minlevel = 10;
    }

    examine(){
        return "A sinister priest.";
    }
}

class Black_Dragon extends Monster{
    setmaxminlv(){
        this.maxlevel = 10000;
        this.minlevel = 100;
    }

    examine(){
        return "A legendary black dragon.";
    }
}