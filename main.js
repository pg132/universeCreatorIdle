

var version = 0.0;
var user = {
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
		costMult:1.16
	},
	mk3:{
		cost:new Decimal(1000),
		amount:new Decimal(0),
		multiplier:new Decimal(1),	
		base:0,
		previousTierCost:10,
		costMult:1.17
	},
	mk4:{
		cost:new Decimal(10),
		amount:new Decimal(0),
		multiplier:new Decimal(1),
		base:0,
		previousTierCost:10,
		costMult:1.18
	},
	mk5:{
		cost:new Decimal(10),
		amount:new Decimal(0),
		multiplier:new Decimal(1),
		base:0,
		previousTierCost:10,
		previousTierCost:10,
		costMult:1.19
	},
	mk6:{
		cost:new Decimal(10),
		amount:new Decimal(0),
		multiplier:new Decimal(1),
		base:0,
		unlocked:false,
		previousTierCost:10,
		costMult:1.20
	},
	mk7:{
		cost:new Decimal(10),
		amount:new Decimal(0),
		multiplier:new Decimal(1),
		base:0,
		unlocked:false,
		previousTierCost:10,
		costMult:1.21
	},
	mk8:{
		cost:new Decimal(10),
		amount:new Decimal(0),
		multiplier:new Decimal(1),
		base:0,
		unlocked:false,
		previousTierCost:10,
		costMult:1.22
	},
	mk9:{
		cost:new Decimal(10),
		amount:new Decimal(0),
		multiplier:new Decimal(1),
		base:0,
		unlocked:false,
		previousTierCost:10,
		costMult:1.23
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
		amount:0
	},
	points:{
		amount:new Decimal(0),
		upgradesCost:[1,2,5,50,60,70,80,90,100,110,120,130,10,15,30,75],//next line GP starts for gravity points and GPA stands for gravity points autobuyer
		possibleUpgrade:["GP11","GP21","GP31","GPA1","GPA2","GPA3","GPA4","GPA5","GPA6","GPA7","GPA8","GPA9","GP41","GP42","GP51","GP61"],
		upgrades:[],
		
	}


};




function getPulseReward(wells){
	return 1+Decimal.sqrt(wells/2000)
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
		}
	}
	if (gravCost.lte(user.gravicles) && tierCost.lte(user["mk"+(tier-1)].amount)&&tier<=5){
		user.gravicles = user.gravicles.minus(gravCost)
		user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
		//what should the multiplier formula be? rn im gonna make it 1% stronger
		user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(1.01)
		user["mk"+(tier-1)].amount = user["mk"+(tier-1)].amount.minus(tierCost)
		user["mk"+tier].amount = user.mk1.amount.plus(1)
		user["mk"+tier].base += 1
	}
	if (gravCost.lte(user.gravicles) && tierCost.lte(user["mk"+(tier-1)].amount)&&tier>=6){
		if (user["mk"+tier].unlocked == true){
			user.gravicles = user.gravicles.minus(gravCost)
			user["mk"+tier].cost = user["mk"+tier].cost.times(costMult)
			//what should the multiplier formula be? rn im gonna make it 1% stronger
			user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(1.01)
			user["mk"+(tier-1)].amount = user["mk"+(tier-1)].amount.minus(tierCost)
			user["mk"+tier].amount = user.mk1.amount.plus(1)
			user["mk"+tier].base += 1
		}
	}
}

function gravityWellBoost(tier){
       	var w = user.wells.amount
	var d = user.wells.defaultMults
	if (w<=d-1+tier) return Decimal.max(1,2**(w-tier+1))//fifth is worse
	return Decimal.pow(2,(d-1)).times(w-d-tier+3)//just try it, it should work
}


function buyMaxMK(tier){
    	var tierCost = user["mk"+tier].previousTierCost
    	var gravCost = user["mk"+tier].cost
    	var costMult = user["mk"+tier].costMult
    	var grav = user.gravicels
    	if (grav.gt(gravCost)){
        	var p = grav.log10()-gravCost.log10()
        	var c = Decimal.log10(costMult)
        	//var sumCost = Decimal.pow(c,numberbuying).minus(1).times(1/(1-costMult))
        	var costDiff = grav.div(gravCost)
        	costDiff = costDiff.times(1-costMult)
        	costDiff = costDiff.plus(gravCost)//now its the ratio of the total cost to the start cost
        	var w = costDiff.log10()/c //we want to buy w of them we first want to check if we have the tierCost
        	if (tier == 1){
         		user.mk1.multiplier =user.mk1.multiplier.times(Decimal.pow(1.01,w))
            		user.mk1.base += w
            		user.mk1.amount = user.mk1.amount.plus(w)
            		user.gravicels = user.gravicels.minus(Decimal.pow(costMult,w).minus(gravCost).div(costMult-1))
            		user.mk1.cost = user.mk1.cost.times(Decimal.pow(costMult,w))
        	}//closes tier==1
        	if (tier <= 5){
            		var tC2 = tierCost*w
            		if (user["mk"+tier-1].base >= tC2){
               			user["mk"+tier].multiplier =user.mk1.multiplier.times(Decimal.pow(1.01,w))
                		user["mk"+tier].base += w
                		user["mk"+tier].amount = user.mk1.amount.plus(w)
                		user.gravicels = user.gravicels.minus(Decimal.pow(costMult,w).minus(gravCost).div(costMult-1))
                		user["mk"+tier].cost = user.mk1.cost.times(Decimal.pow(costMult,w))
                		user["mk"+tier-1].amount = user["mk"+tier-1].amount.minus(tC2)
			} else{
                		for (var i = 0; i< w; i++){
                    			buyMK(tier)
				}
			}//closes else for for loop
		} else {//tier is abv 5
            		if (user["mk"+tier].unlocked){
                		var tC2 = tierCost*w
                		if (user["mk"+tier-1].base >= tC2){
                    			user["mk"+tier].multiplier =user.mk1.multiplier.times(Decimal.pow(1.01,w))
                    			user["mk"+tier].base += w
                    			user["mk"+tier].amount = user.mk1.amount.plus(w)
                    			user.gravicels = user.gravicels.minus(Decimal.pow(costMult,w).minus(gravCost).div(costMult-1))
                    			user["mk"+tier].cost = user.mk1.cost.times(Decimal.pow(costMult,w))
                    			user["mk"+tier-1].amount = user["mk"+tier-1].amount.minus(tC2)
                		} else{
                   			for (var i = 0; i< w; i++){
                        			buyMK(tier)
					}
				}//closes if for basecost
			}//closes unlocked if
		}//closes else refering to tier >= 5        
        
    }
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


function baseMKproduction(tier){
	var amt = user["mk"+tier].amount
	var mult = user["mk"+tier].multiplier
	//put additional mults here
	return amt.times(mult).times(.1)//the times(.1) is for time since we update 10 times per second
}

function MKproduction(){
	for(var i = 1; i <=9; i++) {
		if(i === 1) {
			user.gravicles = user.gravicles.plus(baseMKproduction(i));
		} else {
			user["mk"+(i-1)].base = user["mk"+(i-1)].base.plus(baseMKproduction(i));
		}
	}
}

function update(){
	document.getElementById("gravicle amount") = user.gravicles.toString();
	for(var i = 1; i <=9; i++) {
		var str = "mk"+i+"Amount";
		document.getElementById(str) = user["mk"+i].toString();
	}
}

function gameLoop(){
	MKproduction();
}

function startInterval(){
	setInterval(gameLoop,33);
}














