var room = HBInit({
    roomName: "My Room",
    maxPlayers: 18, // 4 per team + potential specs
    noPlayer: true,
    public: false,
    token: 'thr1.AAAAAGgzP4Runf45lKAeOg.xfDvmfDCgeY'
});

// Set game rules
room.setScoreLimit(5);
room.setTimeLimit(5);

const API_URL = 'https://serverjs-qc9e.onrender.com';

const joinedPlayers = [];

// Check if player is admin
async function isPlayerAdmin(auth) {
    try {
        const response = await fetch(`${API_URL}/is-admin/${auth}`);
        const data = await response.json();
        return data.isAdmin;
    } catch (err) {
        console.error('Failed to check admin status:', err);
        return false;
    }
}

function updateAdmins() { 
    var players = room.getPlayerList();
    if (players.length == 0) return;
    if (players.some(player => player.admin)) return;
}

room.onPlayerJoin = async function(player) {
    const alreadyTracked = joinedPlayers.some(p => p.auth === player.auth);

    if (!alreadyTracked) {
        joinedPlayers.push({ id: player.id, auth: player.auth });
    }

    // Optionally: log or use this
    console.log("Currently joined players:", joinedPlayers);

    // Check if player is admin
    const isAdmin = await isPlayerAdmin(player.auth);
    if (isAdmin) {
        room.setPlayerAdmin(player.id, true);
    }
    updateAdmins();

    // Send data to backend
    fetch(`${API_URL}/player-join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: player.name,
            auth: player.auth,
            ip: player.IP // optional, might not be available depending on env
        })
    }).catch(err => console.error('Failed to log player:', err));
}

room.onPlayerLeave = function(player) {
    updateAdmins();

    const index = joinedPlayers.findIndex(p => p.id === player.id);
    if (index !== -1) {
      joinedPlayers.splice(index, 1);
    }
}  

// Handle chat commands
room.onPlayerChat = async function(player, message) {
    const playerauth = joinedPlayers.find(p => p.id === player.id);

    console.log(playerauth);

    // Check if message starts with '!'
    if (message.startsWith('!')) {
        // Get the command (remove the '!' and convert to lowercase)
        const command = message.slice(1).toLowerCase();
        
        // Handle different commands
        switch (command) {
            case 'help':
                room.sendAnnouncement('📚 Available commands:', player.id);
                room.sendAnnouncement('!help - Show this help message', player.id);
                room.sendAnnouncement('!my-names - Show all names you have used', player.id);
                return false; // Prevent the original message from being sent
                
            case 'my-names':
                fetch(`${API_URL}/player-names/${playerauth.auth}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("HTTP status " + response.status);
                        }
                        return response.json();
                    })
                    .then(names => {
                        if (!Array.isArray(names)) {
                            throw new Error("Invalid response format");
                        }

                        const nameList = names.map(n => n.name).join(", ");
                        room.sendAnnouncement(`📝 Your recorded names: ${nameList}`, player.id);
                    })
                    .catch(err => {
                        console.error('Failed to fetch names:', err);
                        room.sendAnnouncement('❌ Failed to fetch your names', player.id);
                    });
        }
    }
    
    return true; // Allow other messages to be sent normally
}
