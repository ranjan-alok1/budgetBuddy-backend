const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//add transaction POST method
router.post('/add-transaction', addTransaction);

//Edit transaction POST method
router.post('/edit-transaction', editTransaction);

//Delete transaction POST method
router.post('/delete-transaction', deleteTransaction);

// get transaction GET method
router.post('/get-transaction', getAllTransaction);

module.exports = router;
