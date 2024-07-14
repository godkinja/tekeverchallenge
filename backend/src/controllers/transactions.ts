import db from "../database.js";
import { getUserById } from "./users.js";

export type Transaction = {
    id: number;
    from: number;
    to: number;
    amount: number;
    date: number;
};

export type TransactionResponse = {
    id: number;
    from: number;
    to: number;
    fromUserName: string;
    toUserName: string;
    amount: number;
    date: number;
};

export type TransactionCreate = Omit<Transaction, "id" | "date">;

export async function createTransaction(transaction: TransactionCreate): Promise<Transaction> {
    return new Promise(async (resolve, reject) => {

        if (transaction.from === transaction.to) {
            reject("Cannot transfer to the same account");
            return;
        }

        const [fromData, toData] = await Promise.allSettled([
            getUserById(transaction.from),
            getUserById(transaction.to)
        ]);

        if (fromData.status === "rejected") {
            reject("User with id " + transaction.from + " not found");
            return;
        }

        if (toData.status === "rejected") {
            reject("User with id " + transaction.to + " not found");
            return;
        }

        if (fromData.value.balance < transaction.amount) {
            reject("Insufficient funds");
            return;
        }

        db.run("UPDATE users SET balance = balance - ? WHERE id = ?", [transaction.amount, transaction.from]);
        db.run("UPDATE users SET balance = balance + ? WHERE id = ?", [transaction.amount, transaction.to]);

        db.run(
            "INSERT INTO transactions (`from`, `to`, `amount`, date) VALUES (?, ?, ?, ?)",
            [transaction.from, transaction.to, transaction.amount, Date.now()],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    const lastId = this.lastID;
                    db.get("SELECT * FROM transactions WHERE id = ?", [lastId], (err, row: Transaction) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(row);
                        }
                    });
                }
            }
        );
    });
}

export async function getTransactions(): Promise<TransactionResponse[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT 
    transactions.*,
    fromUser.name AS fromUserName,
    toUser.name AS toUserName
FROM 
    transactions
JOIN 
    users AS fromUser 
    ON transactions.\`from\` = fromUser.id
JOIN 
    users AS toUser 
    ON transactions.\`to\` = toUser.id;`, (err, rows: TransactionResponse[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
