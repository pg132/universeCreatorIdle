


function canBuyRebuyableRipple(){
 return user.ripple.ripplets.gte(user.ripple.rebuyable.cost) 
}

function buyRebuyableRipple(){
  if (!canBuyRebuyableRipple()) return //if you cant buy it
  user.ripple.ripplets = user.ripple.ripplets.mins(user.ripple.rebuyable.cost) 
  user.ripple.rebuyable.cost = user.ripple.rebuyable.cost.times(user.ripple.rebuyable.costMult)
  user.ripple.rebuyable.multiplier = user.ripple.rebuyable.multiplier.times(2)
}

function buyMaxRebuyableRipple() {
  if (!canBuyRebuyableRipple()) return //if you cant buy it
  var howMany = user.ripple.ripplets.div(user.ripple.rebuyable.cost).log10()//oom
  howMany = howMany*(new Decimal(user.ripple.rebuyable.costMult).log10())//its not 10x per
  howMany++// for the cheapest
  user.ripple.ripplets = user.ripple.ripplets.mins(user.ripple.rebuyable.cost.pow(howMany-1))//removeing the money
  user.ripple.rebuyable.cost = user.ripple.rebuyable.cost.times(user.ripple.rebuyable.costMult.pow(howMany))//cost
  user.ripple.rebuyable.multiplier = user.ripple.rebuyable.multiplier.times(Decimal.pow(2,howMany))//multiplier
}


function updateChallenges(){
 user.ripple.challenges.unlocked = user.ripple.upgrades.includes("R33") 
 user.ripple.challenges.harderUnlocked = user.ripple.upgrades.includes("R15") 
}

function getHarderReward1(){
 return Decimal.pow(10,Math.floor(user.ripple.challenges.HC1record.plus(1).log10()/10))
}

function getHarderReward2(){
 return Decimal.pow(10,Math.floor(user.ripple.challenges.HC2record.plus(1).log10()/20))
}

function updateHarderReward(number,value){
 user.ripple.challenges["HC"+number+"record"] = value
}


function howManyWells(){
 if (user.wells.tiercost != 9) return user["mk" + user.wells.tiercost].amount.gte(new Decimal(user.wells.cost - .00001)) ? 1 : 0
 var diff = user.mk9.base - user.wells.cost
 return Math.floor(1+diff/user.wells.costScale*getEaterReward(2))
}



