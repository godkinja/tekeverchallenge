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
