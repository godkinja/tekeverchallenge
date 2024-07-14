import express from "express";
import cors from "cors";

import UsersRouter from "./routes/users.js";
import TransactionsRouter from "./routes/transactions.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", UsersRouter);
app.use("/transactions", TransactionsRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
