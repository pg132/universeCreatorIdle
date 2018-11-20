

function resizeCanvas() {
	var canvas = document.getElementById("upgradeCanvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 0;
	canvas.height = 0;
	canvas.width = document.body.scrollWidth;
	canvas.height = document.body.scrollHeight;
	drawUpgradeTree();
}

function drawTreeBranch(name1, name2) {
	var canvas = document.getElementById("upgradeCanvas");
	var ctx = canvas.getContext("2d");
	var start = document.getElementById(name1).getBoundingClientRect();
	var end = document.getElementById(name2).getBoundingClientRect();
	var x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	var y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	var x2 = end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	var y2 = end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	ctx.lineWidth=15;
	ctx.beginPath();
	if(user.points.upgrades.includes(name1) && user.points.upgrades.includes(name2)) {
		ctx.strokeStyle="#5AC467";
	} else {
		ctx.strokeStyle="#A3A3A3";
	}
	ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function drawUpgradeTree() {
	drawTreeBranch("GP11", "GP21");
	drawTreeBranch("GP12", "GP21");
	drawTreeBranch("GP21", "GP31");
	drawTreeBranch("GP31", "GP41");
	drawTreeBranch("GP31", "GP42");
	drawTreeBranch("GP41", "GP51");
	drawTreeBranch("GP42", "GP52");
	drawTreeBranch("GP51", "GP61");
	drawTreeBranch("GP52", "GP61");
	drawTreeBranch("GP61", "GP71");
	drawTreeBranch("GP61", "GP72");
}








