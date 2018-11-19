function updateSave() {
	if (user.version !== undefined) {
		user.version = 0.01
		user.points = {
			amount : user.points.amount,
			upgradesCost:   [     1,     1,     2,     5,    50,    60,    70,    80,    90,   100,   110,   120,   130,    10,    10,    15,    20,   200,   30,    75,    100,    500,    500,   200,    25,    50],//next line GP starts for gravity points and GPA stands for gravity points autobuyer             
			possibleUpgrade:["GP11","GP12","GP21","GP31","GPA1","GPA2","GPA3","GPA4","GPA5","GPA6","GPA7","GPA8","GPA9","GP41","GP42","GP51","GP52","GPWA","GP61","GP71","GP72","GPA10","GPA11","GP81","GP91","GP92"],       
			upgrades: user.points.upgrades ? user.points.upgrades : [],
			autobuyers: user.points.autobuyers ? user.points.autobuyers : [],
			autobuyerTimes: user.points.autobuyerTimes ? user.points.autobuyerTimes : [10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],
			lastTimes: user.points.lastTimes ? user.points.lastTimes : [new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime(),new Date().getTime()]//11 of them
		}
	}
	if (user.version < 0.02) {
		user.version = 0.02
		user.points.amount = new Decimal(user.points.amount)
	}
}
