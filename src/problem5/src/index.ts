import 'dotenv/config'

import express from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from './controllers/itemController.js';

const app = express();
app.use(express.json());

// Routes
app.post('/items', createItem);
app.get('/items', getItems);
app.get('/items/:id', getItemById);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});