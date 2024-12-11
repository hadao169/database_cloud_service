const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

// Initialize the SQLite database
const db = new sqlite3.Database('./my_finance_tracking_app.db'); // Change this to your database path

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to execute custom SQL queries
app.post('/execute-query', (req, res) => {
  const { query } = req.body; // Get the query from the request body

  if (!query) {
    return res.json({ error: 'Query not provided' });
  }

  // Execute the SQL query
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.json({ error: err.message }); // Return error message if SQL execution fails
    }

    res.json(rows); // Return the rows as a JSON response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
