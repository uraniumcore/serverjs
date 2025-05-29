var room = HBInit({
    roomName: "HaxBalling | KZ",
    maxPlayers: 12, // 4 per team + potential specs
    noPlayer: true,
    public: false,
    token: 'thr1.AAAAAGg1ku5uezk5t1OlsQ.A3p786ZBUGA',
    geo: {
        "code": "KZ", "lat" : 51.1605, "lon" : 71.4704
    }
});

room.setCustomStadium(`
    {"name":"Futsal 3x3 4x4 from HaxMaps","width":755,"height":339,"spawnDistance":310,"bg":{"type":"hockey","width":665,"height":290,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":-665,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-665,"y":80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-665,"y":-80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-665,"y":-290,"trait":"ballArea","bCoef":1,"cMask":["ball"]},{"x":665,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":665,"y":80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":665,"y":-80,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":665,"y":-290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":0,"y":306,"trait":"kickOffBarrier"},{"x":0,"y":80,"trait":"kickOffBarrier"},{"x":0,"y":-80,"trait":"line"},{"x":0,"y":-306,"trait":"kickOffBarrier"},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":-693,"y":-80},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":693,"y":-80},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":-693,"y":80},{"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","x":693,"y":80},{"trait":"line","x":-665,"y":-215},{"trait":"line","x":-500,"y":-50},{"trait":"line","x":665,"y":-215},{"trait":"line","x":500,"y":-50},{"trait":"line","x":-665,"y":215},{"trait":"line","x":-500,"y":50},{"trait":"line","x":665,"y":215},{"trait":"line","x":500,"y":50},{"bCoef":1,"trait":"ballArea","x":665,"y":290},{"bCoef":1,"trait":"ballArea","x":665,"y":-290},{"bCoef":0,"trait":"line","x":0,"y":290},{"bCoef":0,"trait":"line","x":0,"y":-290},{"x":0,"y":80,"trait":"kickOffBarrier"},{"x":0,"y":-80,"trait":"kickOffBarrier"},{"x":674,"y":-80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":674,"y":-290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-674,"y":-80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-674,"y":-290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":-674,"y":80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":-674,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1},{"x":674,"y":80,"trait":"line","cMask":["ball"],"bCoef":1},{"x":674,"y":290,"trait":"ballArea","cMask":["ball"],"bCoef":1}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"ballArea"},{"v0":4,"v1":5,"trait":"ballArea"},{"v0":6,"v1":7,"trait":"ballArea"},{"v0":8,"v1":9,"trait":"kickOffBarrier"},{"v0":9,"v1":10,"trait":"kickOffBarrier","curve":180,"cGroup":["blueKO"]},{"v0":9,"v1":10,"trait":"kickOffBarrier","curve":-180,"cGroup":["redKO"]},{"v0":10,"v1":11,"trait":"kickOffBarrier"},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":2,"v1":12,"color":"FFFFFF","curve":-35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":6,"v1":13,"color":"FFFFFF","curve":35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":1,"v1":14,"color":"FFFFFF","curve":35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":5,"v1":15,"color":"FFFFFF","curve":-35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":12,"v1":14,"x":-585,"color":"FFFFFF","curve":-35},{"vis":true,"bCoef":0.1,"cMask":["ball"],"trait":"goalNet","v0":13,"v1":15,"x":585,"color":"FFFFFF","curve":35},{"color":"FFFFFF","trait":"line","v0":16,"v1":17,"curve":90},{"color":"FFFFFF","trait":"line","v0":18,"v1":19,"curve":-90},{"color":"FFFFFF","trait":"line","v0":20,"v1":21,"curve":-90},{"color":"FFFFFF","trait":"line","v0":22,"v1":23,"curve":90},{"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":17,"v1":21,"curve":0},{"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":19,"v1":23,"curve":0},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":1,"v1":0,"cMask":["ball"],"x":-665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":5,"v1":4,"cMask":["ball"],"x":665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":2,"v1":3,"cMask":["ball"],"x":-665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":6,"v1":7,"cMask":["ball"],"x":665},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":0,"v1":24,"y":290},{"vis":true,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":3,"v1":25,"y":-290},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":26,"v1":27},{"curve":-180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":10,"v1":9},{"curve":180,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":29,"v1":28},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":2,"v1":1},{"curve":0,"vis":true,"color":"FFFFFF","bCoef":0,"trait":"line","v0":6,"v1":5},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":30,"v1":31,"cMask":["ball"],"x":614},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":32,"v1":33,"cMask":["ball"],"x":-614},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":34,"v1":35,"cMask":["ball"],"x":-614},{"vis":false,"color":"FFFFFF","bCoef":1,"trait":"ballArea","v0":36,"v1":37,"cMask":["ball"],"x":614}],"goals":[{"p0":[-674,-80],"p1":[-674,80],"team":"red"},{"p0":[674,80],"p1":[674,-80],"team":"blue"}],"discs":[{"pos":[-665,80],"trait":"goalPost","color":"FFFFFF","radius":5},{"pos":[-665,-80],"trait":"goalPost","color":"FFFFFF","radius":5},{"pos":[665,80],"trait":"goalPost","color":"FFFFFF","radius":5},{"pos":[665,-80],"trait":"goalPost","color":"FFFFFF","radius":5}],"planes":[{"normal":[0,1],"dist":-290,"trait":"ballArea"},{"normal":[0,-1],"dist":-290,"trait":"ballArea"},{"normal":[0,1],"dist":-339,"bCoef":0.2,"cMask":["all"]},{"normal":[0,-1],"dist":-339,"bCoef":0.2,"cMask":["all"]},{"normal":[1,0],"dist":-755,"bCoef":0.2,"cMask":["all"]},{"normal":[-1,0],"dist":-755,"bCoef":0.2,"cMask":["all"]}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":1},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["all"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]},"line":{"vis":true,"bCoef":0,"cMask":[""]},"arco":{"radius":2,"cMask":["n\/d"],"color":"cccccc"}},"playerPhysics":{"acceleration":0.11,"kickingAcceleration":0.1,"kickStrength":7},"ballPhysics":{"radius":6.4,"color":"EAFF00"}}
`)

