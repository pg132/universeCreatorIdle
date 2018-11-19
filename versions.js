function updateSave() {
	if (user.version === undefined || user.points !== undefined) {
		user.version = 0.02
		delete user.points
		delete user.eaters
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
}
