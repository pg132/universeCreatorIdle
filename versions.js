function updateSave() {
	if (user.version === undefined || user.points !== undefined) {
		user.version = 0.02
		delete user.points
		delete user.eaters
	}
}
