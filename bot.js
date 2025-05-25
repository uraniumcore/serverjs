var room = HBInit({
    roomName: "My Room",
    maxPlayers: 18, // 4 per team + potential specs
    noPlayer: true,
    public: true
});

// Set game rules
room.setScoreLimit(5);
room.setTimeLimit(5);

// Admin management (from previous example)
const MY_AUTH = "O2_weJ5UGBtIzovqY1NiP1wdgTHHJTezDfJ5bo0_hNE";

function updateAdmins() { 
    var players = room.getPlayerList();
    if (players.length == 0) return;
    if (players.some(player => player.admin)) return;
}

room.onPlayerJoin = function(player) {
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

room.onPlayerLeave = function(player) {
    updateAdmins();
}

// Handle chat commands
room.onPlayerChat = function(player, message) {
    // Check if message starts with '!'
    if (message.startsWith('!')) {
        // Get the command (remove the '!' and convert to lowercase)
        const command = message.slice(1).toLowerCase();
        
        // Handle different commands
        switch (command) {
            case 'help':
                room.sendChat('📚 Available commands:', player.id);
                room.sendChat('!help - Show this help message', player.id);
                room.sendChat('!my-names - Show all names you have used', player.id);
                return false; // Prevent the original message from being sent
                
            case 'my-names':
                if (!player.auth) {
                    room.sendChat('❌ You must be authenticated to use this command', player.id);
                    return false;
                }
                
                fetch(`https://serverjs-qc9e.onrender.com/player-names/${player.auth}`)
                    .then(response => response.json())
                    .then(names => {
                        if (names.length === 0) {
                            room.sendChat('📝 You have no recorded names yet', player.id);
                            return;
                        }
                        
                        room.sendChat('📝 Your recorded names:', player.id);
                        names.forEach(name => {
                            room.sendChat(`• ${name.name}`, player.id);
                        });
                    })
                    .catch(err => {
                        console.error('Failed to fetch names:', err);
                        room.sendChat('❌ Failed to fetch your names', player.id);
                    });
                return false;
        }
    }
    
    return true; // Allow other messages to be sent normally
}
