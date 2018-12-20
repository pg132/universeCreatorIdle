
function gravityWell(autobuyer) { //autobuyer helps us later to see if the user is doing it
  //first check is if we can afford it
  if (user["mk" + user.wells.tiercost].amount.gte(new Decimal(user.wells.cost - .00001))) { //otherwise kick us out of this function
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
    if (user.ripple.upgrades.includes("R22")) user.wells.cost = Math.max(0,user.wells.cost-20)
    //now do the boosts if so
    user.wells.amount += 1
    giveAch(15)
    if (user.wells.amount >= 5) giveAch(20)
    if (user.wells.amount >= user.pulse.cost) giveAch(22)
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
    notification: user.notification,
    multiplierGen: user.multiplierGen,
    ripple: user.ripple
  }
  if (user.points.upgrades.includes("GP91")) {
    user.gravicles = user.gravicles.plus(1e5)
    user.mk1.amount = user.mk1.amount.plus(200)
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
  if (user.ripple.challenges.current == "chall1") constant = 4
  user.wells.defaultMults = constant
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

function buyableWell() {
  if (new Decimal(getMkAmount(user.wells.tiercost)).gte(new Decimal(user.wells.cost - 0.0001))) {
    return true
  }
  return false
}





