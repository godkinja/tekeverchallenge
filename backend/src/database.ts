import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, email TEXT, phone TEXT, balance REAL)");
    db.run("CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, `from` INTEGER, `to` INTEGER, amount INTEGER, date INTEGER, FOREIGN KEY(`from`) REFERENCES users(id), FOREIGN KEY(`to`) REFERENCES users(id))");

    const addUser = db.prepare("INSERT INTO users (name, surname, email, phone, balance) VALUES (?, ?, ?, ?, ?)");
    addUser.run("António", "Miranda", "antonio.miranda@tekever.com", "912345678", 1500.00);
    addUser.run("Sara", "Augusto", "sara.augusto@tekever.com", "923456781", 1000.00);
    addUser.run("Ronilton", "Neves", "ronilton.neves@tekever.com", "934567812", 500.00);
    addUser.finalize();
});

export default db;
