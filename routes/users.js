var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

// Database setup
db.serialize(function() {
  console.log("running");
  db.run("DROP TABLE IF EXISTS users");
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

  let stmt = db.prepare("INSERT INTO users (username, password) VALUES (?,?)");
  for (let i = 0; i < 2; i++) {
    stmt.run(`test_${i}`, 'password')
  }
  stmt.finalize();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM users", function(err, rows) {
    userResponse(rows, res);
  });
});

router.post('/signup', function(req, res, next) {
});

function userResponse(users, res) {
  res.json(users);
}

module.exports = router;
