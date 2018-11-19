var qwertyuiopycasduvdauasyvdu = "zgpqw"
function getDefaultSave() {
	return {
		gravicles: new Decimal(10),
		mk1:{
			cost:new Decimal(10),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:0,
			costMult:1.15
		},
		mk2:{
			cost:new Decimal(100),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:10,
			costMult:1.165
		},
		mk3:{
			cost:new Decimal(1000),
			amount:new Decimal(0),
			multiplier:new Decimal(1),	
			base:0,
			previousTierCost:10,
			costMult:1.18
		},
		mk4:{
			cost:new Decimal(1e4),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:10,
			costMult:1.2
		},
		mk5:{
			cost:new Decimal(1e6),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:10,
			costMult:1.22
		},
		mk6:{
			cost:new Decimal(1e9),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.24
		},
		mk7:{
			cost:new Decimal(1e13),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.265
		},
		mk8:{
			cost:new Decimal(1e18),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.28
		},
		mk9:{
			cost:new Decimal(1e25),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.3
		},
		wells:{
			basecost:20,
			cost:20,
			tiercost:5,
			defaultMults:4,
			amount:0,
			costScale:20
		},
		pulse:{
			cost:5,
			amount:0,
			multipliers:[]
		},
		statistics: {
			playtime: 0,
			totalGravicles: new Decimal(0)
		},
		options: {
			notation: "Scientific"
		},
		version: 0.02,
		lastTick: new Date().getTime()
	};
}



var user = getDefaultSave();

function getPulseReward(wells){
	return 1+Math.pow(wells/2000,.5)*Math.pow(wells,.1)
}

function buyMK(tier, quick) {
	var tierCost = user["mk"+tier].previousTierCost
	var gravCost = user["mk"+tier].cost
	var costMult = user["mk"+tier].costMult
	var mainScale = 1.01
	var buyingMult = 1.01
	var w = 1.1
	if (tier == 1){
		if (gravCost.lte(user.gravicles)){
			user.gravicles = user.gravicles.minus(gravCost)
			user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
			//what should the multiplier formula be? rn im gonna make it 1% stronger
			user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(buyingMult)
			user.mk1.amount = user.mk1.amount.plus(1)
			user.mk1.base += 1
			if(user.mk1.base > 30 && user.mk1.base % 10 === 0) {
				user.mk1.costMult *= mainScale;
				if (user.mk1.base%50 === 0 && user.mk1.base >= 300) user.mk1.costMult *= w
				if (user.mk1.base%100 == 0 && user.mk1.base > 400) user.mk1.costMult *= 1.25+1.75
			}
		}
	} else if (gravCost.lte(user.gravicles) && user["mk"+(tier-1)].amount.gte(tierCost)&&tier<=5&&tier>=2){
		user.gravicles = user.gravicles.minus(gravCost)
		user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
		//what should the multiplier formula be? rn im gonna make it 1% stronger
		user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(buyingMult)
		user["mk"+(tier-1)].amount = user["mk"+(tier-1)].amount.minus(tierCost)
		user["mk"+tier].amount = user["mk"+tier].amount.plus(1)
		user["mk"+tier].base += 1
		if(user["mk"+tier].base > 30 && user["mk"+tier].base % 10 === 0) {
			user["mk"+tier].costMult *= mainScale;
			if (user["mk"+tier].base %50 === 0 && user["mk"+tier].base >= 300) user["mk"+tier].costMult *= w
			if (user["mk"+tier].base %100 == 0 && user["mk"+tier].base > 400) user["mk"+tier].costMult *= 1.25+1.75
		}
	} else if (gravCost.lte(user.gravicles) && user["mk"+(tier-1)].amount.gte(tierCost)&&tier>=6){
		if (user["mk"+tier].unlocked == true){
			user.gravicles = user.gravicles.minus(gravCost)
			user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
			//what should the multiplier formula be? rn im gonna make it 1% stronger
			user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(buyingMult)
			user["mk"+(tier-1)].amount = user["mk"+(tier-1)].amount.minus(tierCost)
			user["mk"+tier].amount = user["mk"+tier].amount.plus(1)
			user["mk"+tier].base += 1
			if(user["mk"+tier].base > 30 && user["mk"+tier].base % 10 === 0) {
				user["mk"+tier].costMult *= mainScale;
				if (user["mk"+tier].base %50 === 0 && user["mk"+tier].base >= 300) user["mk"+tier].costMult *= w
				if (user["mk"+tier].base %100 == 0 && user["mk"+tier].base > 400) user["mk"+tier].costMult *= 1.25+1.75
			}
		}
	}
	//abv is init mult scale after e308
	if (!quick) update();
}

