var version = 0.0;
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
			cost:new Decimal(1e19),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.28
		},
		mk9:{
			cost:new Decimal(1e28),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.3
		},
		wells:{
			cost:20,
			tiercost:5,
			defaultMults:4,
			totalMult:1,
			amount:0,
			costScale:20
		},
		pulse:{
			cost:5,
			amount:0,
			multipliers:[]
		},
		points:{
			amount:new Decimal(0),
			upgradesCost:[1,2,5,50,60,70,80,90,100,110,120,130,10,15,30,75],//next line GP starts for gravity points and GPA stands for gravity points autobuyer
			possibleUpgrade:["GP11","GP21","GP31","GPA1","GPA2","GPA3","GPA4","GPA5","GPA6","GPA7","GPA8","GPA9","GP41","GP42","GP51","GP61"],
			upgrades:[],

		}


	};
}



var user = getDefaultSave();

function getPulseReward(wells){
	if (user.points.upgrades.includes("GP11") == false){
		return 1+Math.sqrt(wells/2000)
	}
	return 1+Math.pow(wells/2000,.5)*Math.pow(wells,.1)
}

function buyMK(tier) {
	var tierCost = user["mk"+tier].previousTierCost
	var gravCost = user["mk"+tier].cost
	var costMult = user["mk"+tier].costMult
	if (tier == 1){
		if (gravCost.lte(user.gravicles)){
			user.gravicles = user.gravicles.minus(gravCost)
			user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
			//what should the multiplier formula be? rn im gonna make it 1% stronger
			user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(1.01)
			user.mk1.amount = user.mk1.amount.plus(1)
			user.mk1.base += 1
			if(user.mk1.base > 30 && user.mk1.base % 10 === 0) {
				user.mk1.costMult *= 1.01;
				if (user.mk1.base%50 === 0) user.mk1.costMult *= 1.02
			}
		}
	} else if (gravCost.lte(user.gravicles) && user["mk"+(tier-1)].amount.gte(tierCost)&&tier<=5&&tier>=2){
		user.gravicles = user.gravicles.minus(gravCost)
		user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
		//what should the multiplier formula be? rn im gonna make it 1% stronger
		user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(1.01)
		user["mk"+(tier-1)].amount = user["mk"+(tier-1)].amount.minus(tierCost)
		user["mk"+tier].amount = user["mk"+tier].amount.plus(1)
		user["mk"+tier].base += 1
		if(user["mk"+tier].base > 30 && user["mk"+tier].base % 10 === 0) {
			user["mk"+tier].costMult *= 1.01;
			if (user["mk"+tier].base %50 === 0) user["mk"+tier].costMult *= 1.02
		}
	} else if (gravCost.lte(user.gravicles) && user["mk"+(tier-1)].amount.gte(tierCost)&&tier>=6){
		if (user["mk"+tier].unlocked == true){
			user.gravicles = user.gravicles.minus(gravCost)
			user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
			//what should the multiplier formula be? rn im gonna make it 1% stronger
			user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(1.01)
			user["mk"+(tier-1)].amount = user["mk"+(tier-1)].amount.minus(tierCost)
			user["mk"+tier].amount = user["mk"+tier].amount.plus(1)
			user["mk"+tier].base += 1
			if(user["mk"+tier].base > 30 && user["mk"+tier].base % 10 === 0) {
				user["mk"+tier].costMult *= 1.01;
				if (user["mk"+tier].base%50 === 0) user["mk"+tier].costMult *= 1.02
			}
		}
	}
	update();
}

function gravityWell(autobuyer){//autobuyer helps us later to see if the player is doing it
	//first check is if we can afford it
	if (user["mk"+user.wells.tiercost].amount.gte(user.wells.cost)){//otherwise kick us out of this function
		resetMK() //we need this function DONE
		if (!(user.wells.tiercost == 9)){
			user.wells.tiercost += 1
		} else{
			user.wells.cost += user.wells.costScale//might be changed later by an upgrade
		}
		//now do the boosts if so
		user.wells.amount += 1
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
			cost:new Decimal(1e19),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.28
		},
		mk9:{
			cost:new Decimal(1e28),
			amount:new Decimal(0),
			multiplier:new Decimal(1),
			base:0,
			unlocked:false,
			previousTierCost:10,
			costMult:1.3
		},
		wells:user.wells,
		pulse:user.pulse,
		points:user.points
	}
}





