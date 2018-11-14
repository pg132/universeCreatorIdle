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
		points:{
			amount:new Decimal(0),
			upgradesCost:[1,2,5,50,60,70,80,90,100,110,120,130,10,15,30,75,200,200,25,50],//next line GP starts for gravity points and GPA stands for gravity points autobuyer
			possibleUpgrade:["GP11","GP21","GP31","GPA1","GPA2","GPA3","GPA4","GPA5","GPA6","GPA7","GPA8","GPA9","GP41","GP42","GP51","GP61","GPWA","GP71","GP81","GP82"],
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
	var w = 1.02
	if (user.points.upgrades.includes("GP51")) w = 1.015
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
				if (user.mk1.base%50 === 0 && user.mk1.base > 300) user.mk1.costMult *= w
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
			if (user["mk"+tier].base %50 === 0 && user["mk"+tier].base > 300) user["mk"+tier].costMult *= w
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
				if (user["mk"+tier].base%50 === 0 && user["mk"+tier].base > 300) user["mk"+tier].costMult *= w
			}
		}
	}
	if (user["mk"+tier].cost.gte(Decimal.pow(10,308)) && gravCost.lte(Decimal.pow(10,308))) user["mk"+tier].costMult *= 2
	//abv is init mult scale after e308
	update();
}

function gravityWell(autobuyer){//autobuyer helps us later to see if the player is doing it
	//first check is if we can afford it
	if (user["mk"+user.wells.tiercost].amount.gte(new Decimal(user.wells.cost-.0001))){//otherwise kick us out of this function
		resetMK() //we need this function DONE
		if (!(user.wells.tiercost == 9)){
			user.wells.tiercost += 1
		} else{
			user.wells.cost += user.wells.costScale//might be changed later by an upgrade
		}
		//now do the boosts if so
		user.wells.amount += 1
		if (user.points.upgrades.includes("GP81")){
			user.gravicles += 100000//1e5
			user.mk1.amount = user.mk1.amount.plus(200)
		}
	}
}

function updatePulseCost(){
	user.pulse.cost = user.wells.defaultMults*2-3
	if (user.points.upgrades.includes("GP21")) user.pulse.cost = user.wells.defaultMults*2-5
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
			points:user.points
	
		}
		user.pulse.amount += 1 //give another pulse
		if (user.points.upgrades.includes("GP41")) user.wells.amount += 1
		if (user.points.upgrades.includes("GP71")) user.wells.costScale -= 5
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
		points:user.points
	}
}





function gravityWellBoost(tier){
       	var w = user.wells.amount
	var d = user.wells.defaultMults
	var base = 2
	if (user.points.upgrades.includes("GP42")) base = 2.2
	var q = new Decimal(1)
	if (user.points.upgrades.includes("GP61"))  q = Decimal.pow(1.5,Math.floor(w/5))
	if (w<=d-1+tier) return Decimal.max(1,base**(w-tier+1)).times(q)//fifth is worse
	return Decimal.pow(base,(d-1)).times(w-d-tier+3).times(q)//just try it, it should work
}

function fullPowerWellsUpdate(){
	var constant = 4
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
function maxAll(){
	for(var i = 1; i <=9; i++) {
		buyMaxMK(10-i);
	}
}


function sacPulses(amt){
	if (user.pulse.amount>= amt+2 && amt > 0){
		user.points.amount = user.points.amount.plus(amt)
		user.pulse.amount = user.pulse.amount.minus(amt)
		//remove the last amt elems from user.pulse.multipliers this is done by the .pop()
		for (var i = 0; i<amt;i++){
			user.pulse.multipliers.pop()
		}
	}
}
function sacMaxPulses(){
	sacPulses(Math.max(0,user.pulse.amount-2))
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
	mult = mult.times(Decimal.pow(1+1.5/tier,user.wells.defaultMults-4))
	//put additional mults here
	if (user.points.upgrades.includes("GP82")) {
		if (user["mk"+tier].amount == 0) return new Decimal (0)
		return amt.plus(10).times(mult).times(.033)
	}
	return amt.times(mult).times(.033)//the times(.033) is for time since we update 30 times per second
}

function baseMKmult(tier){
	var mult = user["mk"+tier].multiplier
	mult = mult.times(gravityWellBoost(tier))
	if (tier == 9 && (user.points.upgrades.includes("GP41"))) mult = mult.times(2)
	mult = mult.times(Decimal.pow(1+1.5/tier,user.wells.defaultMults-4))
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
	var tierCost = user["mk"+tier].previousTierCost
	var gravCost = user["mk"+tier].cost
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
	if (user["mk"+user.wells.tiercost].amount.gte(new Decimal(user.wells.cost))){
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
	document.getElementById("gravicle amount").innerHTML = formatValue("Standard",user.gravicles,3,0);
	for(var i = 1; i <=9; i++) {
		var str = "mk"+i+"Amount";
		document.getElementById(str).innerHTML = formatValue("Standard",user["mk"+i].amount,3,0);
		if(i === 1) {
			document.getElementById("buy"+i).innerHTML = "Cost: "+formatValue("Standard",user["mk"+i].cost,3,0);
		} else {
			document.getElementById("buy"+i).innerHTML = "Cost: "+formatValue("Standard",user["mk"+i].cost,3,0)+" & "+user["mk"+i].previousTierCost+" mk"+(i-1)+"s";
		}
		document.getElementById("mult"+i).innerHTML = "x"+formatValue("Standard",baseMKmult(i),3,3);
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
	document.getElementById("well number").innerHTML = "Gravity wells: "+user.wells.amount;
	document.getElementById("pulse number").innerHTML = "Gravitational pulses: "+user.pulse.amount+" ("+user.wells.defaultMults+" wells at full power)";
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
	updatePulseCost();
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
