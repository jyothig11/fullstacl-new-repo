const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

// ---------------- CREATE CONTACT ----------------
app.post("/contacts", (req, res) => {
    const { name, email, phone } = req.body;
    const sql = "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";
    db.query(sql, [name, email, phone], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error adding contact");
        } else {
            res.send("Contact Added");
        }
    });
});

// ---------------- READ CONTACTS ----------------
app.get("/contacts", (req, res) => {
    const sql = "SELECT * FROM contacts";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching contacts");
        } else {
            res.json(result);
        }
    });
});

// ---------------- UPDATE CONTACT ----------------
app.put("/contacts/:id", (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const sql = "UPDATE contacts SET name=?, email=?, phone=? WHERE id=?";
    db.query(sql, [name, email, phone, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error updating contact");
        } else {
            res.send("Contact Updated");
        }
    });
});

// ---------------- DELETE CONTACT ----------------
app.delete("/contacts/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM contacts WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting contact");
        } else {
            res.send("Contact Deleted");
        }
    });
});

// ---------------- START SERVER ----------------
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
