const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345678",
  database: "Baanism",
});

app.get("/userprofile", (req, res) => {
  const { phone_number } = req.query;

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

app.post("/delete-project", (req, res) => {
  const projectId = req.body.projectId;

  // Use the projectId in a SQL DELETE query to remove the project from the database.
  db.query("DELETE FROM project WHERE id = ?", [projectId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Project deleted successfully" });
  });
});


app.get("/project", (req, res) => {
  const { phone_number } = req.query;

  console.log("phone " + phone_number);

  // if (!phone_number) {
  //   return res.status(400).json({ error: "Phone number is required." });
  // }

  // Use the phone_number in the SQL query to retrieve user information
  db.query(
    "SELECT * FROM `project` WHERE `phone_number` = ?",
    [phone_number],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Convert the result (an array of user records) to a list of users
      const users = result.map((user) => ({
        id: user.id,
        status: user.status,
        phone_number: user.phone_number,
        project_type: user.project_type,
        room_type: user.room_type,
        sq_meter: user.sq_meter,
        address: user.address,
        provinces: user.provinces,
        district: user.district,
        subdistrict: user.subdistrict,
        zipcode: user.zipcode,

        // Add more properties as needed
      }));

      // Send the list of users as a JSON response
      res.send(users);
    }
  );
});


app.get("/projectID", (req, res) => {
  const { id } = req.query;

  console.log("ID " + id);

  // Use the phone_number in the SQL query to retrieve user information
  db.query(
    "SELECT * FROM `project` WHERE `id` = ?",
    [id],
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

app.get("/project_admin", (req, res) => {
  db.query("SELECT * FROM `project`", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Convert the result (an array of user records) to a list of users
    const users = result.map((user) => ({
      id: user.id,
      status: user.status,
      phone_number: user.phone_number,
      project_type: user.project_type,
      room_type: user.room_type,
      sq_meter: user.sq_meter,
      address: user.address,
      provinces: user.provinces,
      district: user.district,
      subdistrict: user.subdistrict,
      zipcode: user.zipcode,

      // Add more properties as needed
    }));

    // Send the list of users as a JSON response
    res.send(users);
  });
});


app.post("/updateProject", (req, res) => {
  const {
    project_type,
    room_type,
    address,
    sq_meter,
    provinces,
    district,
    subdistrict,
    zipcode,
    googlelink,
    project_name,
    selectdate,
    date,
    start,
    end,
    etc,
    id
  } = req.body;


  console.log(project_type);
  console.log(id
  );

  const selectdateString = selectdate.join(" , ");
  const start_time = start + " - " + end;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `project` SET project_type=?, room_type=?, address=?, sq_meter=?, provinces=?, district=?, subdistrict=?, zipcode=?,  google_maps=?, project_name=?, dayofavaliable=?, start_date=?, timeofavaliable=?, etc=? WHERE id=?;",
      [
        project_type,
        room_type,
        address,
        sq_meter,
        provinces,
        district,
        subdistrict,
        zipcode,
        googlelink,
        project_name,
        selectdateString,
        date,
        start_time,
        etc,
        id
      ],
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
          return res.status(200).send("Project updated successfully");
        });
      }
    );
  });
});


app.get("/userinfo", (req, res) => {
  const { phone_number } = req.query;

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

const bcrypt = require("bcrypt");
const saltRounds = 10; // The number of salt rounds, higher is more secure

app.post("/createusers", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const password = req.body.password;

  // Check if the phone number already exists in the database
  db.query(
    "SELECT * FROM users WHERE phone_number = ?",
    [phone_number],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal server error");
      } else {
        if (result.length > 0) {
          // Phone number already in use
          res.status(400).send("Phone number already in use");
        } else {
          // Hash the password before inserting it into the database
          bcrypt.hash(password, saltRounds, (hashErr, hash) => {
            if (hashErr) {
              console.log(hashErr);
              res.status(500).send("Internal server error");
            } else {
              // Insert the new user into the database with the hashed password
              const currentDate = new Date().toLocaleDateString();
              console.log("Date : " + currentDate);
              console.log("Password : " + hash);
              db.query(
                "INSERT INTO `users` (`first_name`, `last_name`, `phone_number`, `email`, `password`,`password_date`) VALUES (?,?,?,?,?,?)",
                [first_name, last_name, phone_number, email, hash, currentDate],
                (insertErr, result) => {
                  if (insertErr) {
                    console.log(insertErr);
                    res.status(500).send("Internal server error");
                  } else {
                    res.status(200).send("User added successfully");
                  }
                }
              );
              db.query(
                "INSERT INTO `users_info` (`phone_number`) VALUES (?)",
                [phone_number],
                (insertErr, result) => {
                  if (insertErr) {
                    console.log(insertErr);
                    res.status(500).send("Internal server error");
                  } else {
                    res.status(200).send("User added successfully");
                  }
                }
              );
            }
          });
        }
      }
    }
  );
});

