var diffMultiplier = 1
var test = true
var subTab = {
  "points": "upgrades"
}

function getDefaultSave() {
  return {
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
      requirements: [""       ,     "",  "GP11,  GP12", "GP21", "GP31", "GPA1", "GPA2", "GPA3", "GPA4", "GPA5", "GPA6", "GPA7", "GPA8", "GP31", "GP31", "GP41", "GP42" , "GPA9", "GP51,GP52", "GP61", "GP61", "GPA10", "GP71,GP72", "GP81", "GP81"],
      upgrades: [],
      autobuyers: [],
      autobuyerTimes: [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
      autobuyerUpgCosts: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], //11 of them
      lastTimes: [new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime(), new Date().getTime()] //11 of them
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
        cost: new Decimal(1e400),
        scale: new Decimal(1e5),
        amount: 0,
        unlocked: false
      },
      GE6: {
        cost: new Decimal(1e400),
        scale: new Decimal(1e5),
        amount: 0,
        unlocked: false
      }//closes GE6
    },//closes eaters
    statistics: {
      playtime: 0,
      totalGravicles: new Decimal(0),
      sacrificed: 0
    },
    options: {
      notation: "Scientific"
    },
    achievements: [],
    version: 0.104,
    lastTick: new Date().getTime(),
    notification: {
      achLen: 0,
      loreLen: 0
    },
    ripple:{
      times: 0,
      ripplets: new Decimal(0),
      upgrades: [[1,2,3,30,150],[1,4,10,40,300],[5,8,25,75,500],[30,50,85,125,750],[250,500,800,1250,1500]],
      costs:[],//have it be a list of lists with the costs
      unlocked: 3,//number of rows
      challenges:{
        unlocked: false,
        current: "",
        completed: [],
        harderUnlocked: false,
        HC1record: new Decimal(0),
        HC2record: new Decimal(0),
      },
      rebuyable:{
        cost: new Decimal(5),
        costMult: 20,
        multiplier: new Decimal(1),
      }
    },
    multiplierGen:{
      unlocked: false,
      set1:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(10),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(100),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e3),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e4),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e5),
          costMult: 2
        }
      },
      set2:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(1e2),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e3),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e4),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e5),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e6),
          costMult: 2
        }
      },
      set3:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(1e3),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e4),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e5),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e6),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e7),
          costMult: 2
        }
      },
      set4:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(1e4),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e5),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e6),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e7),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e8),
          costMult: 2
        }
      },
      set5:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(1e5),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e6),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e7),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e8),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e9),
          costMult: 2
        }
      },
      set6:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(1e6),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e7),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e8),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e9),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e10),
          costMult: 2
        }
      },
      set7:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(1e7),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e8),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e9),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e10),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e11),
          costMult: 2
        }
      },
      set8:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(1e8),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e9),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e10),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e11),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e12),
          costMult: 2
        }
      },
      set9:{
        mk1: {
          amount: new Deicmal(0),
          cost: new Decimal(19),
          costMult: 2,
        },
        mk2: {
          amount: new Deicmal(0),
          cost: new Decimal(1e10),
          costMult: 2,
        },
        mk3: {
          amount: new Deicmal(0),
          cost: new Decimal(1e11),
          costMult: 2,
        },
        mk4: {
          amount: new Deicmal(0),
          cost: new Decimal(1e12),
          costMult: 2,
        },
        mk5: {
          amount: new Deicmal(0),
          cost: new Decimal(1e13),
          costMult: 2
        }
      }//closes set9
      
    }//closes multGens
  };

}



var user = getDefaultSave();

