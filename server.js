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
  const { name, auth, ip } = req.body;

  try {
    await pool.query(
      'INSERT INTO players(name, auth, ip) VALUES($1, $2, $3)',
      [name, auth, ip]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error('Database error:', err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
