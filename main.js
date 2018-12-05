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
      }
    },
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
    }
  };
}



var user = getDefaultSave();

function getPulseReward(wells) {
  if (user.points.upgrades.includes("GP11") == false) {
    return 1 + Math.sqrt(wells / 2000)
  }
  return 1 + Math.pow(wells / 2000, .5) * Math.pow(wells, .1)
}

function buyMK(tier, quick) {
  var tierCost = user["mk" + tier].previousTierCost
  var gravCost = user["mk" + tier].cost
  var costMult = user["mk" + tier].costMult
  var mainScale = 1 + .01 / getEaterReward(4)
  var buyingMult = 1.01
  if (hasAch(30) && user["mk" + tier].base < 10) buyingMult = 1.030301 //1.01**3
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
  if (!quick) update();
}

function gravityWell(autobuyer) { //autobuyer helps us later to see if the user is doing it
  //first check is if we can afford it
  if (user["mk" + user.wells.tiercost].amount.gte(new Decimal(user.wells.cost - .0001))) { //otherwise kick us out of this function
    var maxT = user.wells.tiercost
    var canGet30 = true
    for (var i = 1; i < maxT; i++) {
      if (user["mk" + i].base > 10) canGet30 = false
    }
    if (canGet30 && !(user["mk" + user.wells.tiercost].base > user.wells.cost)) giveAch(30)
    resetMK()
    if (!(user.wells.tiercost == 9)) {
      user.wells.tiercost += 1
    } else {
      user.wells.cost = 20 + (user.wells.amount - 3) * user.wells.costScale / getEaterReward(2) //might be changed later by an upgrade
    }
    //now do the boosts if so
    user.wells.amount += 1
    giveAch(15)
    if (user.wells.amount >= 5) giveAch(20)
    if (user.wells.amount >= user.pulse.cost) giveAch(22)
  }
}

function updatePulseCost() {
  var mult = 2
  var con = -3
  var frozenAmt = 1 //the amount that eaters cant effect, may be change by upgrades later
  mult = frozenAmt + (mult - frozenAmt) / getEaterReward(1)
  if (user.points.upgrades.includes("GP21")) con += -3
  user.pulse.cost = Math.ceil(user.wells.defaultMults * mult + con)
}

function buyGE(number, amt = 1) {
  if (number >= 5) {
    if (!user.eaters["GE" + number].unlocked) return
  }
  var k = user.eaters["GE" + number].cost.times(Decimal.pow(user.eaters["GE" + number].scale, amt - 1))
  if (user.gravicles.gte(k)) {
    user.gravicles = user.gravicles.minus(k)
    user.eaters["GE" + number].amount += amt
    updateGECosts()
  }

}

function updateGECosts() {
  for (n = 1; n < 7; n++) {
    user.eaters["GE" + n].cost = new Decimal(n < 5 ? "1e100" : "1e400").times(Decimal.pow(user.eaters["GE" + n].scale, user.eaters["GE" + n].amount))
  }
}

function updateGEunlocks() {
  user.eaters.GE5.unlocked = user.points.upgrades.includes("GP61")
  user.eaters.GE6.unlocked = user.points.upgrades.includes("GP61")
  if (user.points.upgrades.includes("GP61")) giveAch(29)
}

function buyMaxGE(number) {
  while (user.eaters["GE" + number].cost.lt(user.gravicles)) {
    buyGE(number)
  }
}

function buyMaxAllGE() { // Seems OP, but if we wanna have a hotkey for buying eaters this is the best thing i can come up with
  for (i = 1; i < 7; i++) {
    if (i < 5 || user.eaters["GE" + i].unlocked) buyMaxGE(i)
  }
}

function gravityPulse(autobuyer) {
  //first check if we afford
  if (user.wells.amount >= user.pulse.cost) {
    user.pulse.amount += 1 //give another pulse
    updatePulseCost()
    giveAch(21)
    if (user.wells.amount - 10 >= user.pulse.cost) giveAch(32)
    //clear mk and then give boosts
    user.pulse.multipliers.push(getPulseReward(user.wells.amount)) //add the thing to the end
    user = { //update user
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
        cost: 20,
        tiercost: 5,
        defaultMults: 4,
        amount: 0,
        costScale: 20
      },
      pulse: user.pulse,
      points: user.points,
      statistics: user.statistics,
      eaters: user.eaters,
      options: user.options,
      achievements: user.achievements,
      version: user.version,
      lastTick: user.lastTick,
      notification: user.notification
    }
    if (user.points.upgrades.includes("GP42")) user.wells.amount += 1
    if (user.points.upgrades.includes("GP91")) {
      user.gravicles = user.gravicles.plus(1e5)
      user.mk1.amount = user.mk1.amount.plus(200)
    }
    if (user.wells.defaultMults >= 10) giveAch(23)
  }
}