console.log('Room initialized.');

// Set game rules
room.setScoreLimit(5);
room.setTimeLimit(5);


const API_URL = 'http://34.88.189.3:3000/';

let allPlayers = [];
let afks = [];
let nonAfks = [];

// Add at the top of the file with other constants
const OWNER_AUTH = 'O2_weJ5UGBtIzovqY1NiP1wdgTHHJTezDfJ5bo0_hNE';

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

function gameStartCommand() {
    // Get all non-AFK players
    const availablePlayers = room.getPlayerList().filter(p => !afks.includes(p.id));
    console.log('Starting game with non-AFK players:', availablePlayers.map(p => p.name));
    
    // Limit to 8 players total (4 per team)
    const limitedPlayers = availablePlayers.slice(0, 8);
    console.log('Limited to 8 players:', limitedPlayers.map(p => p.name));
    
    // Shuffle the players array
    const shuffledPlayers = limitedPlayers.sort(() => Math.random() - 0.5);
    console.log('Shuffled players:', shuffledPlayers.map(p => p.name));
    
    // Split players into two teams (max 4 per team)
    const halfLength = Math.min(4, Math.ceil(shuffledPlayers.length / 2));
    const redTeam = shuffledPlayers.slice(0, halfLength);
    const blueTeam = shuffledPlayers.slice(halfLength, halfLength + 4);
    console.log('Team split - Red:', redTeam.map(p => p.name), 'Blue:', blueTeam.map(p => p.name));
    
    // Move remaining players to spectators
    const remainingPlayers = shuffledPlayers.slice(halfLength + 4);
    remainingPlayers.forEach(player => {
        console.log('Moving', player.name, 'to spectators');
        room.setPlayerTeam(player.id, 0);
    });
    
    // Move players to their teams
    redTeam.forEach(player => {
        console.log('Moving', player.name, 'to red team');
        room.setPlayerTeam(player.id, 1); // 1 is red team
    });
    
    blueTeam.forEach(player => {
        console.log('Moving', player.name, 'to blue team');
        room.setPlayerTeam(player.id, 2); // 2 is blue team
    });
    
    // Start the game
    console.log('Starting the game');
    room.startGame();
    isGameRunning = true;
    
    // Announce teams
    const redTeamNames = redTeam.map(p => p.name).join(', ');
    const blueTeamNames = blueTeam.map(p => p.name).join(', ');
    console.log('Announcing teams - Red:', redTeamNames, 'Blue:', blueTeamNames);
    room.sendChat('Red Team: ' + redTeamNames);
    room.sendChat('Blue Team: ' + blueTeamNames);
    
    // Announce if any players were moved to spectators
    if (remainingPlayers.length > 0) {
        const spectatorNames = remainingPlayers.map(p => p.name).join(', ');
        room.sendChat('Moved to spectators: ' + spectatorNames);
    }

    // Wait 5 seconds before starting the game
    room.sendChat('Game starts in 5 seconds...');
    setTimeout(() => {
        console.log('Starting the game');
        room.startGame();
        isGameRunning = true;
    }, 5000);
}

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
    nonAfks = nonAfks.filter(id => id !== player.id);
    room.setPlayerTeam(player.id, 0);
    console.log('Current AFK players:', afks);
}

function exitAfk(player) {
    console.log(`Player no longer AFK: ${player.name}`);
    afks = afks.filter(id => id !== player.id);
    if (!nonAfks.includes(player.id)) {
        nonAfks.push(player.id);
    }

    // Only put player in team if game is running
    if (isGameRunning) {
        // Get current team sizes
        const players = room.getPlayerList();
        const redTeam = players.filter(p => p.team === 1);
        const blueTeam = players.filter(p => p.team === 2);
        
        // Add player to the team with fewer players
        if (redTeam.length <= blueTeam.length && redTeam.length < 4) {
            room.setPlayerTeam(player.id, 1); // Red team
            console.log(`Added ${player.name} to red team`);
        } else if (blueTeam.length < 4) {
            room.setPlayerTeam(player.id, 2); // Blue team
            console.log(`Added ${player.name} to blue team`);
        } else {
            // If both teams are full, keep them as spectator
            console.log(`Both teams are full, keeping ${player.name} as spectator`);
        }
    } else {
        console.log(`Game is not running, keeping ${player.name} as spectator`);
    }
    
    
    console.log('Current AFK players:', afks);
    console.log('Current non-AFK players:', nonAfks);
}

