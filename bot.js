var room = HBInit({
    roomName: "HaxBalling | KZ",
    maxPlayers: 12, // 4 per team + potential specs
    noPlayer: true,
    public: false,
    token: 'thr1.AAAAAGg1X-SlTJNOahiBBA.cvE2aCSY0oE',
    geo: {
        "code": "KZ", "lat" : 51.1605, "lon" : 71.4704
    }
});

console.log('Room initialized.');

// Set game rules
room.setScoreLimit(5);
room.setTimeLimit(5);


const API_URL = 'https://serverjs-qc9e.onrender.com';

let allPlayers = [];
let afks = [];
let nonAfks = [];


function getPlayerAuthById(playerId) {
    const player = allPlayers.find(p => p.id === playerId);
    return player ? player.auth : null;
}

// Check if player is admin
async function isPlayerAdmin(auth) {
    try {
        console.log('Making admin check request for auth:', auth);
        const response = await fetch(`${API_URL}/is-admin/${auth}`);
        const data = await response.json();
        console.log('Admin check response:', data); // Add this line to debug
        return data.isAdmin;
    } catch (err) {
        console.error('Failed to check admin status:', err);
        return false;
    }
}

async function updateAdmins(player) { 
    const players = room.getPlayerList();
    if (players.length === 0){
        console.log('No players in room, skipping admin update');
        return;
    }
    try {
        console.log(`Checking admin status for player: ${player.name} (${player.auth})`);
        const isAdmin = await isPlayerAdmin(player.auth);
        console.log(`Admin check result for ${player.name}:`, isAdmin); // Add this line to debug
        if (isAdmin) {
            // Set player as admin in the room
            room.setPlayerAdmin(player.id, true);
            console.log(`Admin privileges granted to: ${player.name}`);
            room.sendChat(`${player.name} is an admin`);
        } else {
            console.log(`Player ${player.name} is not an admin`);
        }
    } catch (err) {
        console.error('Failed to update admin status:', {
            player: player.name,
            auth: player.auth,
            error: err.message
        });
    }
}

/* COMMANDS */
async function deanonCommand(auth) {
    try {
        const response = await fetch(`${API_URL}/player-names/${auth}`);
        const data = await response.json();
        console.log(data);

        const names = data;

        const nameList = names.map(item => item.name).join(', ');

        id = allPlayers.find(p => p.id === auth);

        room.sendAnnouncement(`Previous names: ${nameList}`, id);

        return true;
    } catch (err) {
        console.error('Failed to check names:', err);
        return false;
    }
}

/* GAME LOGIC */
// START START START

// Track if game is running
let isGameRunning = false;

let players = room.getPlayerList();
let spectators = players.filter(p => p.team === 0);
let redTeam = players.filter(p => p.team === 1);
let blueTeam = players.filter(p => p.team === 2);

function teamsUpdate() {
    players = room.getPlayerList();
    spectators = players.filter(p => p.team === 0);
    redTeam = players.filter(p => p.team === 1);
    blueTeam = players.filter(p => p.team === 2);
}

function whoToJoin() {
    teamsUpdate();
    if (redTeam.length > blueTeam.length) return 2;
    if (redTeam.length < blueTeam.length) return 1;
    else {
        if (spectators.length >= 2){
            shuffle();
        }
    }
}

async function updatePlayer(player) {
    console.log(`Updating player in database: ${player.name} (${player.auth})`);
    // Log player join to database
    try {
        const response = await fetch(`${API_URL}/player-join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: player.name,
                auth: player.auth
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to log player join:', {
                player: player.name,
                status: response.status,
                error: errorText
            });
        } else {
            console.log(`Successfully logged player join: ${player.name}`);
        }
    } catch (err) {
        console.error('Error logging player join:', {
            player: player.name,
            error: err.message,
            stack: err.stack
        });
    }
}

function goAfk(player) {
    console.log(`Player going AFK: ${player.name}`);
    afks.push(player.id);
    console.log('Current AFK players:', afks);
}

function exitAfk(player) {
    console.log(`Player no longer AFK: ${player.name}`);
    afks = afks.filter(id => id !== player.id);
    console.log('Current AFK players:', afks);
}

room.onPlayerJoin = async function(player) {
    console.log(`Player joined: ${player.name} (${player.auth})`);

    allPlayers.push({
        id: player.id,
        auth: player.auth,
        name: player.name
    });

    await updateAdmins(player);
    await updatePlayer(player);

    room.sendChat(`Welcome ${player.name}! Type !help for available commands.`);

    console.log(`Welcome message sent to: ${player.name}`);
}

room.onPlayerLeave = function(player) {
    console.log(`Player left: ${player.name} (${player.auth})`);

    allPlayers = allPlayers.filter(p => p.id !== player.id);

    // Clean up AFK status if player was AFK
    if (afks.includes(player.id)) {
        console.log(`Removing AFK status for left player: ${player.name}`);
        exitAfk(player);
    }
}

/* GAME LOGIC END */
// END END END

/* CHAT LOGIC */
// START START START

room.onPlayerChat = function(player, message) {
    // Check if message is a command (starts with !)
    if (message.startsWith('!')) {
        // Split the message into command and arguments
        const [command, ...args] = message.slice(1).split(' ');
        
        switch (command.toLowerCase()) {
            case 'help':
                room.sendAnnouncement('Available commands: !help, !stats, !deanon', player.id);
                return false; // Don't show the command in chat
            
            case 'start':
                if(nonAfks.length < 2){
                    room.sendAnnouncement('At least 2 players to start the game.');
                } else {
                    room.sendAnnouncement('Mixing...');
                    
                }
            case 'stats':
                // TODO: Implement stats command
                room.sendAnnouncement('Stats command coming soon!', player.id);
                return false;
                
            case 'deanon':
                let auth = getPlayerAuthById(player.id);
                try {
                    if (deanonCommand(auth)) {
                        // Extract just the names from the objects and join them
                    } else {
                        room.sendAnnouncement('No previous names found', player.id);
                    }
                } catch (err) {
                    console.error('Error in deanon command:', err);
                    room.sendAnnouncement('Failed to fetch previous names', player.id);
                }
                return false;
        
            case 'afk':
                if(afks.includes(player.id)) {
                    exitAfk(player);
                    room.sendAnnouncement(`${player.name} is no longer AFK`);
                } else {
                    goAfk(player);
                    room.sendAnnouncement(`${player.name} is now AFK`);
                }
                return false;
            
            default:
                room.sendAnnouncement(`Unknown command: ${command}. Type !help for available commands.`);
                return false;
        }
    }
    return false; // Allow normal messages to be shown in chat
}