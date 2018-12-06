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

function getEaterReward(number) {
  var k = user.eaters["GE" + number].amount
  if (hasAch(36)) k *= 1.02
  if (hasAch(37) && (number == 5 || number == 6)) k *= 1.05
  var amt = 0.01
  if (user.points.upgrades.includes("GP72")) amt = amt * 1.1
  if (number == 6 && k < 400) return Math.floor(amt * 100 * k)
  if (number == 6) return Math.floor(amt * 100 * ((k * 400) ** .5))
  if (user.ripple.upgrades.includes("R21")){
    if (k > 40) k = Math.pow(k * 40**.5, 2/3)
  }
  else {
    if (k > 40) k = Math.pow(k * 40, .5)
  }
  if (k > 80) k = Math.pow(k * 80, .5)
  if (k > 120) k = Math.pow(k * 120, .5)
  if (k > 160) k = Math.pow(k * 160, .5)
  if (k > 200) k = Math.pow(k * 200, .5)
  var comp = false
  if (user.points.upgrades.includes("GP81")) comp = true
  if (comp) return Decimal.pow(1 + amt, k)
  return 1 + amt * k
}

function buyableGE(number) {
  if (number >= 5) return user.eaters["GE" + number].cost.lte(user.gravicles) && user.eaters["GE" + number].unlocked
  return user.eaters["GE" + number].cost.lte(user.gravicles)
}