function buyMK(tier, quick) {
  var tierCost = user["mk" + tier].previousTierCost
  var gravCost = user["mk" + tier].cost
  var costMult = user["mk" + tier].costMult
  var mainScale = 1 + .01 / getEaterReward(4)
  var buyingMult = 1.01
  if (user.ripple.upgrades.includes("R11")) buyingMult = 1.05
  if (hasAch(30) && user["mk" + tier].base < 10) buyingMult = buyingMult**3 //1.01**3
  var costDelay = getEaterReward(6)
  var w = 1 + .1 / getEaterReward(4)
  var constScale = Math.max(1, (user["mk" + tier].base - 900) / 100)
  w *= constScale
  mainScale *= constScale
  if (tier == 1) {
    if (gravCost.lte(user.gravicles)) {
      user.gravicles = user.gravicles.minus(gravCost)
      user["mk" + tier].cost = user["mk" + tier].cost.times(costMult)
      //what should the multiplier formula be? rn im gonna make it 1% stronger
      user["mk" + tier].multiplier = user["mk" + tier].multiplier.times(buyingMult)
      user.mk1.amount = user.mk1.amount.plus(1)
      user.mk1.base += 1
      if (user.mk1.base > 30 + costDelay && user.mk1.base % 10 === 0) {
        user.mk1.costMult = user.mk1.costMult.times(mainScale);
        if (user.mk1.base % 50 === 0 && user.mk1.base >= 300 + costDelay) user.mk1.costMult = user.mk1.costMult.times(w)
        if (user.mk1.base % 100 == 0 && user.mk1.base > 400 + costDelay) user.mk1.costMult = user.mk1.costMult.times((1.25 + 1.75 / getEaterReward(4)) * constScale)
      } else {
        user.mk1.costMult = user.mk1.costMult.times(constScale)
      }
      giveAch(10)
    }
  } else if (gravCost.lte(user.gravicles) && user["mk" + (tier - 1)].amount.gte(tierCost) && tier <= 5 && tier >= 2) {
    user.gravicles = user.gravicles.minus(gravCost)
    user["mk" + tier].cost = user["mk" + tier].cost.times(costMult)
    //what should the multiplier formula be? rn im gonna make it 1% stronger
    user["mk" + tier].multiplier = user["mk" + tier].multiplier.times(buyingMult)
    user["mk" + (tier - 1)].amount = user["mk" + (tier - 1)].amount.minus(tierCost)
    user["mk" + tier].amount = user["mk" + tier].amount.plus(1)
    user["mk" + tier].base += 1
    if (user["mk" + tier].base > 30 + costDelay && user["mk" + tier].base % 10 === 0) {
      user["mk" + tier].costMult = user["mk" + tier].costMult.times(mainScale);
      if (user["mk" + tier].base % 50 === 0 && user["mk" + tier].base >= 300 + costDelay) user["mk" + tier].costMult = user["mk" + tier].costMult.times(w)
      if (user["mk" + tier].base % 100 == 0 && user["mk" + tier].base > 400 + costDelay) user["mk" + tier].costMult = user["mk" + tier].costMult.times((1.25 + 1.75 / getEaterReward(4)) * constScale)
    } else {
      user["mk" + tier].costMult = user["mk" + tier].costMult.times(constScale)
    }
    giveAch(9 + tier)
  } else if (gravCost.lte(user.gravicles) && user["mk" + (tier - 1)].amount.gte(tierCost) && tier >= 6) {
    if (user["mk" + tier].unlocked == true) {
      user.gravicles = user.gravicles.minus(gravCost)
      user["mk" + tier].cost = user["mk" + tier].cost.times(costMult)
      //what should the multiplier formula be? rn im gonna make it 1% stronger
      user["mk" + tier].multiplier = user["mk" + tier].multiplier.times(buyingMult)
      user["mk" + (tier - 1)].amount = user["mk" + (tier - 1)].amount.minus(tierCost)
      user["mk" + tier].amount = user["mk" + tier].amount.plus(1)
      user["mk" + tier].base += 1
      if (user["mk" + tier].base > 30 + costDelay && user["mk" + tier].base % 10 === 0) {
        user["mk" + tier].costMult = user["mk" + tier].costMult.times(mainScale);
        if (user["mk" + tier].base % 50 === 0 && user["mk" + tier].base >= 300 + costDelay) user["mk" + tier].costMult = user["mk" + tier].costMult.times(w)
        if (user["mk" + tier].base % 100 == 0 && user["mk" + tier].base > 400 + costDelay) user["mk" + tier].costMult = user["mk" + tier].costMult.times((1.25 + 1.75 / getEaterReward(4)) * constScale)
      } else {
        user["mk" + tier].costMult = user["mk" + tier].costMult.times(constScale)
      }
      giveAch(10 + tier)
    }
  }
  if (user["mk" + tier].cost.gte(new Decimal("1e4000"))) user["mk" + tier].costMult = user["mk" + tier].costMult.times(2)
  //abv is mult scale for ripple
}