function resetMK() {
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
    wells: user.wells,
    pulse: user.pulse,
    points: user.points,
    eaters: user.eaters,
    statistics: user.statistics,
    options: user.options,
    achievements: user.achievements,
    version: user.version,
    lastTick: user.lastTick,
    notification: user.notification
  }
  if (user.points.upgrades.includes("GP91")) {
    user.gravicles = user.gravicles.plus(1e5)
    user.mk1.amount = user.mk1.amount.plus(200)
  }
}

function solveQuad(a, b, c) {
  var descrim = Math.sqrt(b * b - 4 * a * c)
  return [(-b + descrim) / 2 / a, (-b - descrim) / 2 / a]
}


function getEaterReward(number) {
  var k = user.eaters["GE" + number].amount
  if (hasAch(36)) k *= 1.02
  if (hasAch(37) && (number == 5 || number == 6)) k *= 1.05
  var amt = 0.01
  if (user.points.upgrades.includes("GP72")) amt = amt * 1.1
  if (number == 6 && k < 400) return Math.floor(amt * 100 * k)
  if (number == 6) return Math.floor(amt * 100 * ((k * 400) ** .5))
  if (k > 40) k = Math.pow(k * 40, .5)
  if (k > 80) k = Math.pow(k * 80, .5)
  if (k > 120) k = Math.pow(k * 120, .5)
  if (k > 160) k = Math.pow(k * 160, .5)
  if (k > 200) k = Math.pow(k * 200, .5)
  var comp = false
  if (user.points.upgrades.includes("GP81")) comp = true
  if (comp) return Decimal.pow(1 + amt, k)
  return 1 + amt * k
}

function buyGPupg(ID) { //ID is a string
  var auto = false
  if (ID.substring(0,3) == "GPA") {
    ID = ID.substring(2)
    auto = true
  }
  var k = "GP" + ID
  if (!user.points.upgrades.includes(k) && user.points.possibleUpgrade.includes(k)) {
    var w = user.points.possibleUpgrade.indexOf(k)

    if (w == -1) return
    var cost = user.points.upgradesCost[w]
    if (user.points.amount.gte(cost) && isGPupgradePossible(k)) { //buy upgrade then
      user.points.upgrades.push(k)
      user.points.amount = user.points.amount.minus(cost)
      if (auto) user.points.autobuyers.push("GP"+ID)
    }
  }
  resizeCanvas();
}

function updateHasAutobuyers(){
  for (var i =0; i<user.points.upgrades.length;i++){
    if (user.points.upgrades[i].substring(2,3) == "A")
      //add it
      if (!(user.points.autobuyers.includes(user.points.upgrades[i]))) user.points.autobuyers.push(user.points.upgrades[i])
  }
}

function isGPupgradePossible(id) {
  if (user.points.possibleUpgrade.includes(id)) {
    var w = user.points.possibleUpgrade.indexOf(id)
    var req = user.points.requirements[w]
    var reqs = req.split(",")
    if (req === "") return true
    for (var i = 0; i < reqs.length; i++) {
      if (!(user.points.upgrades.includes(reqs[i]))) return false
    }
    return true
  }
}

function gravityWellBoost(tier) {
  var w = user.wells.amount
  var d = user.wells.defaultMults
  var base = 2
  if (user.points.upgrades.includes("GP51")) base = 2.5
  base = base * getEaterReward(3)
  var q = new Decimal(1)
  if (user.points.upgrades.includes("GP71")) q = Decimal.pow(2, Math.floor(w - tier / 5)).max(1)
  if (w <= d - 1 + tier) return Decimal.max(1, base ** (w - tier + 1)).times(q) //fifth is worse
  return Decimal.pow(base, (d - 1)).times(w - d - tier + 3).times(q) //just try it, it should work
}

function fullPowerWellsUpdate() {
  var constant = 4
  var multiplier = 1
  if (user.points.upgrades.includes("GP31")) multiplier = 1.5
  for (var i = 0; i < user.pulse.amount; i++) {
    constant = Math.ceil(constant * (1 + (multiplier * (user.pulse.multipliers[i] - 1))))
  }
  user.wells.defaultMults = constant

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
  if (!quick) update();
}

function maxAll() {
  for (var i = 9; i > 0; i--) {
    buyMaxMK(i, true);
  }
}

function buyAutobuyerSpeed(number) {
  if (user.points.amount.gte(user.points.autobuyerUpgCosts[number - 1]) && user.points.autobuyerTimes[number - 1] != 100) {
    user.points.amount = user.points.amount.minus(user.points.autobuyerUpgCosts[number - 1])
    user.points.autobuyerUpgCosts[number - 1] = Math.ceil(1.1*user.points.autobuyerUpgCosts[number - 1])
    user.points.autobuyerTimes[number-1] = Math.ceil(0.9*user.points.autobuyerTimes[number-1])
    if (user.points.autobuyerTimes[number - 1] < 100) user.points.autobuyerTimes[number - 1] = 100
  }
}



