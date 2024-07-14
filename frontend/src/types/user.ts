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
