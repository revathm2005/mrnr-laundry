
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Display customers
app.get('/customers', (req, res) => {
    db.query('SELECT * FROM t1', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// Add customer
app.post('/customers', (req, res) => {
    const { name, cell_no, email, address } = req.body;

    const sql = 'INSERT INTO t1 (name, cell_no, email, address) VALUES (?, ?, ?, ?)';

    db.query(sql, [name, cell_no, email, address], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: 'Customer Added Successfully!'
        });
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
