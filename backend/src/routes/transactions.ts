import { Router } from "express";
import * as Transactions from "../controllers/transactions.js";

const router = Router();

router.get("/", async (req, res) => {

    const transactions = await Transactions.getTransactions();

    res.json(transactions);

});

router.post("/", async (req, res) => {

    try {

        const { amount, from, to } = req.body;

        if (!amount || !from || !to) {
            res.status(400).json({ error: "Invalid body" });
            return
        }

        const newTransaction = await Transactions.createTransaction({

            from: from,

            to: to,

            amount: amount

        });

        res.json(newTransaction);

    } catch (error: any) {

        res.status(500).json({ error: error.message });

    }

});

export default router;
