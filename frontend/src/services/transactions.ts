import { Transaction, TransactionCreate, TransactionResponse } from "../types/transaction";

export async function createTransaction(transaction: TransactionCreate): Promise<Transaction> {

    const response = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction)
    });

    const createdTransaction = await response.json();

    return createdTransaction;

}

export async function getTransactions(): Promise<TransactionResponse[]> {

    const response = await fetch("http://localhost:3000/transactions");

    const transactions = await response.json();

    return transactions;

}
