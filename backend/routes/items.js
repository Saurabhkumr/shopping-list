import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all items (exclude soft-deleted)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items WHERE deletedAt IS NULL ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD new item
router.post("/", async (req, res) => {
  try {
    const { name, quantity, category, description } = req.body;

    const result = await pool.query(
      `INSERT INTO items (name, quantity, category, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, quantity || 1, category || "General", description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, category, purchased, description } = req.body;

    const result = await pool.query(
      `UPDATE items 
       SET name = COALESCE($1, name), 
           quantity = COALESCE($2, quantity), 
           category = COALESCE($3, category), 
           purchased = COALESCE($4, purchased),
           description = COALESCE($5, description)
       WHERE id = $6 AND deletedAt IS NULL
       RETURNING *`,
      [name, quantity, category, purchased, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found or deleted" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SOFT DELETE item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE items SET deletedAt = CURRENT_TIMESTAMP 
       WHERE id = $1 AND deletedAt IS NULL
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Item not found or already deleted" });
    }

    res.json({ message: `${result.rows[0].name} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