app.post("/createProject", (req, res) => {
  const {
    project_type,
    room_type,
    address,
    sq_meter,
    provinces,
    district,
    subdistrict,
    zipcode,
    phone_number,
    googlelink,
    project_name,
    selectdate,
    date,
    start,
    end,
    etc
  } = req.body;

  const selectdateString = selectdate.join(", ");
  const start_time = start + " - " + end;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "INSERT INTO `project`(project_type,room_type,address,sq_meter, provinces, district,subdistrict, zipcode, phone_number,status,google_maps,project_name,dayofavaliable,start_date,timeofavaliable,etc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ",
      [
        project_type,
        room_type,
        address,
        sq_meter,
        provinces,
        district,
        subdistrict,
        zipcode,
        phone_number,
        "รอการติดต่อกลับ",
        googlelink,
        project_name,
        selectdateString,
        date,
        start_time,
        etc
      ],
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

app.post("/adduserinfo", (req, res) => {
  const { address, provinces, district, zipcode, phone_number } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `users_info` SET `address`= ?,`provinces`= ?,`district`= ?,`zipcode`= ? WHERE`phone_number`= ?  ",
      [address, provinces, district, zipcode, phone_number],
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

app.post("/updatestatus", (req, res) => {
  const { status, id } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `project` SET `status`= ? WHERE `id`= ? ",
      [status, id],
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

app.post("/resetpassword", (req, res) => {
  const { password, phone_number } = req.body;
  const currentDate = new Date().toLocaleDateString();

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    bcrypt.hash(password, saltRounds, (hashErr, hash) => {
      if (hashErr) {
        console.log(hashErr);
        res.status(500).send("Internal server error");
      } else {
        // Insert the new user into the database with the hashed password
        const currentDate = new Date().toLocaleDateString();
        console.log("Date : " + currentDate);
        console.log("Password : " + hash);
        db.query(
          "UPDATE `users` SET `PASSWORD`= ?,`password_date`= ? WHERE `phone_number`= ?  ",
          [hash, currentDate, phone_number],
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
              return res.status(200).send("User reset password successfully");
            });
          }
        );
      }
    });
  });
});

app.post("/project", (req, res) => {
  const { address, provinces, district, zipcode, phone_number } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `users_info` SET `address`= ?,`provinces`= ?,`district`= ?,`zipcode`= ? WHERE`phone_number`= ?  ",
      [address, provinces, district, zipcode, phone_number],
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

app.post("/checkAccount", (req, res) => {
  const { phone_number } = req.body;

  // Check if the provided phone number exists in the database
  db.query(
    "SELECT * FROM users WHERE phone_number = ?",
    [phone_number],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid phone number or password");
      }
      res.status(200).send("/found");
    }
  );
});

app.post("/checkEmail", (req, res) => {
  const { email, phone_number } = req.body;

  // Check if the provided email and phone number match in the database
  db.query(
    "SELECT email FROM users WHERE email = ? AND phone_number = ?",
    [email, phone_number],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }

      if (results.length === 0) {
        return res  
          .status(401)
          .send("Invalid email and phone number combination");
      }
      res.status(200).send("/found");
    }
  );
});

app.post("/getUserEmailByPhoneNumber", (req, res) => {
  const { phone_number } = req.body;

  // ค้นหาในฐานข้อมูลของคุณเพื่อหาอีเมลที่เกี่ยวข้องกับเบอร์โทรศัพท์ที่รับมา
  db.query(
    "SELECT email FROM users WHERE phone_number = ?",
    [phone_number],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const userEmail = result[0].email;

      // ส่งค่าอีเมลกลับเป็น JSON response
      res.json({ email: userEmail });
    }
  );
});

app.post("/login", (req, res) => {
  const { phone_number, password } = req.body;

  // Check if the provided phone number exists in the database
  db.query(
    "SELECT * FROM users WHERE phone_number = ?",
    [phone_number],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid phone number or password");
      }

      const user = results[0];

      // Compare the provided password with the hashed password from the database
      bcrypt.compare(password, user.password, (hashErr, passwordMatch) => {
        if (hashErr) {
          console.log(hashErr);
          return res.status(500).send("Internal server error");
        }

        if (!passwordMatch) {
          return res.status(401).send("Invalid phone number or password");
        }
        const currentDate = new Date().toLocaleDateString();
        const [day, month, year] = currentDate.split("/").map(Number);

        console.log(day + " " + month + " " + year);

        const lastPasswordChangeDate = user.password_date;
        const [lastday, lastmonth, lastyear] = lastPasswordChangeDate
          .split("/")
          .map(Number);

        // calculate
        const total_date = Math.abs(day - lastday);
        const total_month = Math.abs(month - lastmonth) * 31;
        const total_year = Math.abs(year - lastyear) * 365;

        console.log(total_date + total_month + total_year);

        console.log(lastday + " " + lastmonth + " " + lastyear);

        console.log("Date log : " + lastPasswordChangeDate);
        console.log("Date log : " + currentDate);

        if (total_date + total_month + total_year >= 90) {
          // Redirect the user to the password change page
          return res.status(200).send("/changepassword");
        } else {
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
      });
    }
  );
});

app.get('/homecontent', (req, res) => {
  db.query("SELECT * FROM content", (err, result) => {
    if (err) {
      console.error(err)
    }
    else {
      res.json(result)
    }
  })
})

app.get('/homecontent/:id', (req, res) => {
  const contentId = req.params.id
  db.query("SELECT * FROM content WHERE id = ?", [contentId], (err, result) => {
    if (err) {
      console.error(err)
    }
    else {
      const contentData = result[0]
      res.json(contentData)
    }
  })
})

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