function gravityWell(autobuyer){//autobuyer helps us later to see if the user is doing it
	//first check is if we can afford it
	if (user["mk"+user.wells.tiercost].amount.gte(new Decimal(user.wells.cost-.0001))){
		resetMK() //we need this function DONE
		if (!(user.wells.tiercost == 9)){
			user.wells.tiercost += 1
		} else{
			user.wells.cost = 20+(user.wells.amount-3)*user.wells.costScale
		}
		//now do the boosts if so
		user.wells.amount += 1
	}
}

function updatePulseCost(){
	var mult = 2
	var con = -3
	var frozenAmt = 1//the amount that eaters cant effect, may be change by upgrades later
	mult = frozenAmt+(mult-frozenAmt)
	user.pulse.cost = Math.ceil(user.wells.defaultMults*mult+con)
}

function gravityPulse(autobuyer){
	//first check if we afford
	if (user.wells.amount >= user.pulse.cost){
		//clear mk and then give boosts
		user.pulse.multipliers.push(getPulseReward(user.wells.amount))//add the thing to the end
		user = {//update user
			gravicles: new Decimal(10),
			mk1:{
				cost:new Decimal(10),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				previousTierCost:0,
				costMult:1.15
			},
			mk2:{
				cost:new Decimal(100),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				previousTierCost:10,
				costMult:1.165
			},
			mk3:{
				cost:new Decimal(1000),
				amount:new Decimal(0),
				multiplier:new Decimal(1),	
				base:0,
				previousTierCost:10,
				costMult:1.18
			},
			mk4:{
				cost:new Decimal(1e4),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				previousTierCost:10,
				costMult:1.2
			},
			mk5:{
				cost:new Decimal(1e6),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				previousTierCost:10,
				costMult:1.22
			},
			mk6:{
				cost:new Decimal(1e9),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				unlocked:false,
				previousTierCost:10,
				costMult:1.24
			},
			mk7:{
				cost:new Decimal(1e13),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				unlocked:false,
				previousTierCost:10,
				costMult:1.265
			},
			mk8:{
				cost:new Decimal(1e18),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				unlocked:false,
				previousTierCost:10,
				costMult:1.28
			},
			mk9:{
				cost:new Decimal(1e25),
				amount:new Decimal(0),
				multiplier:new Decimal(1),
				base:0,
				unlocked:false,
				previousTierCost:10,
				costMult:1.3
			},
			wells: {
				cost:20,
				tiercost:5,
				defaultMults:4,
				amount:0,
				costScale:20
			},
			pulse:user.pulse,
			statistics:user.statistics,
			options:user.options,
			version:user.version,
			lastTick:user.lastTick
		}
		user.pulse.amount += 1 //give another pulse
		updatePulseCost()
	}
}


 

function resetMK(){
	user = {
		gravicles: new Decimal(10),
		mk1:{
			cost:new Decimal(10),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:0,
			costMult:1.15
		},
		mk2:{
			cost:new Decimal(100),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:10,
			costMult:1.165
		},
		mk3:{
			cost:new Decimal(1000),
			amount:new Decimal(0),
			multiplier:new Decimal(1),	
			base:0,
			previousTierCost:10,
			costMult:1.18
		},
		mk4:{
			cost:new Decimal(1e4),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:10,
			costMult:1.2
		},
		mk5:{
			cost:new Decimal(1e6),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			previousTierCost:10,
			costMult:1.22
		},
		mk6:{
			cost:new Decimal(1e9),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.24
		},
		mk7:{
			cost:new Decimal(1e13),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.265
		},
		mk8:{
			cost:new Decimal(1e18),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.28
		},
		mk9:{
			cost:new Decimal(1e25),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.3
		},
		wells:user.wells,
		pulse:user.pulse,
		statistics:user.statistics,
		options:user.options,
		version:user.version,
		lastTick:user.lastTick
	}
}

