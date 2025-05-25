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
      `INSERT INTO player_names (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`,
      [name]
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