function solveQuad(a, b, c) {
  var descrim = Math.sqrt(b * b - 4 * a * c)
  return [(-b + descrim) / 2 / a, (-b - descrim) / 2 / a]
}

function buyMaxMK(tier, quick) {
  var tierCost = user["mk" + tier].previousTierCost
  var gravCost = user["mk" + tier].cost
  var costMult = user["mk" + tier].costMult
  var grav = user.gravicles
  if (tier == 1) {
    while (grav.gte(gravCost)) {
      buyMK(tier, true);
      tierCost = user["mk" + tier].previousTierCost
      gravCost = user["mk" + tier].cost
      grav = user.gravicles
    }
  } else if (tier <= 5) { //closes tier==1 and opens tier<=5&&tier>1
    while (grav.gte(gravCost) && user["mk" + (tier - 1)].amount.gte(tierCost)) {
      buyMK(tier, true);
      tierCost = user["mk" + tier].previousTierCost
      gravCost = user["mk" + tier].cost
      grav = user.gravicles
    }
  } else { //tier is abv 5
    if (user["mk" + tier].unlocked) {
      while (grav.gte(gravCost) && user["mk" + (tier - 1)].amount.gte(tierCost)) {
        buyMK(tier, true);
        tierCost = user["mk" + tier].previousTierCost
        gravCost = user["mk" + tier].cost
        grav = user.gravicles
      }
    } //closes unlocked if
  } //closes else refering to tier >= 5
}

function maxAll() {
  for (var i = 9; i > 0; i--) {
    buyMaxMK(i, true);
  }
}

function getRippletsToGive(){
  var divider = 4000
  if (user.ripple.upgrades.includes("R32")) divider = 3900
  var main = Decimal.pow(10,(user.gravicles.plus(1).log10()/divider)-2.21)
  return main.times(user.pulse.amount).times(user.ripple.rebuyable.multipler).floor()
}

function checkAchUnlocks() {
  if (user.pulse.amount == 9 && user.wells.amount == 9 && user.mk9.amount == new Decimal(99)) giveAch(25)
  var canget31 = true
  for (var i = 1; i <= 8; i++) { //8 bc mk10 isnt a thing
    if (user["mk" + i].multiplier.gte(user["mk" + (i + 1)].multiplier)) canget31 = false
  }
  if (canget31) giveAch(31)
  if (user.points.autobuyerTimes[0] < 100 && user.points.autobuyerTimes[1] >= 10000) giveAch(35)
  var maxGE = Math.max(Math.max(user.eaters.GE1.amount, user.eaters.GE2.amount), Math.max(user.eaters.GE3.amount, user.eaters.GE4.amount))
  var thirty6fails = 0
  for (var i = 1; i <= 4; i++) {
    if (maxGE / 10 >= user.eaters["GE" + i].amount) thirty6fails += 1
  }
  if (thirty6fails == 1 && maxGE > 10) giveAch(36)
  if (user.points.amount.gte(10)) giveAch(26)
  if (user.gravicles.gte(1e100)) giveAch(28)
  if (user.points.upgrades.includes("GPA11") && user.eaters.GE5.amount == 0 && user.eaters.GE6.amount == 0) giveAch(37)
  if ((!user.points.upgrades.includes("GPA11")) && user.points.upgrades.length == user.points.possibleUpgrade.length - 1) giveAch(38)

  var achChallR1 = true
  for (i = 1; i <= 9; i++) {
    if (!hasAch(29 + i)) achChallR1 = false
  }
  if (achChallR1) giveAch(39)
}



// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS
// BELOW IS ALL OF THE DISPLAY AND PRODUCTION FUNCTIONS



var showPoints = user.pulse.amount >= 6 || user.points.amount.gte(1) || !(user.points.upgrades.length == 0)


function getMkAmount(tier) {
  if (tier > 8) return user.mk9.base
  if (user["mk" + (tier + 1)].amount.eq(0)) return user["mk" + tier].amount.round()
  return user["mk" + tier].amount
}

function baseMKproduction(tier) {
  var amt = user["mk" + tier].amount
  var mult = user["mk" + tier].multiplier
  mult = mult.times(gravityWellBoost(tier))
  if (hasAch(31)) mult = mult.times(2)
  if (tier == 2 && user.wells.amount >= 1 && user.points.upgrades.includes("GP12")) mult = mult.times(100)
  if (tier == 9 && (user.points.upgrades.includes("GP41"))) mult = mult.times(1000)
  var fpwMult = 1.5
  if (user.eaters.GE5.unlocked) fpwMult *= getEaterReward(5)
  mult = mult.times(Decimal.pow(1 + fpwMult / tier, user.wells.defaultMults - 4))
  if (user.ripple.times >= 1) mult = mult.times(10)
  if (user.ripple.upgrades.includes("R31")) mult = mult.times(Decimal.pow(1.1,Math.min(user.ripple.times,50)).plus(20))
  //put additional mults here
  if (hasAch(39) && mult.gte(1e100)) mult = mult.times(1e10)
  if (user.points.upgrades.includes("GP92")) {
    if (user["mk" + tier].amount == 0) return new Decimal(0)
    return amt.plus(10).times(mult)
  }
  return amt.times(mult)
}

function baseMKmult(tier) {
  var mult = user["mk" + tier].multiplier
  mult = mult.times(gravityWellBoost(tier))
  if (hasAch(31)) mult = mult.times(2)
  if (tier == 2 && user.wells.amount >= 1 && user.points.upgrades.includes("GP12")) mult = mult.times(100)
  if (tier == 9 && (user.points.upgrades.includes("GP41"))) mult = mult.times(1000)
  var fpwMult = 1.5
  if (user.eaters.GE5.unlocked) fpwMult *= getEaterReward(5)
  mult = mult.times(Decimal.pow(1 + fpwMult / tier, user.wells.defaultMults - 4))
  if (user.ripple.times >= 1) mult = mult.times(10)
  if (user.ripple.upgrades.includes("R31")) mult = mult.times(Decimal.pow(1.1,Math.min(user.ripple.times,50)).plus(20))
  //put additional mults here
  if (hasAch(39) && mult.gte(1e100)) mult = mult.times(1e10)
  return mult

}

function MKproduction(diff) {
  var addGrav = baseMKproduction(1).times(diff)
  user.gravicles = user.gravicles.plus(addGrav)
  user.statistics.totalGravicles = user.statistics.totalGravicles.plus(addGrav)
  for (var i = 2; i <= 9; i++) user["mk" + (i - 1)].amount = user["mk" + (i - 1)].amount.plus(baseMKproduction(i).times(diff))
}

//helper functions for update()
//helper functions for update()
//helper functions for update()
//helper functions for update()
//helper functions for update()
//helper functions for update()
//helper functions for update()
//helper functions for update()
//helper functions for update()


function buyable(tier) {
  var gravCost = user["mk" + tier].cost
  if (gravCost.gt(user.gravicles)) return false
  var tierCost = user["mk" + tier].previousTierCost
  var unlocked = true
  if (tier > 5) unlocked = user["mk" + tier].unlocked
  if (tier < 2) return true
  return gravCost.lte(user.gravicles) && new Decimal(getMkAmount(tier - 1)).gte(tierCost) && unlocked
}
  