function runMKAutobuyers() {
  var k = user.points.autobuyers
  for (var i = 0; i < k.length; i++) {
    giveAch(27)
    var p = k[i]
    var number = parseInt(p.substring(3)) //get its number
    var lastTime = user.points.lastTimes[number-1] // the last time it did it
    var time = new Date().getTime() // current time
    var interval = user.points.autobuyerTimes[number-1]
    if (interval + lastTime <= time && number <= 9) { //first part is the cooldown check
      buyMK(number, true)
      user.points.lastTimes[number] = time
      //update the last time we bought,
      //this doesnt act like AD buyers where the cooldown doesnt reset unless it buys
    }
    if (interval + lastTime <= time && !(number <= 9)) {
      if (number == 10) { //well
        gravityWell(true)
      }
      if (number == 11) { //pulse
        gravityPulse(true)
      }
      user.points.lastTimes[number] = time
    }
  }
}

function sacPulses(amt) {
  if (user.pulse.amount >= amt + 2 && amt > 0) {
    user.statistics.sacrificed++
    user.points.amount = user.points.amount.plus(getGPgain(amt)).round()
    if (user.wells.amount >= user.pulse.cost) {
      giveAch(34)
      user.points.amount = user.points.amount.plus(1)
    }
    user.pulse.amount -= amt
    //remove the last amt elems from user.pulse.multipliers this is done by the .pop()
    for (var i = 0; i < amt; i++) {
      user.pulse.multipliers.pop()
    }
    giveAch(24)
    if (user.pulse.amount == 2) giveAch(33)
    fullPowerWellsUpdate()
    updatePulseCost()
  }
}

function sacMaxPulses() {
  sacPulses(Math.max(0, user.pulse.amount - 2))
}

function updateMKUnlocks() {
  var w = user.wells.amount
  user.mk6.unlocked = false
  user.mk7.unlocked = false
  user.mk8.unlocked = false
  user.mk9.unlocked = false
  if (w >= 1) user.mk6.unlocked = true
  if (w >= 2) user.mk7.unlocked = true
  if (w >= 3) user.mk8.unlocked = true
  if (w >= 4) user.mk9.unlocked = true
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

function updateShowPoints() {
  showPoints = showPoints || user.pulse.amount >= 6 || user.points.amount.gte(1) || !(user.points.upgrades.length == 0)
}

function showGravPoints() {
  document.getElementById("points display").style.display = "none";
  if (showPoints) document.getElementById("points display").style.display = "";
}

function getGPgain(sac) {
  if (user.points.upgrades.includes("GP52")) return sac * 2
  return sac
}


function showMK() {
  for (var i = 2; i <= 9; i++) {
    if (i < 6) {
      if (user["mk" + (i - 1)].amount.gt(0)) {
        document.getElementById("row" + i).style.display = "table-row";
      } else {
        document.getElementById("row" + i).style.display = "none";
      }
    } else {
      if (user["mk" + (i - 1)].amount.gt(0) && user["mk" + i].unlocked) {
        document.getElementById("row" + i).style.display = "table-row";
      } else {
        document.getElementById("row" + i).style.display = "none";
      }
    }
  }
}

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
  //put additional mults here
  if (user.points.upgrades.includes("GP92")) {
    if (user["mk" + tier].amount == 0) return new Decimal(0)
    return amt.plus(10).times(mult)
  }
  if (hasAch(39) && mult.gte(1e100)) mult = mult.times(1e10)
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
  //put additional mults here
  if (hasAch(39) && mult.gte(1e100)) mult = mult.times(1e10)
  return mult
}

function MKproduction(diff) {
  var addGrav = baseMKproduction(1).times(diff)
  user.gravicles = user.gravicles.plus(addGrav)
  user.statistics.totalGravicles = user.statistics.totalGravicles.plus(addGrav)
  for (var i = 2; i <= 9; i++) user["mk" + (i - 1)].amount = user["mk" + (i - 1)].amount.plus(baseMKproduction(i).times(diff))
  update();
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


function buyablePoints(amt = 1) {
  return user.pulse.amount - 2 >= amt && amt > 0
}

function buyable(tier) {
  var gravCost = user["mk" + tier].cost
  if (gravCost.gt(user.gravicles)) return false
  var tierCost = user["mk" + tier].previousTierCost
  var unlocked = true
  if (tier > 5) unlocked = user["mk" + tier].unlocked
  if (tier < 2) return true
  return gravCost.lte(user.gravicles) && new Decimal(getMkAmount(tier - 1)).gte(tierCost) && unlocked
}

function buyableWell() {
  if (new Decimal(getMkAmount(user.wells.tiercost)).gte(new Decimal(user.wells.cost - 0.0001))) {
    return true
  }
  return false
}

function buyablePulse() {
  if (user.wells.amount >= user.pulse.cost) {
    return true
  }
  return false
}

function buyableGE(number) {
  if (number >= 5) return user.eaters["GE" + number].cost.lte(user.gravicles) && user.eaters["GE" + number].unlocked
  return user.eaters["GE" + number].cost.lte(user.gravicles)
}

function buyableSpeedUpg(number) {
  //return true if the time isnt 100 and if we have enough pts
  return user.points.amount.gte(user.points.autobuyerUpgCosts[number - 1]) && user.points.autobuyerTimes[number - 1] != 100
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
