function ripple(){
 if (canRipple() == false) return
 //now check if we are in a chall, in which case add it to completeed challs DONE
 // then we want to check if we are in a harder chall (9 or 10) and do the stuff for that if so
 if (user.ripple.challenges.current == "chall9" || user.ripple.challenges.current == "chall10" ){
  updateHarderReward(user.ripple.challenges.current.substring(5)-8,user.gravicles)
 }
 user = {
    gravicles: new Decimal(10),
    mk1: {
      cost: new Decimal(10),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      previousTierCost: 0,
      costMult: new Decimal(1.15)
    },
    mk2: {
      cost: new Decimal(100),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      previousTierCost: 10,
      costMult: new Decimal(1.165)
    },
    mk3: {
      cost: new Decimal(1000),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      previousTierCost: 10,
      costMult: new Decimal(1.18)
    },
    mk4: {
      cost: new Decimal(1e4),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      previousTierCost: 10,
      costMult: new Decimal(1.2)
    },
    mk5: {
      cost: new Decimal(1e6),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      previousTierCost: 10,
      costMult: new Decimal(1.22)
    },
    mk6: {
      cost: new Decimal(1e9),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      unlocked: false,
      previousTierCost: 10,
      costMult: new Decimal(1.24)
    },
    mk7: {
      cost: new Decimal(1e13),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      unlocked: false,
      previousTierCost: 10,
      costMult: new Decimal(1.265)
    },
    mk8: {
      cost: new Decimal(1e18),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      unlocked: false,
      previousTierCost: 10,
      costMult: new Decimal(1.28)
    },
    mk9: {
      cost: new Decimal(1e25),
      amount: new Decimal(0),
      multiplier: new Decimal(1),
      base: 0,
      unlocked: false,
      previousTierCost: 10,
      costMult: new Decimal(1.3)
    },
    wells: {
      basecost: 20,
      cost: 20,
      tiercost: 5,
      defaultMults: 4,
      amount: 0,
      costScale: 20
    },
    pulse: {
      cost: 5,
      amount: 0,
      multipliers: []
    },
    points: {
      amount: new Decimal(0),
      upgradesCost: [1        ,      1,              2,      5,     50,     60,     70,     80,     90,    100,    110,    120,    130,     10,     10,     15,     20,     200,     30,     75     ,    100,     500,    200,          25,     50], //next line GP starts for gravity points and GPA stands for gravity points autobuyer             
      possibleUpgrade: ["GP11", "GP12", "GP21"        , "GP31", "GPA1", "GPA2", "GPA3", "GPA4", "GPA5", "GPA6", "GPA7", "GPA8", "GPA9", "GP41", "GP42", "GP51", "GP52", "GPA10", "GP61", "GP71"     , "GP72", "GPA11", "GP81", "GP91"     , "GP92"],
      requirements: [""       ,     "",  "GP11,GP12"  , "GP21", "GP31", "GPA1", "GPA2", "GPA3", "GPA4", "GPA5", "GPA6", "GPA7", "GPA8", "GP31", "GP31", "GP41", "GP42" , "GPA9", "GP51,GP52", "GP61", "GP61", "GPA10", "GP71,GP72", "GP81", "GP81"],
      upgrades: [],
      autobuyers: [],
      autobuyerTimes: [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
      autobuyerUpgCosts: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], //11 of them
      lastTimes: user.points.lastTimes
    },
    eaters: {
      GE1: {
        cost: new Decimal(1e100),
        scale: new Decimal(1e2),
        amount: 0
      },
      GE2: {
        cost: new Decimal(1e100),
        scale: new Decimal(1e2),
        amount: 0
      },
      GE3: {
        cost: new Decimal(1e100),
        scale: new Decimal(1e2),
        amount: 0
      },
      GE4: {
        cost: new Decimal(1e100),
        scale: new Decimal(1e2),
        amount: 0
      },
      GE5: {
        cost: new Decimal("1e400"),
        scale: new Decimal(1e5),
        amount: 0,
        unlocked: false
      },
      GE6: {
        cost: new Decimal("1e400"),
        scale: new Decimal(1e5),
        amount: 0,
        unlocked: false
      }//closes GE6
    },//closes eaters
    statistics: user.statistics,
    options: user.options,
    achievements: user.achievements,
    version: user.version,
    lastTick: user.lastTick,
    notification: user.notification,
    ripple:{
      times: user.ripple.times + 1,
      ripplets: user.ripple.ripplets + getRippletsToGive(),
      upgrades: user.ripple.upgrades,
      costs: user.ripple.costs,
      unlocked:user.ripple.unlocked,//number of rows
      challenges:{
        unlocked: user.ripple.challenges.unlocked,
        current: "",
        completed: user.challenges.completed.push(user.ripple.challenges.current),//MIGHT NOT WORK
        harderUnlocked: user.ripple.challenges.harderUnlocked,
        HC1record: user.ripple.challenges.HC1record,
        HC2record: user.ripple.challenges.HC2record,
      },
      rebuyable:user.ripple.rebuyable
    },
    multiplierGen: user.multiplierGen
  };
 //change things here
}








function canBuyRippleUpg(ID){ 
 var thing = "R" + ID
 if (!(user.ripple.upgrades.includes(thing))) return false
 var row = Math.floor(ID/10)
 var col = ID%10
 if (row > user.ripple.unlocked || col > user.ripple.unlocked) return false
 var k = (row == 1)||user.ripple.upgrades.includes("R"+(ID-10))
 var w = (col == 1)||user.ripple.upgrades.includes("R"+(ID-1))
 return k && w && canBuyRUpgCost(ID)
}

function canRipple(){
 return getRippletsToGive().gte(1)
}

function canBuyRUpgCost(ID){
 var row = Math.floor(ID/10)
 var col = ID%10
 var cost = user.ripple.cost[row][col]
 return user.ripple.ripplets.gte(cost-0.001)
}

function canBuyRebuyableRipple(){
 return user.ripple.ripplets.gte(user.ripple.rebuyable.cost) && user.ripple.upgrades.includes("R13")
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
 if (!(user.ripple.upgrades.includes("R23"))) return Math.min(Math.floor(1+diff/user.wells.costScale*getEaterReward(2)),1)
 return Math.floor(1+diff/user.wells.costScale*getEaterReward(2))
}

function getRippletsToGive(){
  var divider = 4000
  if (user.ripple.upgrades.includes("R32")) divider = 3900
  var main = Decimal.pow(10,(user.gravicles.plus(1).log10()/divider)-2.21)
  return main.times(user.pulse.amount).times(user.ripple.rebuyable.multipler).floor()
}

