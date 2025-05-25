var room = HBInit({
    roomName: "My Room",
    maxPlayers: 18, // 4 per team + potential specs
    noPlayer: true,
    public: true
});

// Set game rules
room.setScoreLimit(5);
room.setTimeLimit(5);

const API_URL = 'https://serverjs-qc9e.onrender.com';

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
}

// Handle chat commands
room.onPlayerChat = function(player, message) {
    console.log('Chat event:', {
        playerId: player.id,
        playerName: player.name,
        message: message
    });

    // Check if message starts with '!'
    if (message.startsWith('!')) {
        console.log('Command detected:', message);
        
        // Get the command (remove the '!' and convert to lowercase)
        const command = message.slice(1).toLowerCase();
        console.log('Command parsed:', command);
        
        // Handle different commands
        switch (command) {
            case 'help':
                console.log('Sending help message to player:', player.id);
                room.sendAnnouncement('📚 Available commands:', player.id);
                room.sendAnnouncement('!help - Show this help message', player.id);
                room.sendAnnouncement('!my-names - Show all names you have used', player.id);
                return false; // Prevent the original message from being sent
                
            case 'my-names':
                console.log('Checking my-names for player:', player.id);
                if (!player.auth) {
                    console.log('Player not authenticated:', player.id);
                    room.sendAnnouncement('❌ You must be authenticated to use this command', player.id);
                    return false;
                }
                
                // Send initial message
                console.log('Sending loading message to player:', player.id);
                room.sendAnnouncement('🔍 Fetching your names...', player.id);
                
                fetch(`${API_URL}/player-names/${player.auth}`)
                    .then(response => response.json())
                    .then(names => {
                        console.log('Received names for player:', player.id, names);
                        if (names.length === 0) {
                            room.sendAnnouncement('📝 You have no recorded names yet', player.id);
                            return;
                        }
                        
                        room.sendAnnouncement('📝 Your recorded names:', player.id);
                        names.forEach(name => {
                            room.sendAnnouncement(`• ${name.name}`, player.id);
                        });
                    })
                    .catch(err => {
                        console.error('Failed to fetch names:', err);
                        room.sendAnnouncement('❌ Failed to fetch your names', player.id);
                    });
                return false;
        }
    }
    
    return true; // Allow other messages to be sent normally
}
