import express from 'express';
import * as todoController from '../controllers/todoController';

export const router = express.Router();

router.get('/', todoController.getAllTodos);
router.post('/add', todoController.addTodo);
router.delete('/delete', todoController.deleteTodo);
router.put('/update', todoController.updateTodo);
router.put('/completed', todoController.completedTodo);
router.put('/incomplete', todoController.incompleteTodo);
