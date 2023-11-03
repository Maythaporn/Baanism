const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
var jwt = require("jsonwebtoken");
var secret = "baanism-login";
const multer = require('multer');
var jwt = require("jsonwebtoken");
var secret = "baanism-login";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345678",
  database: "Baanism",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

app.get("/getQuestion", (req, res) => {
  db.query(`SELECT * FROM questions`, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล");
    } else {
      res.send(result);
    }
  });
});

app.get("/getSubquestion/:id", (req, res) => {
  const qId = req.params.id;
  db.query(
    `SELECT * FROM sub_questions WHERE question_id LIKE ?`,
    [qId],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล");
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getOption:index/:id", (req, res) => {
  const id = req.params.id;
  const index = req.params.index;
  db.query(
    `SELECT * FROM options${index} WHERE sub_question_id LIKE ?`,
    [id],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล");
      } else {
        res.send(result);
      }
    }
  );
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

app.post("/delete-adminproject", (req, res) => {
  const projectId = req.body.projectId;

  // Use the projectId in a SQL DELETE query to remove the project from the database.
  db.query(
    "DELETE FROM admin_project WHERE id = ?",
    [projectId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.status(200).json({ message: "Project deleted successfully" });
    }
  );
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
  db.query("SELECT * FROM `project` WHERE `id` = ?", [id], (err, result) => {
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
  });
});

app.get("/project_admin", (req, res) => {
  db.query("SELECT * FROM `project`", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // ถ้าไม่พบข้อมูลในตาราง "project"
    if (result.length === 0) {
      return res.status(404).send("Project data not found");
    }

    // ถ้าพบข้อมูล ส่งผลลัพธ์กลับให้กับไคลเอนต์ในรูปแบบ JSON
    res.send(result);
  });
});

app.get("/project_adminID", (req, res) => {
  const id = req.query.id; // Change this to use req.query.id to retrieve the query parameter

  console.log("id : " + id);
  db.query("SELECT * FROM `admin_project` WHERE id=?;", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const users = result.map((user) => ({
      id: user.id,
      project_name: user.project_name,
      developer: user.developer,
      provinces: user.provinces,
      district: user.district,
      subdistrict: user.subdistrict,
      address: user.address,
      zipcode: user.zipcode,
      img: user.img,
      // Add more properties as needed
    }));

    // Send the list of users as a JSON response
    console.log(users);
    res.send(users);
  });
});

