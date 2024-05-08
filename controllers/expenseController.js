// controllers/expenseController.js

const Expense = require('../models/Expense');

// Controller functions
exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

exports.createExpense = async (req, res, next) => {
  try {
    const { description, amount, date } = req.body;
    const newExpense = await Expense.create({ description, amount, date });
    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    await Expense.destroy({ where: { id: expenseId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Update an expense (Bonus task)
exports.updateExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    const { description, amount, date } = req.body;
    const expenseToUpdate = await Expense.findByPk(expenseId);
    if (!expenseToUpdate) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    expenseToUpdate.description = description;
    expenseToUpdate.amount = amount;
    expenseToUpdate.date = date;
    await expenseToUpdate.save();
    res.json(expenseToUpdate);
  } catch (error) {
    next(error);
  }
};
