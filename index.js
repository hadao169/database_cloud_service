const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const dbPath = process.env.DATABASE_PATH || "./my_finance_tracking_app.db"; // Default to local if not set
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Could not connect to SQLite database", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.each("SELECT * FROM User;", (err, row) => {
    if (err) {
      console.error("Error fetching data", err);
    } else {
      console.log(row);
    }
  });
});