function gravityWellBoost(tier){
       	var w = user.wells.amount
	var d = user.wells.defaultMults
	var base = 2
	base = base
	if (w<=d-1+tier) return Decimal.max(1,base**(w-tier+1))//fifth is worse
	return Decimal.pow(base,(d-1)).times(w-d-tier+3)//just try it, it should work
}

function fullPowerWellsUpdate(){
	var constant = 4
	for (var i = 0; i< user.pulse.amount; i++){
		constant = Math.ceil(constant*(1+(user.pulse.multipliers[i]-1)))
	}
	user.wells.defaultMults = constant
}


function buyMaxMK(tier, quick){
	var tierCost = user["mk"+tier].previousTierCost
	var gravCost = user["mk"+tier].cost
	var costMult = user["mk"+tier].costMult
	var grav = user.gravicles
	if (tier == 1){
		while(grav.gte(gravCost)) {
			buyMK(tier, true);
			tierCost = user["mk"+tier].previousTierCost
			gravCost = user["mk"+tier].cost
			grav = user.gravicles
		}
	} else if (tier <= 5){//closes tier==1 and opens tier<=5&&tier>1
		while(grav.gte(gravCost)&&user["mk"+(tier-1)].amount.gte(tierCost)) {
			buyMK(tier, true);
			tierCost = user["mk"+tier].previousTierCost
			gravCost = user["mk"+tier].cost
			grav = user.gravicles
		}
	} else {//tier is abv 5
		if (user["mk"+tier].unlocked){
			while(grav.gte(gravCost)&&user["mk"+(tier-1)].amount.gte(tierCost)) {
				buyMK(tier, true);
				tierCost = user["mk"+tier].previousTierCost
				gravCost = user["mk"+tier].cost
				grav = user.gravicles
			}
		}//closes unlocked if
	}//closes else refering to tier >= 5
	if (!quick) update();
}

function maxAll(){
	for(var i = 9; i > 0; i--) {
		buyMaxMK(i, true);
	}
}

