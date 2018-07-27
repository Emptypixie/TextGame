class Goblin extends Monster{

    setmaxminlv(){
        this.maxlevel = 10;
        this.minlevel = 1;
    }

    setJob(){
        this.job[0] = new jWarrior();
    }

    setRace(){
        this.race[0] = new rGoblin();
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

    setJob(){
        this.job[0] = new jWarrior();
    }

    setRace(){
        this.race[0] = new rSkeleton();
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

    setJob(){
        this.job[0] = new jWarrior();
    }

    setRace(){
        this.race[0] = new rHuman();
    }

    examine(){
        return "A sinister warrior.";
    }
}

class Dark_Priest extends Monster{
    
    setJob(){
        this.job[0] = new jPriest();
    }

    setRace(){
        this.race[0] = new rHuman();
    }

    setmaxminlv(){
        this.maxlevel = 20;
        this.minlevel = 10;
    }

    examine(){
        return "A sinister priest.";
    }
}

class Black_Dragon extends Monster{
    setJob(){
        this.job = [];
    }

    setRace(){
        this.race[0] = new rDragon();
    }
    
    setmaxminlv(){
        this.maxlevel = 10000;
        this.minlevel = 100;
    }

    examine(){
        return "A legendary black dragon.";
    }
}