app.post("/edit_adminproject", (req, res) => {
  const {
    id,
    project_name,
    developer,
    address,
    provinces,
    district,
    subdistrict,
    img,
    zipcode,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `admin_project` SET `project_name` = ?, `developer` = ?, `provinces` = ?, `district` = ?, `subdistrict` = ?, `address` = ?, `zipcode` = ?, `img` = ? WHERE id=?;",
      [
        project_name,
        developer,
        provinces,
        district,
        subdistrict,
        address,
        zipcode,
        img,
        id,
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
    id,
  } = req.body;

  console.log(project_type);
  console.log(id);

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
        id,
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
  const role = req.body.role;

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
                "INSERT INTO `users` (`first_name`, `last_name`, `phone_number`, `email`, `password`,`password_date`,role) VALUES (?,?,?,?,?,?,?)",
                [first_name, last_name, phone_number, email, hash, currentDate, role],
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
    etc,
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
        etc,
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

app.get("/getuserImage", (req, res) => {
  const { phone_number } = req.query;

  // Fetch the user's image from the database based on their phone number
  db.query(
    "SELECT img FROM users_info WHERE phone_number = ?",
    [phone_number],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }

      if (result.length === 0) {
        return res.status(404).send("Image not found");
      }

      // Retrieve and send the image data as a response
      const image = result[0];

      res.send(image);
    }
  );
});

app.post("/updateImage", (req, res) => {
  const { img, phone_number } = req.body;
  console.log("img " + img);
  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `users_info` SET `img`= ? WHERE `phone_number`= ? ",
      [img, phone_number],
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

app.post("/addproject", (req, res) => {
  const {
    project_name,
    developer,
    provinces,
    district,
    subdistrict,
    address,
    zipcode,
    img,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "INSERT INTO `admin_project`(`project_name`, `developer`, `provinces`, `district`, `subdistrict`, `address`, `zipcode`, `img`) VALUES (?,?,?,?,?,?,?,?); ",
      [
        project_name,
        developer,
        provinces,
        district,
        subdistrict,
        address,
        zipcode,
        img,
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

app.get("/getadminproject", (req, res) => {
  db.query("SELECT * FROM `admin_project`", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    const users = result.map((user) => ({
      id: user.id,
      project_name: user.project_name,
      developer: user.developer,
      provinces: user.provinces,
      district: user.district,
      subdistrict: user.subdistrict,
      address: user.address,
      zipcode: user.zipcode,
      img: user.img,

      // Add more properties as needed
    }));

    // Send the list of users as a JSON response
    console.log(users);
    res.send(users);
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
        return res.status(500).send("เซิฟพัง");
      }
      if (results.length === 0) {
        return res.status(401).send("Invalid phone number or password");
      }
      const user = results[0];
      // Compare the provided password with the hashed password from the database
      bcrypt.compare(password, user.password, (hashErr, passwordMatch) => {
        // this line -------------------------------------------------------------

        if (hashErr) {
          console.log(hashErr);
          return res.status(500).send("Internal server error");
        }
        if (!passwordMatch) {
          return res.status(401).send("Invalid phone number or password");
        } else {
          // Admin login
          if (user.role === "admin") {
            const token = jwt.sign(
              {
                email: user.email,
                role: user.role,
                phone_number: user.phone_number,
              },
              secret,
              { expiresIn: "1h" }
            );
            return res.status(200).json({ token, redirectTo: "/admin" });
          }

          // User login
          if (user.role === "user") {
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
                  const token = jwt.sign(
                    {
                      email: user.email,
                      role: user.role,
                      phone_number: user.phone_number,
                    },
                    secret,
                    { expiresIn: "1h" }
                  );
                  return res.status(200).json({ token, redirectTo: "/user" });
                } else {
                  const token = jwt.sign(
                    {
                      email: user.email,
                      role: user.role,
                      phone_number: user.phone_number,
                    },
                    secret,
                    { expiresIn: "1h" }
                  );
                  return res
                    .status(200)
                    .json({ token, redirectTo: "/userprofile" });
                }
              }
            );
          }
        }
      });
    }
  );
});

app.post('/authen', (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.role.toLowerCase() === "admin") {
      res.json({ status: "ok", role: "admin" });
    }
    if (decoded.role.toLowerCase() === "user") {
      res.json({ status: "ok", role: "user" });
    } else {
      res.json({ status: "fail" });
    }
  } catch (error) {
    res.status(401).json({ status: "fail", message: "Invalid token" });
  }
});
app.get("/homecontent", (req, res) => {
  db.query("SELECT * FROM content ORDER BY id DESC", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/homecontent/:id", (req, res) => {
  const contentId = req.params.id;
  db.query("SELECT * FROM content WHERE id = ?", [contentId], (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const contentData = result[0];
      res.json(contentData);
    }
  });
});

app.delete("/deletecontent/:id", (req, res) => {
  const dId = req.params.id;
  db.query("DELETE FROM content WHERE id = ?", dId, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/edit_homecontent", upload.single('image'), (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const caption = req.body.caption
  const info = req.body.info
  const image = req.file.filename

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    db.query(
      "UPDATE `content` SET `title` = ?, `img` = ?, `caption` = ?, `info` = ? WHERE id=?;",
      [
        title,
        image,
        caption,
        info,
        id,
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



app.post('/addcontent', upload.single('image'), (req, res) => {
  const cTitle = req.body.title
  const cCaption = req.body.caption
  const cInfo = req.body.info
  const cImage = req.file.filename
  db.query("INSERT INTO content (title, img, caption, info) VALUES(?,?,?,?)", [cTitle, cImage, cCaption, cInfo], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json("Add Content Success")
    }
  })
})

app.listen("3001", () => {
  console.log("Server is running on port 3001");

  bcrypt.hash("1234", saltRounds, (hashErr, hash) => {
    if (hashErr) {
      console.log(hashErr);
      res.status(500).send("Internal server error");
    } else {
      // Insert the new user into the database with the hashed password
      const currentDate = new Date().toLocaleDateString();
      console.log("Date : " + currentDate);
      // console.log("Password Admin : " + hash);
    }
  });
});
