var room = HBInit({
    roomName: "My Room",
    maxPlayers: 12, // 4 per team + potential specs
    noPlayer: true,
    public: false,
    token: 'thr1.AAAAAGgzP4Runf45lKAeOg.xfDvmfDCgeY'
});

// Set game rules
room.setScoreLimit(5);
room.setTimeLimit(5);

const API_URL = 'https://serverjs-qc9e.onrender.com';

// Track if game is running
let isGameRunning = false;

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

function isTeamFull(teamId) {
    const players = room.getPlayerList();
    const teamPlayers = players.filter(p => p.team === teamId);
    return teamPlayers.length >= 4;
}

// Check if we can start a game
function checkGameStart() {
    const players = room.getPlayerList();
    
    console.log("Checking game start:", {
        players: players.length,
        isGameRunning: isGameRunning
    });
    
    // Start game if we have 2+ players in teams and no game is running
    if (players.length >= 2 && !isGameRunning) {
        console.log("can start!");
        // Shuffle players into teams
        const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
        
        // Announce game start
        room.sendAnnouncement("Game starting in 20 seconds!");

        // Start the game after 20 seconds
        setTimeout(() => {
            // Split players into two teams
            shuffledPlayers.forEach((player, index) => {
                // Even indices go to red (1), odd to blue (2)
                room.setPlayerTeam(player.id, index % 2 === 0 ? 1 : 2);
            });
            if (!isGameRunning) {  // Double check game hasn't started
                room.startGame();
            }
        }, 3000);  // 20 seconds
    }
}

function checkTeamBalance() {
    const players = room.getPlayerList();
    const redTeam = players.filter(p => p.team === 1);
    const blueTeam = players.filter(p => p.team === 2);
    
    const difference = Math.abs(redTeam.length - blueTeam.length);
    
    if(!isGameRunning) return;

    if(players.length <= 1) {
        isGameRunning = false;
        room.pauseGame(true);
    }

    if (difference >= 2) { // If one team has 2+ more players
        room.pauseGame(true);
        isGameRunning = false;
        room.sendAnnouncement("Game paused: Teams are imbalanced!");
    } else {
        room.pauseGame(false);
        isGameRunning = true;
    }
}

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
    console.log("Checked!")
    checkTeamBalance();
}


function getTeamWithFewerPlayers() {
    const players = room.getPlayerList();
    const redTeam = players.filter(p => p.team === 1);
    const blueTeam = players.filter(p => p.team === 2);
    
    if (redTeam.length < blueTeam.length) {
        return 1; // Red team
    } else {
        return 2; // Blue team
    }
}

function balanceWaitingPlayers() {
    const players = room.getPlayerList();
    const spectators = players.filter(p => p.team === 0);
    
    console.log("Current spectators:", spectators.map(s => s.name));
    
    // If we have an even number of spectators, assign them to teams
    if (spectators.length >= 2 && spectators.length % 2 == 0) {
        spectators.forEach((player, index) => {
            const teamToJoin = getTeamWithFewerPlayers();
            if (!isTeamFull(teamToJoin)) {
                room.setPlayerTeam(player.id, teamToJoin);
            }
        });
    }
}

// Track game state
room.onGameStart = function() {
    console.log("Game started");
    isGameRunning = true;
}

room.onGameStop = function() {
    console.log("Game stopped");
    isGameRunning = false;
    // Check if we can start a new game
    checkGameStart();
}


room.onPlayerJoin = async function(player) {
    const players = room.getPlayerList();

    const alreadyTracked = joinedPlayers.some(p => p.auth === player.auth);

    if (!alreadyTracked) {
        joinedPlayers.push({ id: player.id, auth: player.auth });
    }

    // Optionally: log or use this
    console.log("Currently joined players:", joinedPlayers);
    const spectators = players.filter(p => p.team === 0);
    const redTeam = players.filter(p => p.team === 1);
    const blueTeam = players.filter(p => p.team === 2);

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

    // If game is running, assign player to team with fewer players
    if (isGameRunning) {
        const teamToJoin = getTeamWithFewerPlayers();
        if (teamToJoin == 1 && redTeam.length <= 4) {
            room.setPlayerTeam(player.id, teamToJoin);
        }
        else if (teamToJoin == 2 && blueTeam.length <= 4) {
            room.setPlayerTeam(player.id, teamToJoin);
        }
        
        else if (teamToJoin == 0) {
            balanceWaitingPlayers();
        }
    }

    // Check if we can start a game
    checkGameStart();
    checkTeamBalance();
}

room.onPlayerLeave = function(player) {
    updateAdmins();

    const index = joinedPlayers.findIndex(p => p.id === player.id);
    if (index !== -1) {
        joinedPlayers.splice(index, 1);
    }

    checkTeamBalance();
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
