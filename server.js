var room = HBInit({
	roomName: "Leclerc",
	maxPlayers: 18, // 4 per team + potential specs
	noPlayer: true,
	public: true
});

// Set game rules
room.setScoreLimit(5);
room.setTimeLimit(5);

// Admin management (from previous example)
const MY_AUTH = "L-CDSX9_CIGvQzQHDOmp91j2wzuE4PAlY0fgPLOWVPM";

function updateAdmins() {
	var players = room.getPlayerList();
	if (players.length == 0) return;
	if (players.some(player => player.admin)) return;
}

room.onPlayerJoin = function (player) {
	if (player.auth === MY_AUTH) {
		room.setPlayerAdmin(player.id, true);
	}
	updateAdmins();

	// Send data to backend
	fetch('https://serverjs-qc9e.onrender.com/player-join', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: player.name,
			auth: player.auth,
			ip: player.IP // optional, might not be available depending on env
		})
	}).catch(err => console.error('Failed to log player:', err));
}

room.onPlayerLeave = function (player) {
	updateAdmins();
}