function changeSubTab(mainTab, name) {
  subTab[mainTab] = name
}


function update() {
  document.getElementById("gravicle amount").innerHTML = shorten(user.gravicles);
  if (user.statistics.sacrificed > 0 || user.points.amount.gt(0) || user.points.upgrades.length > 0) {
    document.getElementById("points button").style.display = "inline"
  } else {
    document.getElementById("points button").style.display = "none"
  }
  if (user.statistics.totalGravicles.gt(1e100)) {
    document.getElementById("eaters button").style.display = "inline"
  } else {
    document.getElementById("eaters button").style.display = "none"
  }
  if (document.getElementById('generators').style.display != "none") {
    for (var i = 1; i <= 9; i++) {
      var str = "mk" + i + "Amount";
      document.getElementById(str).innerHTML = shorten(user["mk" + i].amount);
      if (i == 9) document.getElementById(str).innerHTML = getMkAmount(9)
      if (i === 1) {
        document.getElementById("buy" + i).innerHTML = "Cost: " + shorten(user["mk" + i].cost);
      } else {
        document.getElementById("buy" + i).innerHTML = "Cost: " + shorten(user["mk" + i].cost) + " & " + user["mk" + i].previousTierCost + " mk" + (i - 1) + "s";
      }
      document.getElementById("mult" + i).innerHTML = "x" + shortenMult(baseMKmult(i));
      if (buyable(i)) {
        document.getElementById("buy" + i).className = "button";
        document.getElementById("buy" + i + "Max").className = "button";
      } else {
        document.getElementById("buy" + i).className = "buttonlocked";
        document.getElementById("buy" + i + "Max").className = "buttonlocked";
      }
    }
    showMK();
    showGravPoints();
    document.getElementById("pointsBuy1").innerHTML = "Sacrifice one galaxy pulse, for one galaxy point";
    if (buyablePoints()) {
      document.getElementById("pointsBuy1").className = "button"
    } else {
      document.getElementById("pointsBuy1").className = "buttonlocked";
    }
    document.getElementById("well").innerHTML = "Reset the game for a boost<br/>Cost: " + Math.ceil(user.wells.cost) + " mk" + Math.ceil(user.wells.tiercost) + "s";
    document.getElementById("pulse").innerHTML = "Lose all of your previous progress, but get an improvement to wells<br/>Requires: " + user.pulse.cost + " wells";
    if (buyableWell()) {
      document.getElementById("well").className = "button";
    } else {
      document.getElementById("well").className = "buttonlocked";
    }
    if (buyablePulse()) {
      document.getElementById("pulse").className = "button";
    } else {
      document.getElementById("pulse").className = "buttonlocked";
    }
    document.getElementById("well number").innerHTML = "Gravity Wells: " + user.wells.amount;
    document.getElementById("pulse number").innerHTML = "Gravitational Pulses: " + user.pulse.amount + " (" + user.wells.defaultMults + " wells at full power)";
    document.getElementById("point amount").innerHTML = "Gravitational Points: " + shorten(user.points.amount);
  }
  //points
  if (document.getElementById('points').style.display != "none") {
    document.getElementById("upgrades button").style.display = ""
    document.getElementById("autobuyers button").style.display = ""
    document.getElementById("point amount upgrades").innerHTML = "You have " + shorten(user.points.amount) + " Gravitational Points."
    if (subTab["points"] == "upgrades") {//for upgs subtab
      document.getElementById('upgrades').style.display = ""
      for (var i = 0; i < user.points.possibleUpgrade.length; i++) {
        var upgid = user.points.possibleUpgrade[i]
        var div = document.getElementById(upgid)
        if (div !== null) {
          if (user.points.upgrades.includes(upgid)) div.className = "upgradebtn buttonbought"
          else {
            if (user.points.amount.lt(user.points.upgradesCost[i]) || !isGPupgradePossible(upgid)) div.className = "upgradebtn buttonlocked"
            else div.className = "upgradebtn button"
          }
        }
      }
      document.getElementById("GP41 effect").innerHTML = shorten(1e3)
    } else {
      document.getElementById("upgrades").style.display = "none"
    }
    if (subTab["points"] == "autobuyers") {
      document.getElementById('autobuyers').style.display = ""
      for (var i = 0; i<user.points.autobuyerUpgCosts.length; i++){
        document.getElementById("autobuyer"+(i+1)+"upg").innerHTML = "Current Speed: "+user.points.autobuyerTimes[i] + "ms<br> Cost: " + user.points.autobuyerUpgCosts[i] + " GP"
        document.getElementById("autobuyer"+(i+1)+"upg").className = "upgradebtn buttonbought"
        if (buyableSpeedUpg(i+1)) document.getElementById("autobuyer"+(i+1)+"upg").className = "upgradebtn button"
        if ((!buyableSpeedUpg(i+1)) && user.points.autobuyerTimes[i] != 100){//if we cant buy it bc and its not bc we have maxed it
          document.getElementById("autobuyer"+(i+1)+"upg").className = "upgradebtn buttonlocked"
        }
        
        document.getElementById("autorow" + (i+1)).style.display = "table-row"
        
        var autoCost = (5+i)*10
        if (i == 9) autoCost = 200   //well
        if (i == 10) autoCost = 500    //pulse
        var thing = ["1st MK autobuyer","2nd MK autobuyer","3rd MK autobuyer","4th MK autobuyer","5th MK autobuyer","6th MK autobuyer","7th MK autobuyer","8th MK autobuyer","9th MK autobuyer","Well autobuyer","Pulse autobuyer"][i]
        document.getElementById("autobuyer"+(i+1)+"unlock").innerHTML = "Unlock the " + thing + "<br>Cost: " + autoCost + " GP"
        document.getElementById("autobuyer"+(i+1)+"unlock").className = "upgradebtn buttonlocked"
        var upgCost = user.points.possibleUpgrade.indexOf("GPA"+(i+1))//the value that we want to extrac
        upgCost = user.points.upgradesCost[upgCost]//extracing it
        if (isGPupgradePossible("GPA"+(i+1)) && user.points.amount.gte(upgCost-0.0001)) document.getElementById("autobuyer"+(i+1)+"unlock").className = "upgradebtn button"
        if (user.points.upgrades.includes("GPA"+(i+1))) document.getElementById("autobuyer"+(i+1)+"unlock").className = "upgradebtn buttonbought"
      }
    } else {
      document.getElementById('autobuyers').style.display = "none"
    }
  } else {
    document.getElementById("upgrades").style.display = "none"
    document.getElementById('autobuyers').style.display = "none"
    document.getElementById("upgrades button").style.display = "none"
    document.getElementById("autobuyers button").style.display = "none"
  }
  //eaters
  if (document.getElementById('eaters').style.display) { // 																																							i did this bc something is wrong with my github
    if (document.getElementById('eaters').style.display != "none") {
      for (var i = 1; i <= 4; i++) {
        document.getElementById("eater" + i).innerHTML = "Upgrade Gravity Eater #" + i + "<br>" + (["Pulses", "Wells", "Wells", "MK Scalings"])[i - 1] + " are " + (shorten(getEaterReward(i) * 1000 - 1000) / 10) + "% " + (["cheaper", "cheaper", "stronger", "less"])[i - 1] + "<br>Cost: " + formatValue(user.options.notation, user.eaters["GE" + i].cost, 0, 0)
        if (buyableGE(i)) document.getElementById("eater" + i).className = "upgradebtn button"
        else document.getElementById("eater" + i).className = "upgradebtn buttonlocked"
      }
      for (var i = 5; i <= 6; i++) {
        if (i != 6) document.getElementById("eater" + i).innerHTML = "Upgrade Gravity Eater #" + i + "<br>" + (["FPW mult is", null])[i - 5] + " " + (shorten(getEaterReward(i) * 1000 - 1000) / 10) + (["% stronger", null])[i - 5] + "<br>Cost: " + formatValue(user.options.notation, user.eaters["GE" + i].cost, 0, 0)
        else document.getElementById("eater" + i).innerHTML = "Upgrade Gravity Eater #6<br>MK Scalings starts " + getEaterReward(6) + " buys later.<br>Cost: " + formatValue(user.options.notation, user.eaters.GE6.cost, 0, 0)
        if (buyableGE(i)) document.getElementById("eater" + i).className = "upgradebtn button"
        else document.getElementById("eater" + i).className = "upgradebtn buttonlocked"
        if (!user.eaters["GE" + i].unlocked) {
          document.getElementById("eater" + i).style.display = "none"
          document.getElementById("eaterMax" + i).style.display = "none"
        } else {
          document.getElementById("eater" + i).style.display = ""
          document.getElementById("eaterMax" + i).style.display = ""
        }
      }
    }
  }
  if (document.getElementById('options').style.display != "none") {
    document.getElementById("hotkey").innerHTML = "Hotkeys: " + (user.options.hotkeys ? "On" : "Off")
  }
  if (document.getElementById('statistics').style.display != "none") {
    document.getElementById("playtime").innerHTML = "You have played this game for " + timeDisplay(user.statistics.playtime) + "."
    document.getElementById("total gravicles").innerHTML = "You made " + shorten(user.statistics.totalGravicles) + " gravicles in total."
    var showMoreStats = user.statistics.sacrificed > 0
    if (showMoreStats) {
      document.getElementById("sacrifices stat").style.display = "block"
      document.getElementById("sacrifices stat").innerHTML = "You have sacrificed pulses " + user.statistics.sacrificed + " time" + (user.statistics.sacrificed == 1 ? "." : "s.")
    } else document.getElementById("sacrifices stat").style.display = "none"
    showMoreStats = showMoreStats || user.pulse.amount > 0
    if (showMoreStats) {
      document.getElementById("pulses stat").style.display = "block"
      document.getElementById("pulses stat").innerHTML = "You currently have " + user.pulse.amount + " pulse" + (user.pulse.amount == 1 ? "." : "s.")
    } else document.getElementById("pulses stat").style.display = "none"
    showMoreStats = showMoreStats || user.wells.amount > 0
    if (showMoreStats) {
      document.getElementById("wells stat").style.display = "block"
      document.getElementById("wells stat").innerHTML = "You currently have " + user.wells.amount + " well" + (user.wells.amount == 1 ? "." : "s.")
    } else document.getElementById("wells stat").style.display = "none"
  }
  if (document.getElementById('achievements').style.display != "none") {
    for (var i = 0; i < possAchieve.length; i++) {
      var thing = possAchieve[i]
      document.getElementById("A" + thing).innerHTML = achieveNames[i]
      if (hasAch(thing)) document.getElementById("A" + thing).className = "achbtn buttonbought"
      else document.getElementById("A" + thing).className = "achbtn buttonlocked"

    }
  }
  if (document.getElementById("lore").style.display != "none") {
    for (var i = 0; i <= 35; i++) {
      document.getElementById("lore" + i).innerHTML = lore[i]
      document.getElementById("lore" + i).style.display = "block"
      if (!unlockedLore(i)) document.getElementById("lore" + i).style.display = "none"
    }
  }

  //stuff for changing tab colors
  //tabNotification is the thing
  //achLen and loreLen
  /*
  var loreNot = false
  if (user.notification.loreLen != 0){
  	if (!(unlockedLore(user.notification.lorLen) && !unlockedLore(user.notification.lorLen+1))) loreNot = true
  } else loreNot = true
  if (loreNot){
  	document.getElementById("lore").className = "tabNotification button"
  }else{
  	document.getElementById("lore").className = "button"
  }
  //ach below
  if (user.notification.achLen != numOfAch()) document.getElementById("achievements").className = "tabNotification button"
  else document.getElementById("achievements").className = "button"
  */
}

