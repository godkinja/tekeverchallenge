import { User, UserCreate, UserUpdate } from "../types/user";

export async function createUser(user: UserCreate): Promise<void> {

    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

}

export async function getUsers(): Promise<User[]> {

    const response = await fetch("http://localhost:3000/users");

    const users = await response.json();

    return users;

}

export async function getUser(id: number): Promise<User> {

    const response = await fetch(`http://localhost:3000/users/${id}`);

    const user = await response.json();

    return user;

}

export async function updateUser(id: number, userData: UserUpdate): Promise<void> {

    await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });

}
