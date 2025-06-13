
import { Router } from 'express';
import { initDB } from '../db';

const router = Router();

router.get('/', async (_, res) => {
  const db = await initDB();
  const employees = await db.all('SELECT * FROM employees');
  res.json(employees);
});

router.post('/', async (req, res) => {
  const { name, email, department, salary } = req.body;
  const db = await initDB();
  await db.run('INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)', [name, email, department, salary]);
  res.status(201).json({ message: 'Employee added' });
});

router.put('/:id', async (req, res) => {
  const { name, email, department, salary } = req.body;
  const db = await initDB();
  await db.run('UPDATE employees SET name = ?, email = ?, department = ?, salary = ? WHERE id = ?', [name, email, department, salary, req.params.id]);
  res.json({ message: 'Employee updated' });
});

router.delete('/:id', async (req, res) => {
  const db = await initDB();
  await db.run('DELETE FROM employees WHERE id = ?', [req.params.id]);
  res.json({ message: 'Employee deleted' });
});

export default router;
