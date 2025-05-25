// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: 'postgresql://abdizhamiyev:gONSMeTxZEGuXptgkVYArmk2YRJ1WcUQ@dpg-d0phq53uibrs73fsasmg-a.frankfurt-postgres.render.com/haxball',
  ssl: {
    rejectUnauthorized: false
  }
});

// Example endpoint: logs player join
app.post('/player-join', async (req, res) => {
  const { name, auth } = req.body;
  if (!auth || !name) {
    return res.status(400).json({ error: 'Missing name or auth' });
  }

  try {
    // Insert player name if not exists (ignore duplicates)
    await pool.query(
      `INSERT INTO player_names (player_id, name)
       VALUES (
         (SELECT id FROM players WHERE auth = $1),
         $2
       )
       ON CONFLICT DO NOTHING`,
      [auth, name]
    );
    

    // Upsert player auth with last_joined_at = now()
    await pool.query(
      `INSERT INTO players (auth, last_joined_at) VALUES ($1, NOW())
       ON CONFLICT (auth) DO UPDATE SET last_joined_at = NOW()`,
      [auth]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

// Get player names by auth
app.get('/player-names/:auth', async (req, res) => {
  const { auth } = req.params;
  
  try {
    const result = await pool.query(
      `SELECT DISTINCT pn.name 
       FROM player_names pn
       JOIN players p ON p.id = pn.id
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
