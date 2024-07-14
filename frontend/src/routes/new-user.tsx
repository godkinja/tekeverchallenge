import { useNavigate, Link } from "react-router-dom";
import { UserCreate } from "../types/user";
import { createUser } from "../services/users";

export default function NewUser() {
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const user: UserCreate = {
            name: form.get("name") as string,
            surname: form.get("surname") as string,
            email: form.get("email") as string,
            phone: form.get("phone") as string,
            balance: parseInt(form.get("balance") as string),
        };

        await createUser(user);

        navigate("/users");
    }

    return (
        <form
            className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold mb-4">New User</h2>
            <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        First Name
                    </label>
                    <input
                        className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="First Name"
                        id="name"
                        name="name"
                        required
                    />
                </div>
                <div className="mb-4 w-1/2">
                    <label
                        htmlFor="surname"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Surname
                    </label>
                    <input
                        className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Surname"
                        id="surname"
                        name="surname"
                        required
                    />
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div className="mb-4 w-1/2">
                    <label
                        htmlFor="phone"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Phone Number
                    </label>
                    <input
                        className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        type="tel"
                        placeholder="Phone Number"
                        id="phone"
                        name="phone"
                        required
                    />
                </div>
            </div>
            <div className="mb-4 w-1/2">
                <label
                    htmlFor="balance"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Balance
                </label>
                <div className="flex items-center">
                    <input
                        className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        type="number"
                        placeholder="Balance"
                        id="balance"
                        name="balance"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <Link
                    to="/users"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Home
                </Link>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Create User
                </button>
            </div>
        </form>
    );
}
