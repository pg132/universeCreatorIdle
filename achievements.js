var achievements = []
var achieveNames = ["Just Starting","Baby’s first tier upgrade","That’s a lot of gravicles already!","4 score and 4 years ago, subject number 4 was admitted to ","To what? Good question.","This better be worth it","Do you know what you get when you add a 6 and a flipped 6!?!?","Lucky number 6… no that's not right","Last mk achieved!","There’s NINE?",
                   "Stupid well, WORK","This really better be worth it","Going above and beyond","Now they’re working better","Sacrifice SACRIFICE SACRIFICE","Not the best idea","Ya see, I pulled a sneaky on ya","See? It is real","That’s a lot of killing","Look ma, no hands!"
                   ]
var possAchieve = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
function hasAch(ID){
        return achievements.includes(ID)
}
function giveAch(ID){
        if (possAchieve.includes(ID) && !achievements.includes(ID)) achievements.push(ID)
}
function getAllAch(){
        return achievements       
}
function getAchName(ID){
        var k = 0
        for (var i = 0; i<possAchieve.length; i++
}