function gravityWellBoost(tier){
       	var w = user.wells.amount
	var d = user.wells.defaultMults
	var base = 2
	if (user.points.upgrades.includes("GP42")) base = 2.1
	var q = new Decimal(1)
	if (user.points.upgrades.includes("GP61"))  q = Decimal.pow(1.5,Math.floor(w/5))
	if (w<=d-1+tier) return Decimal.max(1,base**(w-tier+1)).times(q)//fifth is worse
	return Decimal.pow(base,(d-1)).times(w-d-tier+3).times(q)//just try it, it should work
}

function fullPowerWellsUpdate(){
	var constant = 5
	var multiplier = 1
	if (user.points.upgrades.includes("GP31")) multiplier = 1.5
	for (var i = 0; i< user.pulse.amount; i++){
		constant = Math.ceil(constant*(1+(multiplier*(user.pulse.multipliers[i]-1))))
	}
	user.wells.defaultMults = constant
}


function buyMaxMK(tier){
	var tierCost = user["mk"+tier].previousTierCost
	var gravCost = user["mk"+tier].cost
	var costMult = user["mk"+tier].costMult
	var grav = user.gravicles
	if (tier == 1){
		while(grav.gte(gravCost)) {
			buyMK(tier);
			tierCost = user["mk"+tier].previousTierCost
			gravCost = user["mk"+tier].cost
			grav = user.gravicles
		}
	} else if (tier <= 5){//closes tier==1 and opens tier<=5&&tier>1
		while(grav.gte(gravCost)&&user["mk"+(tier-1)].amount.gte(tierCost)) {
			buyMK(tier);
			tierCost = user["mk"+tier].previousTierCost
			gravCost = user["mk"+tier].cost
			grav = user.gravicles
		}
	} else {//tier is abv 5
		if (user["mk"+tier].unlocked){
			while(grav.gte(gravCost)&&user["mk"+(tier-1)].amount.gte(tierCost)) {
				buyMK(tier);
				tierCost = user["mk"+tier].previousTierCost
				gravCost = user["mk"+tier].cost
				grav = user.gravicles
			}
		}//closes unlocked if
	}//closes else refering to tier >= 5
	update();
}


