const transactionModel = require('../models/transactionModel');
const moment = require('moment');


const getAllTransaction = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body
        // console.log("fkjdfhlaskfd",req.body);
        const transactionsTillNow = await transactionModel.find({
            ...(frequency !== "custom"
                ? {
                    date: {
                        $gt: moment().subtract(Number(frequency), "d").toDate(),
                    },
                }
                : {
                    date: {
                        $gte: selectedDate[0],
                        $lte: selectedDate[1],
                    },
                }),
            userid: req.body.userid,
            ...(type !== 'all' && { type })
        })
        res.status(200).json(transactionsTillNow);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const editTransaction = async (req, res) => {
    try {
        console.log("edit", req.body);
        const data = await transactionModel.findOneAndUpdate({ _id: req.body.transactionId },
            req.body.payload)
        console.log(req.body);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const deleteTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transactionId })
        res.status(200).send('Transaction Deleted!')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction created successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { getAllTransaction, addTransaction, editTransaction, deleteTransaction };