var achievements = []
var achieveNames = ["Just Starting","Baby’s first tier upgrade","That’s a lot of gravicles already!","4 score and 4 years ago, subject number 4 was admitted to ","To what? Good question.","This better be worth it","Wow! Extra generators!","Lucky number 6… no that's not right","Last mk achieved!","There’s NINE?",
                   "Stupid well, WORK","This really better be worth it","Going above and beyond","Now they’re working better","Sacrifice SACRIFICE SACRIFICE","Not the best idea","Ya see, I pulled a sneaky on ya","See? It is real","That’s a lot of killing","Look ma, no hands!"
                   ]
var possAchieve = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
//checkAchUnlocks() function is for everytick check achivements
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
        var k = achieveNames.length
        if (ID-9 > k || ID<10) return
        return achieveNames[ID-10]
}


function getNextLoreSet(){
        var k = currentLoreVal
        var goal = 0
        for (var i = 0; i < breakPoints.length; i++){
                if (breakPoints[i]> k){
                        goal = breakPoints[i]
                }
        }
        var l = []
        for (var i = k; i<goal; i++){
                l.push(lore[i])       
        }
        return l
}
var currentLoreVal = -1
//note next line, its 0 stored, and the numbers are the last one that should be outputted. 
var breakPoints = [7,8,9,12,14,15,16,18,21,23,25,30,34,36]
var lore = [
        "Computer, make a note",
        "Subject #364 has died of a malfunction in the system causing every atom of his body to be ripped apart across all of space time",
        "Send in subject #365",
        "... what do you mean he’s here",
        "O-oh hello!!",
        "Hello and welcome to universe creator idle, my name is [redacted] of [redacted] laboratories and I will help you achieve your dreams of being a master of your own virtual universe",
        "However you can’t just build it from galaxies or planets, that would just be TOO easy",
        "You see, there are these little things called gravicles, here have 10, go buy yourself a generator.",//number 8 1 stored
        //only after mk1 bought
        "Good job! 1 generator won’t be enough and neither will 20 or 100 or… you get it, try to get an mk2. It produces mk1s. Though it won’t increase that multiplier on the left, that is only increased by buying it yourself.",
        //only after mk2 bought
        "Good job, now get mk3, you get the gist.",
        //after 20mk5
        "Nice job buckeroo. That’s a lot of gravicles. In the hundreds of millions or more!",
        "That box in the corner? That's a good thing to use, and no, it's not for water…",
        "Anyway, now that you have so many gravicles, you can buy one of those gravitational wells and make a dent in spacetime itself.",
        //after first well
        "WOOOWEEE what a dent! Don’t be sad all your progress is gone, the well is good, it gives a 2x boost to your mk 1 generator. that's not all, your next well will give a boost to both mk1 and 2, and the one after that will give a boost to the first 3, and so on.",
        "ISN’T THAT JUST GREAT!",
        //after mk6
        "oh i must’ve forgotten to tell you, the wells give more generators, who knows how many?????",
        //after mk9
        "Oh yeah, the ninth one is the last one and-what do you mean it's a lie?",
        //after 5th well
        "Oh yeah i forgot to tell you, digging a hole in spacetime is difficult so after you upgrade a certain mk 4 times, each upgrade afterwards gets weaker.",
        "don't FRET! You have access to a pulse, it makes your spacetime dent pulse back up and then, with your help, go deeper than before!",
        //after pulse
        "HUZZAH now you can upgrade each mk 5 times before it starts getting weaker!",
        "Oh! It also gives a boost to all the mks?!?!",
        "That’s pretty nifty, aww, this doesn't go on forever:( the cost of a pulse went up!",
        //after 6th pulse
        "ya know what? These pulses are cool and strong and all but I’m not really feeeeeeeling it. Don’t get me wrong, e58 gravicles is a lot but the pulses are not giving all the potential they could",
        "Try sacrificing a pulse, it will revert the effects of it but it will give you a point",
        //after sacing
        "Buy something with it! Don’t be shy you only have 2 options right now.",
        "You can sacrifice a pulse and get points whenever you want, as long as you don't go under 2 pulses",
        //after eaters
        "you would have never guessed that there are little living things at a scale this low",
        "hehehe theyre kinda cute",
        "anyway, you can hire those 4 by feeding them gravicles so that they stomp on space time for you",
        "each one does it in a different way, but we aren't telling how...",
        "they’re kinda expensive but its worth it",
        //e80 grav
        "you have A LOT of gravicles right now, but to let you appreciate the size here’s an example",
        "there are e80 ATOMS in the UNIVERSE",
        "WOOOWWEEE thats a lot",
        "not enough though, carry on",
        //after autobuyer
        "oooh, autobuyers, they’re great!",
        "doing less work is always a plus!"
        ]
        
        
        
        
        
        
        
        
        
