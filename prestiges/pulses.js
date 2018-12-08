//has autobuyers but NOT eaters

function getPulseReward(wells) {
  if (user.points.upgrades.includes("GP11") == false) {
    return 1 + Math.sqrt(wells / 2000)
  }
  return 1 + Math.pow(wells / 2000, .5) * Math.pow(wells, .1)
}


function updatePulseCost() {
  var mult = 2
  var con = -3
  var frozenAmt = 1 //the amount that eaters cant effect, may be change by upgrades later
  mult = frozenAmt + (mult - frozenAmt) / getEaterReward(1)
  if (user.points.upgrades.includes("GP21")) con += -3
  user.pulse.cost = Math.ceil(user.wells.defaultMults * mult + con)
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
      notification: user.notification,
      multiplierGen: user.multiplierGen,
      ripple: user.ripple
    }
    if (user.points.upgrades.includes("GP42")) user.wells.amount += 1
    if (user.ripple.upgrades.includes("R22")){
      user.wells.amount = 4
      user.wells.tiercost = 9
      user.wells.cost = 0
    }
    if (user.points.upgrades.includes("GP91")) {
      user.gravicles = user.gravicles.plus(1e5)
      user.mk1.amount = user.mk1.amount.plus(200)
    }
    if (user.wells.defaultMults >= 10) giveAch(23)
  }
}

function buyGPupg(ID) { //ID is a string
  var auto = false
  if (ID.length >= 4){
    if (ID.substring(0,3) == "GPA") {
     ID = ID.substring(2)
     auto = true
    }
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
  return false
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
      user.points.lastTimes[number-1] = time
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
      user.points.lastTimes[number-1] = time
    }
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

function sacMaxPulses() {
  sacPulses(Math.max(0, user.pulse.amount - 2))
}

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

function buyablePoints(amt = 1) {
  return user.pulse.amount - 2 >= amt && amt > 0
}

function buyablePulse() {
  return user.wells.amount >= user.pulse.cost
}

function buyableSpeedUpg(number) {
  //return true if the time isnt 100 and if we have enough pts
  return user.points.amount.gte(user.points.autobuyerUpgCosts[number - 1]) && user.points.autobuyerTimes[number - 1] != 100
}

function sacPulses(amt) {
  var unlocked = user.pulse.amount >= 6 || user.points.amount.gte(1) || user.points.upgrades.length != 0
  if (user.pulse.amount >= amt + 2 && amt > 0 && unlocked) {
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

