import db from "../database.js";

export type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    balance: number;
};

export type UserCreate = Omit<User, "id">;

export type UserUpdate = Omit<Partial<User>, "id">;

export async function createUser(user: UserCreate): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO users (name, surname, email, phone, balance) VALUES (?, ?, ?, ?, ?)",
            [user.name, user.surname, user.email, user.phone, user.balance],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

export async function getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", (err, rows: User[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export async function getUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row: User) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

export async function updateUser(id: number, user: UserUpdate): Promise<void> {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(user);
        const values = Object.values(user);
        const set = keys.map((key) => `${key} = ?`).join(", ");
        db.run(`UPDATE users SET ${set} WHERE id = ?`, [...values, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function deleteUser(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
