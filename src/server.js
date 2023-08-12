const process = require('dotenv').config();
import express from 'express';
const app = express();
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
});

app.get('/api/data', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM your_table');
        const data = result.rows;
        client.release();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create
app.post('/api/items', async (req, res) => {
    const { name, description } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        const newItem = result.rows[0];
        client.release();
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read
app.get('/api/items', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM items');
        const items = result.rows;
        client.release();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update
app.put('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    const { name, description } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, itemId]
        );
        const updatedItem = result.rows[0];
        client.release();
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete
app.delete('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'DELETE FROM items WHERE id = $1 RETURNING *',
            [itemId]
        );
        const deletedItem = result.rows[0];
        client.release();
        res.json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
