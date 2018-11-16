var achievements = []
var achieveNames = []
var possAchieve = []
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
