// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'abdizhamiyev',
  host: 'localhost',
  database: 'haxball',
  password: 'new_secure_password',
  port: 5432,
});

// Example endpoint: logs player join
app.post('/player-join', async (req, res) => {
  const { name, auth } = req.body;
  if (!auth || !name) {
    return res.status(400).json({ error: 'Missing name or auth' });
  }

  try {
    // Upsert player auth with last_joined_at = now() and get the player ID
    const playerResult = await pool.query(
      `INSERT INTO players (auth, last_joined_at) 
       VALUES ($1, NOW())
       ON CONFLICT (auth) DO UPDATE SET last_joined_at = NOW()
       RETURNING id`,
      [auth]
    );
    
    const playerId = playerResult.rows[0].id;

    // Insert player name if not exists (ignore duplicates)
    await pool.query(
      `INSERT INTO player_names (player_id, name)
       VALUES ($1, $2)
       ON CONFLICT (player_id, name) DO NOTHING`,
      [playerId, name]
    );

    // Player log data record
    await pool.query(
      `INSERT INTO player_logs (player_id, name)
       VALUES ($1, $2)`,
      [playerId, name]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// Set player as admin
app.post('/set-admin', async (req, res) => {
  console.log('Received set-admin request:', req.body); // Add this debug line
  const { auth } = req.body;
  if (!auth) {
    console.log('Missing auth in request'); // Add this debug line
    return res.status(400).json({ error: 'Missing auth', success: false });
  }

  try {
    // First check if player exists
    const playerResult = await pool.query(
      'SELECT id FROM players WHERE auth = $1',
      [auth]
    );

    if (playerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found', success: false });
    }

    // Insert or update admin status
    await pool.query(
      `INSERT INTO admins (auth)
       VALUES ($1)
       ON CONFLICT (auth) DO NOTHING`,
      [auth]
    );
    
    res.json({ success: true });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message, success: false });
  }
});

// Get player names by auth
app.get('/player-names/:auth', async (req, res) => {
  const { auth } = req.params;
  
  try {
    const result = await pool.query(
      `SELECT DISTINCT pn.name 
       FROM player_names pn
       JOIN players p ON p.id = pn.player_id
       WHERE p.auth = $1
       ORDER BY pn.name`,
      [auth]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No names found for this player' });
    }
    
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// Check if player is admin
app.get('/is-admin/:auth', async (req, res) => {
  const { auth } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT EXISTS(SELECT 1 FROM admins WHERE auth = $1) as is_admin',
      [auth]
    );
    
    res.json({ isAdmin: result.rows[0].is_admin });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