function sacPulses(amt){
	if (user.pulse.amount>= amt){
		user.points.amount = user.points.amount.plus(amt)
		user.pulse.amount = user.pulse.amount.minus(amt)
	}
}
function sacMaxPulses(){
	sacPulses(user.pulse.amount)
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
function baseMKproduction(tier){
	var amt = user["mk"+tier].amount
	var mult = user["mk"+tier].multiplier
	mult = mult.times(gravityWellBoost(tier))
	if (tier == 9 && (user.points.upgrades.includes("GP41"))) mult = mult.times(2)
	//put additional mults here
	return amt.times(mult).times(.033)//the times(.033) is for time since we update 30 times per second
}

function baseMKmult(tier){
	var mult = user["mk"+tier].multiplier
	mult = mult.times(gravityWellBoost(tier))
	if (tier == 9 && (user.points.upgrades.includes("GP41"))) mult = mult.times(2)
	//put additional mults here
	return mult
	
	
}

function MKproduction(){
	for(var i = 1; i <=9; i++) {
		if(i === 1) {
			user.gravicles = user.gravicles.plus(baseMKproduction(i));
		} else {
			user["mk"+(i-1)].amount = user["mk"+(i-1)].amount.plus(baseMKproduction(i));
		}
	}
	update();
}
function buyable(tier) {
	if (tier == 1){
		if (gravCost.lte(user.gravicles)){
			return true
		}
	} else if (gravCost.lte(user.gravicles) && user["mk"+(tier-1)].amount.gte(tierCost)&&tier<=5&&tier>=2){
		return true
	} else if (gravCost.lte(user.gravicles) && user["mk"+(tier-1)].amount.gte(tierCost)&&tier>=6){
		return true
	}
	return false
}
function buyableWell() {
	if (user["mk"+user.wells.tiercost].amount.gte(user.wells.cost)){
		return true
	}
	return false
}
function update(){
	document.getElementById("gravicle amount").innerHTML = displayRound(user.gravicles.floor());
	for(var i = 1; i <=9; i++) {
		var str = "mk"+i+"Amount";
		document.getElementById(str).innerHTML = displayRound(user["mk"+i].amount);
		if(i === 1) {
			document.getElementById("buy"+i).innerHTML = "Cost "+displayRound(user["mk"+i].cost);
		} else {
			
			document.getElementById("buy"+i).innerHTML = "Cost "+displayRound(user["mk"+i].cost)+"<br/>+"+displayRound(user["mk"+i].previousTierCost)+" mk"+(i-1)+"s";
		}
		document.getElementById("mult"+i).innerHTML = "x"+displayLessRound(baseMKmult(i));
		if(buyable(i)) {
			document.getElementById("buy"+i).className = "button";
			document.getElementById("buy"+i+"Max").className = "button";
		} else {
			document.getElementById("buy"+i).className = "buttonlocked";
			document.getElementById("buy"+i+"Max").className = "buttonlocked";
		}
	}
	showMK();
	document.getElementById("well").innerHTML = "Reset the game for a boost<br/>Cost: "+user.wells.cost+" mk"+user.wells.tiercost+"s";
	if(buyableWell()) {
		document.getElementById("well").className = "button";
	} else {
		document.getElementById("well").className = "buttonlocked";
	}
	document.getElementById("well number").innerHTML = "Gravity wells: "+user.wells.amount;
}

function displayRound(num) {
    var conv = new Decimal(num).toString()
    if (parseFloat(conv)<1e16) return Math.round(parseFloat(conv))
    return conv
}
function displayLessRound(num) {
    var conv = new Decimal(num).toString()
    if (parseFloat(conv)<1e16) return Math.round(parseFloat(conv)*1000)/1000
    return conv
}

function save(){
	localStorage.setItem("save",JSON.stringify(user));
}
function load(){
	var save = JSON.parse(localStorage.getItem("save"));
	if(localStorage.getItem("save") !== null) {
		convertDecimals(save);
		for(var i in save) {
			user[i] = save[i];
		}
	}
	return user;
}
function convertDecimals(obj) {
	if(typeof obj === "object" && obj !== null) {
		for(var i in obj) {
			obj[i] = convertDecimals(obj[i]);
		}
		if(obj._class === "Decimal") {
			if(obj.logarithm === null) {
				return new Decimal(0);
			}
			return Decimal.pow(10,obj.logarithm);
		} else {
			return obj;
		}
		
	} else {
		return obj;
	}
}
function expo(){
	var exp = btoa(JSON.stringify(user));
	document.getElementById("export thing").innerHTML = exp;
	document.getElementById("export").innerHTML = "Close";
	document.getElementById("export").onclick = function() { close(); };
}
function close(){
	document.getElementById("export thing").innerHTML = "";
	document.getElementById("export").innerHTML = "Export";
	document.getElementById("export").onclick = function() { expo(); };
}
function impo(){
	var save = window.prompt("Paste your save here");
	if(save === "") {
		//:C
	} else {
		save = JSON.parse(atob(save));
		
		convertDecimals(save);
		for(var i in save) {
			user[i] = save[i];
		}
	}
}
function clear(){
	localStorage.removeItem("save");
	user = getDefaultSave()
}
function gameLoop(){
	MKproduction();
	updateMKUnlocks();
	fullPowerWellsUpdate();
	update();
}

function startInterval(){
	load();
	setInterval(gameLoop,33);
	setInterval(save,5000);
}


function hardReset() {
	if (confirm("Are you sure you want to delete your save?")) {
		clear()
	}
}