function showTab(tabName) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName('tab');
  var tab;
  var highestLore = 0
  for (var i = 0; i < lore.length; i++) {
    if (unlockedLore(i)) highestLore = i
  }
  if (tabName == "lore") user.notification.loreLen = highestLore
  if (tabName == "achievements") user.notification.achLen = numOfAch()
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) tab.style.display = 'block';
    else tab.style.display = 'none';
  }
  resizeCanvas();
}

//saving and main loop stuff
//saving and main loop stuff
//saving and main loop stuff
//saving and main loop stuff
//saving and main loop stuff
//saving and main loop stuff
//saving and main loop stuff
//saving and main loop stuff
//saving and main loop stuff

function save() {
  localStorage.setItem("save test", JSON.stringify(user));
}

function load() {
  var save = JSON.parse(localStorage.getItem("save test"));
  if (localStorage.getItem("save test") !== null) {
    user = convertSave(save, getDefaultSave());
    updateSave()
  }
  document.getElementById("notation").innerHTML = "Notation: " + user.options.notation
  return user;
}

function convertSave(obj, obj2) {
  if (typeof obj === "object" && obj !== null && typeof obj2 === "object" && obj2 !== null) {
    for (var i in obj) {
      obj2[i] = convertSave(obj[i], obj2[i]);
    }
    return obj2;
  } else {
    return obj;
  }
}

