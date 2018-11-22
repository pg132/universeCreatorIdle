function updateSave() {
	if (user.version === undefined || user.points !== undefined) {
		var l = ["GP11","GP12","GP21","GP31","GPA1","GPA2","GPA3","GPA4","GPA5","GPA6","GPA7","GPA8","GPA9","GP41","GP42","GP51","GP52","GPWA","GP61","GP71","GP72","GPA10","GPA11","GP81","GP91","GP92"]
		var j = false
		if (l.length != user.points.possibleUpgrade.length) j = false
		else{
			for (var i = 0; i< l.length; i++){
				if (l[i] != user.points.possibleUpgrade[i]) j = true
			}
		}
		if (user.version < 0.02 || user.version === undefined || j){ 
			// only reset when user.version is less then 0.02 or its undefined or possibleUpgrade is wrong
			if (user.version < 0.1 || user.version === undefined){ // if the version is high enough we also wanna leave it be
				user.version = 0.02
				delete user.points
				delete user.eaters
			}
		}
	}
	if (user.version < 0.1) {
		user.version = 0.1
		if (user.points === undefined) {
			var k = user.points
			if (k) k = user.points.amount // if user.points is a thing
			else k = new Decimal (0) // if user.points isnt a thing, then set to 0
			if (!k) k = new Decimal (0) // if user.points is a thing but user.points.amount isnt
			user.points = {
				amount: k, // then set the amount to what we want it to be
				upgradesCost:   [     1,     1,     2,     5,    50,    60,    70,    80,    90,   100,   110,   120,   130,    10,    10,    15,    20,   200,    30,    75,   100,    500,    500,   200,    25,    50],//next line GP starts for gravity points and GPA stands for gravity points autobuyer             
				possibleUpgrade:["GP11","GP12","GP21","GP31","GPA1","GPA2","GPA3","GPA4","GPA5","GPA6","GPA7","GPA8","GPA9","GP41","GP42","GP51","GP52","GPWA","GP61","GP71","GP72","GPA10","GPA11","GP81","GP91","GP92"],       
				upgrades:[],
				autobuyers:[],
				autobuyerTimes:[10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],
				lastTimes:[new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime()]//11 of them
			}
			user.eaters = {
				GE1:{
					cost: new Decimal(1e100),
					scale: new Decimal(1e2),
					amount: 0
				},
				GE2:{
					cost: new Decimal(1e100),
					scale: new Decimal(1e2),
					amount: 0
				},
				GE3:{
					cost: new Decimal(1e100),
					scale: new Decimal(1e2),
					amount: 0
				},
				GE4:{
					cost: new Decimal(1e100),
					scale: new Decimal(1e2),
					amount: 0
				}
			}
		} 
	}
	if (user.version < 0.101){
		user.version = 0.101
		user.eaters = {
			GE1:user.eaters.GE1,
			GE2:user.eaters.GE2,
			GE3:user.eaters.GE3,
			GE4:user.eaters.GE4,
			GE5:{
				cost: new Decimal(1e400),
				scale: new Decimal(1e5),
				amount: 0,
				unlocked: false
			},
			GE6:{
				cost: new Decimal(1e400),
				scale: new Decimal(1e5),
				amount: 0,
				unlocked: false
			}
		}//closes user.eaters
	}
	if (user.version < 0.102){
		user.points = {
			amount:user.points.amount,
			upgradesCost:user.points.upgradesCost,
			possibleUpgrade:user.points.possibleUpgrade,
			requirements:   [    "",    "","GP11,GP12","GP21","GP31","GPA1","GPA2","GPA3","GPA4","GPA5","GPA6","GPA7","GPA8","GP31","GP31","GP41","GP42", "GPA9","GP51,GP52","GP61","GP61","GPA10","GP71,GP72","GP81","GP81"],       
			upgrades:user.points.upgrades,
			autobuyers:user.points.autobuyers,
			autobuyerTimes:user.points.autobuyerTimes,
			lastTimes:user.points.lastTimes
		}//closes user.poitnsd	
	}
}






