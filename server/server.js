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
  const { phone_number } = "admin"; // Retrieve the dynamic phone_number parameter from the URL
  db.query(
    "SELECT `first_name`, `last_name` FROM `users`",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal server error");
      } else {
        res.send(result);
      }
    }
  );
});


app.get("/userprofile", (req, res) => {
  const { phone_number } = req.query;
  console.log("44444444444444444444444");
  console.log("phone " + phone_number);

  if (!phone_number) {
    return res.status(400).json({ error: "Phone number is required." });
  }

  // Use the phone_number in the SQL query to retrieve user information
  db.query(
  "SELECT `first_name`, `last_name` FROM `users` WHERE `phone_number` = ?",
  [phone_number],
  (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];
    
    // Log the user information
    console.log("User found: " + user.first_name + " " + user.last_name);

    // Send the user information as a JSON response
    res.send(user);
  }
);
});

app.get("/userinfo", (req, res) => {
  const { phone_number } = req.query;
  console.log("55555555555555555");
  console.log("phone " + phone_number);

  if (!phone_number) {
    return res.status(400).json({ error: "Phone number is required." });
  }

  // Use the phone_number in the SQL query to retrieve user information
  db.query(
  "SELECT address, provinces, district, zipcode FROM `users_info` WHERE `phone_number` = ?",
  [phone_number],
  (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];
    
    // Log the user information
    console.log("User found: " + user.address + " " + user.provinces);

    // Send the user information as a JSON response
    res.send(user);
  }
);
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

app.post("/createusers", (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?);",
      [first_name, last_name, phone_number, email, password],
      (err, result) => {
        if (err) {
          db.rollback(() => {
            console.log(err);
            return res.status(500).send("Internal server error");
          });
        }

        db.query(
          "INSERT INTO users_info (address, provinces, district, zipcode, phone_number) VALUES (?, ?, ?, ?, ?);",
          [null, null, null, null, phone_number], // You can replace 'null' with actual values
          (err, result) => {
            if (err) {
              db.rollback(() => {
                console.log(err);
                return res.status(500).send("Internal server error");
              });
            }

            db.commit((err) => {
              if (err) {
                db.rollback(() => {
                  console.log(err);
                  return res.status(500).send("Internal server error");
                });
              }
              return res.status(200).send("User added successfully");
            });
          }
        );
      }
    );
  });
});

app.post("/adduserinfo", (req, res) => {
  const { address, provinces, district, zipcode, phone_number } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `users_info` SET `address`= ?,`provinces`= ?,`district`= ?,`zipcode`= ? WHERE`phone_number`= ?  ",
      [ address, provinces, district,zipcode, phone_number],
      (err, result) => {
        if (err) {
          db.rollback(() => {
            console.log(err);
            return res.status(500).send("Internal server error");
          });
        }

        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              console.log(err);
              return res.status(500).send("Internal server error");
            });
          }
          return res.status(200).send("User added successfully");
        });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { phone_number, password } = req.body;

  // Check if the provided phone number and password match a user in the database
  db.query(
    "SELECT * FROM users WHERE phone_number = ? AND password = ?",
    [phone_number, password],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid phone number or password");
      }

      const user = results[0];

      if (user.phone_number.toLowerCase() === "admin") {
        // Direct the user to the admin page
        return res.status(200).send("/admin");
      } else {
        // Check if the user has a zipcode in users_info
        db.query(
          "SELECT zipcode FROM users_info WHERE phone_number = ?",
          [phone_number],
          (err, infoResults) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Internal server error");
            }

            const userInfo = infoResults[0];

            if (!userInfo || userInfo.zipcode === null) {
              // If there is no zipcode in users_info, direct the user to /user
              return res.status(200).send("/user");
            } else {
              // If there is a zipcode, direct the user to /userprofile
              return res.status(200).send("/userprofile");
            }
          }
        );
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