function updateMKUnlocks(){
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

function showMK(){
	for(var i = 2; i <= 9; i++) {
		if (i<6){
			if(user["mk"+(i-1)].amount.gt(0)) {
				document.getElementById("row"+i).style.display = "table-row";
			} else {
				document.getElementById("row"+i).style.display = "none";
			}
		} else{
			if(user["mk"+(i-1)].amount.gt(0) && user["mk"+i].unlocked) {
				document.getElementById("row"+i).style.display = "table-row";
			} else {
				document.getElementById("row"+i).style.display = "none";
			}
		}
	}
}

function getMkAmount(tier) {
	if (tier > 8) return user.mk9.amount.round()
	if (user["mk"+(tier+1)].amount.eq(0)) return user["mk"+tier].amount.round()
	return user["mk"+tier].amount
}

function baseMKproduction(tier){
	var amt = user["mk"+tier].amount
	var mult = user["mk"+tier].multiplier
	mult = mult.times(gravityWellBoost(tier))
	mult = mult.times(Decimal.pow(1+1.5/tier,user.wells.defaultMults-4))
	//put additional mults here
	return amt.times(mult)
}

function baseMKmult(tier){
	var mult = user["mk"+tier].multiplier
	mult = mult.times(gravityWellBoost(tier))
	mult = mult.times(Decimal.pow(1+1.5/tier,user.wells.defaultMults-4))
	//put additional mults here
	return mult
}

function MKproduction(diff){
	var addGrav = baseMKproduction(1).times(diff)
	user.gravicles = user.gravicles.plus(addGrav)
	user.statistics.totalGravicles = user.statistics.totalGravicles.plus(addGrav)
	for (var i = 2; i <=9; i++) user["mk"+(i-1)].amount = user["mk"+(i-1)].amount.plus(baseMKproduction(i).times(diff))
	update();
}

function buyablePoints(amt=1){
	return user.pulse.amount-2>=amt && amt > 0	
}

function buyable(tier) {
	var gravCost = user["mk"+tier].cost
	if (gravCost.gt(user.gravicles)) return false
	var tierCost = user["mk"+tier].previousTierCost
	var unlocked = true
	if (tier > 5) unlocked = user["mk"+tier].unlocked
	if (tier < 2) return true
	return gravCost.lte(user.gravicles) && getMkAmount(tier-1).gte(tierCost) && unlocked
}

function buyableWell() {
	if (getMkAmount(user.wells.tiercost).gte(new Decimal(user.wells.cost-0.0001))){
		return true
	}
	return false
}
function buyablePulse() {
	if (user.wells.amount >= user.pulse.cost){
		return true
	}
	return false
}

function update(){
	document.getElementById("gravicle amount").innerHTML = shorten(user.gravicles);
	if (document.getElementById('generators').style.display != "none") {
		for(var i = 1; i <=9; i++) {
			var str = "mk"+i+"Amount";
			document.getElementById(str).innerHTML = shorten(user["mk"+i].amount);
			if(i === 1) {
				document.getElementById("buy"+i).innerHTML = "Cost: "+shorten(user["mk"+i].cost);
			} else {
				document.getElementById("buy"+i).innerHTML = "Cost: "+shorten(user["mk"+i].cost)+" & "+user["mk"+i].previousTierCost+" mk"+(i-1)+"s";
			}
			document.getElementById("mult"+i).innerHTML = "x"+shortenMult(baseMKmult(i));
			if(buyable(i)) {
				document.getElementById("buy"+i).className = "button";
				document.getElementById("buy"+i+"Max").className = "button";
			} else {
				document.getElementById("buy"+i).className = "buttonlocked";
				document.getElementById("buy"+i+"Max").className = "buttonlocked";
			}
		}
		showMK();
		document.getElementById("well").innerHTML = "Reset the game for a boost<br/>Cost: "+Math.ceil(user.wells.cost)+" mk"+Math.ceil(user.wells.tiercost)+"s";
		document.getElementById("pulse").innerHTML = "Lose all of your previous progress, but get an improvement to wells<br/>Requires: "+user.pulse.cost+" wells";
		if(buyableWell()) {
			document.getElementById("well").className = "button";
		} else {
			document.getElementById("well").className = "buttonlocked";
		}
		if(buyablePulse()) {
			document.getElementById("pulse").className = "button";
		} else {
			document.getElementById("pulse").className = "buttonlocked";
		}
		document.getElementById("well number").innerHTML = "Gravity Wells: "+user.wells.amount;
		document.getElementById("pulse number").innerHTML = "Gravitational Pulses: "+user.pulse.amount+" ("+user.wells.defaultMults+" wells at full power)";
	}
	if (document.getElementById('statistics').style.display != "none") {
		document.getElementById("playtime").innerHTML = "You have played this game for " + timeDisplay(user.statistics.playtime) + "."
		document.getElementById("total gravicles").innerHTML = "You made " + shorten(user.statistics.totalGravicles) + " gravicles in total."
		var showMoreStats = showMoreStats || user.pulse.amount > 0
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
}

function showTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('tab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) tab.style.display = 'block';
		else tab.style.display = 'none';
	}
	resizeCanvas();
}

function save(){
	localStorage.setItem("save",JSON.stringify(user));
}
function load(){
	var save = JSON.parse(localStorage.getItem("save"));
	if(localStorage.getItem("save") !== null) {
		user = convertSave(save,getDefaultSave());
		updateSave()
	}
	document.getElementById("notation").innerHTML = "Notation: " + user.options.notation
	return user;
}
function convertSave(obj,obj2) {
	if(typeof obj === "object" && obj !== null && typeof obj2 === "object" && obj2 !== null) {
		for(var i in obj) {
			obj2[i] = convertSave(obj[i],obj2[i]);
		}
		return obj2;
	} else {
		return obj;
	}
}
function expo(){
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
			document.getElementById("export").onclick = function() { close(); };
		}
	} catch(ex) {
		// aww
	}
}
function close(){
		document.getElementById("export status").style.display = "none";
	document.getElementById("export").innerHTML = "Export";
	document.getElementById("export").onclick = function() { expo(); };
}
function impo(){
	var save = window.prompt("Paste your save here");
	if(save === "") {
		//:C
	} else {
		save = JSON.parse(atob(save));
		
		user = convertSave(save,getDefaultSave());
		updateSave()
	}
}
function gameLoop(){
	var newTime = new Date().getTime()
	var diff = (newTime - user.lastTick) / 1000
	user.lastTick = newTime
	user.statistics.playtime += diff
	MKproduction(diff);
	updateMKUnlocks();
	fullPowerWellsUpdate();
	updatePulseCost();
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
function clear(){
	localStorage.removeItem("save");
	user = getDefaultSave()
}


function startInterval(){
	load();
	setInterval(gameLoop,33);
	setInterval(save,5000);
}
