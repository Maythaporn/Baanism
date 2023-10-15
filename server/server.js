const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root1234",
  database: "Baanism",
});

app.get("/register", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/provinces", (req, res) => {
  // เชื่อมต่อกับ MySQL และดึงข้อมูลจังหวัด

  db.connect();

  const query = "SELECT * FROM `provinces`"; // แก้ไขตามโครงสร้างของตารางในฐานข้อมูลของคุณ
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching provinces:", error);
      res.status(500).json({ error: "Failed to fetch provinces" });
    } else {
      const provinces = results.map((result) => ({
        id: result.id,
        name: result.name_th,
      }));
      res.json(provinces);
      console.log("useeeeeee");
    }
  });

});

app.get("/district", (req, res) => {
  // เชื่อมต่อกับ MySQL และดึงข้อมูลจังหวัด

  db.connect();

  const query = "SELECT * FROM `amphures`"; // แก้ไขตามโครงสร้างของตารางในฐานข้อมูลของคุณ
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching district:", error);
      res.status(500).json({ error: "Failed to fetch provinces" });
    } else {
      const district = results.map((result) => ({
        id: result.id,
        name: result.name_th,
      }));
      res.json(district);
      console.log("useeeeeee");
    }
  });

});

app.post('/createusers', (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  db.query(
    'INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, phone_number, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      return res.status(200).send('User added successfully');
    }
  );
});


app.post('/login', (req, res) => {
  const { phone_number, password } = req.body;

  // Check if the provided phone number and password match a user in the database
  db.query(
    'SELECT * FROM users WHERE phone_number = ? AND password = ?',
    [phone_number, password],
    (err, results) => {
      if (err) {
        console.log(phone_number,password);
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      if (results.length === 0) {
        return res.status(401).send('Invalid phone number or password');
      }
      console.log(results);

      const user = results[0];

      if (user.phone_number.toLowerCase() === 'admin') {
        // Direct the user to the admin page
        return res.status(200).send('/admin');
      } else {
        // Direct the user to the user profile page
        return res.status(200).send('/userprofile');
      }
    }
  );
});


app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
