// routes/expense.js

const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

// GET all expenses
router.get('/expenses', expenseController.getAllExpenses);

// POST a new expense
router.post('/expenses', expenseController.createExpense);

// DELETE an expense by ID
router.delete('/expenses/:id', expenseController.deleteExpense);

// PUT (update) an expense by ID (Bonus task)
router.put('/expenses/:id', expenseController.updateExpense);

module.exports = router;