room.onPlayerJoin = async function(player) {
    console.log(`Player joined: ${player.name} (${player.auth})`);

    allPlayers.push({
        id: player.id,
        auth: player.auth,
        name: player.name
    });

    if (!nonAfks.includes(player.id)) {
        nonAfks.push(player.id);
    }
    room.sendAnnouncement(`Welcome ${player.name}! Type !help for available commands.`);

    console.log(`Welcome message sent to: ${player.name}`);

    await updateAdmins(player);
    await updatePlayer(player);
}

room.onPlayerLeave = function(player) {
    console.log(`Player left: ${player.name} (${player.auth})`);

    // Remove from allPlayers
    allPlayers = allPlayers.filter(p => p.id !== player.id);
    
    // Remove from nonAfks if present
    if (nonAfks.includes(player.id)) {
        console.log(`Removing non-AFK status for left player: ${player.name}`);
        nonAfks = nonAfks.filter(id => id !== player.id);
    }
    
    // Remove from afks if present
    if (afks.includes(player.id)) {
        console.log(`Removing AFK status for left player: ${player.name}`);
        afks = afks.filter(id => id !== player.id);
    }
}

room.onTeamVictory = function(scores) {
    console.log('Game ended. Scores:', scores);
    isGameRunning = false;
    
    // Announce the winner
    const redScore = scores.red;
    const blueScore = scores.blue;
    if (redScore > blueScore) {
        room.sendChat('Red team wins!');
    } else {
        room.sendChat('Blue team wins!');
    }
}

/* GAME LOGIC END */
// END END END

/* CHAT LOGIC */
// START START START

room.onPlayerChat = function(player, message) {
    let auth = getPlayerAuthById(player.id);
    // Check if message is a command (starts with !)
    if (message.startsWith('!')) {
        // Split the message into command and arguments
        const [command, ...args] = message.slice(1).split(' ');
        
        switch (command.toLowerCase()) {
            case 'help':
                room.sendAnnouncement('Available commands: !help, !stats, !deanon, !afk, !start, !bb, !q', player.id);
                return false; // Don't show the command in chat
            
            case 'start':
                if (isGameRunning) {
                    room.sendAnnouncement('Game is already running!', player.id);
                    return false;
                }
                
                if(nonAfks.length < 2){
                    room.sendAnnouncement('At least 2 players to start the game.');
                } else {
                    room.sendAnnouncement('Mixing...');
                    gameStartCommand();
                }
                return false;   

            case 'stats':
                // TODO: Implement stats command
                room.sendAnnouncement('Stats command coming soon!', player.id);
                return false;
                
            case 'deanon':
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
            
            case 'bb':
                room.kickPlayer(player.id, 'Left the room', false);
                return false;

            case 'q':
                const nonAfkPlayers = nonAfks.map(id => room.getPlayer(id));
                const afkPlayers = afks.map(id => room.getPlayer(id));
                
                let message = 'Queue Status:\n';
                message += 'Non-AFK Players (' + nonAfkPlayers.length + '): ' + 
                    nonAfkPlayers.map(p => p.name).join(', ') + '\n';
                message += 'AFK Players (' + afkPlayers.length + '): ' + 
                    afkPlayers.map(p => p.name).join(', ');
                
                room.sendAnnouncement(message, player.id);
                return false;

            case 'setadmin':
                if (auth !== OWNER_AUTH) {
                    room.sendAnnouncement('You are not authorized to use this command.', player.id);
                    return false;
                }
                
                // Check if a player was mentioned
                if (args.length === 0) {
                    room.sendAnnouncement('Please mention a player: !setadmin @player', player.id);
                    return false;
                }
                
                // Get the mentioned player
                const targetPlayer = room.getPlayerList().find(p => p.name === args[0].replace('@', ''));
                targetPlayerAuth = getPlayerAuthById(targetPlayer.id);
                if (!targetPlayer) {
                    room.sendAnnouncement('Player not found.', player.id);
                    return false;
                }
                
                console.log(targetPlayerAuth);

                // Make the API call to set admin
                fetch(`${API_URL}/set-admin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        auth: targetPlayerAuth
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        room.sendAnnouncement(`${targetPlayer.name} is now an admin.`);
                        room.setPlayerAdmin(targetPlayer.id, true);
                    } else {
                        room.sendAnnouncement('Failed to set admin status.', player.id);
                    }
                })
                .catch(err => {
                    console.error('Error setting admin:', err);
                    room.sendAnnouncement('Error setting admin status.', player.id);
                });
                
                return false;

            default:
                room.sendAnnouncement(`Unknown command: ${command}. Type !help for available commands.`);
                return false;
        }
    }
    return true; // Allow normal messages to be shown in chat
}