function expo() {
  var exp = btoa(JSON.stringify(user));
  let output = document.getElementById('export thing');
  let parent = output.parentElement;

  parent.style.display = "";
  output.value = exp;

  output.onblur = function() {
    parent.style.display = "none";
  }
  output.focus();
  output.select();

  try {
    if (document.execCommand('copy')) {
      document.getElementById("export status").style.display = "";
      output.blur();
      document.getElementById("export").innerHTML = "Close";
      document.getElementById("export").onclick = function() {
        close();
      };
    }
  } catch (ex) {
    // aww
  }
}

function close() {
  document.getElementById("export status").style.display = "none";
  document.getElementById("export").innerHTML = "Export";
  document.getElementById("export").onclick = function() {
    expo();
  };
}

function impo() {
  var save = window.prompt("Paste your save here");
  if (save === "") {
    //:C
  } else {
    save = JSON.parse(atob(save));

    user = convertSave(save, getDefaultSave());
    updateSave()
  }
}

function gameLoop() {
  var newTime = new Date().getTime()
  var diff = (newTime - user.lastTick) / 1000
  if (test) diff *= diffMultiplier
  user.lastTick = newTime
  user.statistics.playtime += diff
  MKproduction(diff);
  updateMKUnlocks();
  fullPowerWellsUpdate();
  updatePulseCost();
  updateShowPoints();
  runMKAutobuyers();
  checkAchUnlocks();
  updateGEunlocks();
  updateGECosts();
  updateChallenges();
  update();

}

function switchNotation() {
  if (user.options.notation == "Scientific") user.options.notation = "Standard"
  else user.options.notation = "Scientific"
  document.getElementById("notation").innerHTML = "Notation: " + user.options.notation
}

function hardReset() {
  if (confirm("Are you sure you want to delete your save?")) {
    clear()
  }
}

function clear() {
  localStorage.removeItem("save test");
  user = getDefaultSave()
}


function startInterval() {
  load();
  setInterval(gameLoop, 33);
  setInterval(save, 5000);
  startHotkeys();
  window.addEventListener("resize", resizeCanvas);
}

//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS
//SAVE FIXING FUNCTIONS


function zeroAmountBugFix() {
  for (var i = 1; i <= 9; i++) {
    if (user["mk" + i].amount.lte(0) && user["mk" + i].base != 0) user["mk" + i].amount = new Decimal(user["mk" + i].base)
  }
}

function infinityAmountBugFix() {
  for (var i = 1; i <= 9; i++) {
    if (!user["mk" + i].amount) user["mk" + i].amount = new Decimal(user["mk" + i].base)
  }
}




