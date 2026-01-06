import { Request, Response } from 'express';
import { initDB } from '../config/db.js';

export const createItem = async (req: Request, res: Response) => {
  const { name, description, category } = req.body;
  const db = await initDB();
  const result = await db.run(
    'INSERT INTO items (name, description, category) VALUES (?, ?, ?)',
    [name, description, category]
  );
  res.status(201).json({ id: result.lastID, name, description, category });
};

export const getItems = async (req: Request, res: Response) => {
  const { category } = req.query;
  const db = await initDB();
  
  let query = 'SELECT * FROM items';
  const params: any[] = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  const items = await db.all(query, params);
  res.json(items);
};

export const getItemById = async (req: Request, res: Response) => {
  const db = await initDB();
  const item = await db.get('SELECT * FROM items WHERE id = ?', [req.params.id]);
  item ? res.json(item) : res.status(404).json({ error: 'Not found' });
};

export const updateItem = async (req: Request, res: Response) => {
  const { name, description, category } = req.body;
  const db = await initDB();
  const result = await db.run(
    'UPDATE items SET name = ?, description = ?, category = ? WHERE id = ?',
    [name, description, category, req.params.id]
  );
  result.changes ? res.json({ message: 'Updated' }) : res.status(404).json({ error: 'Not found' });
};

export const deleteItem = async (req: Request, res: Response) => {
  const db = await initDB();
  const result = await db.run('DELETE FROM items WHERE id = ?', [req.params.id]);
  result.changes ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
};