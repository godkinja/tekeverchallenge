import { useNavigate, Link } from "react-router-dom";
import { TransactionCreate } from "../types/transaction";
import { createTransaction } from "../services/transactions";
import useUsers from "../hooks/useUsers";

export default function NewTransaction() {
    const { data } = useUsers();

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const transaction: TransactionCreate = {
            from: Number(form.get("from")),
            to: Number(form.get("to")),
            amount: Number(form.get("amount")),
        };

        await createTransaction(transaction);

        navigate("/transactions");
    }

    return (
        <form
            className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold mb-4">New Transaction</h2>
            <div className="mb-4">
                <label
                    htmlFor="from"
                    className="block text-gray-700 font-bold mb-2"
                >
                    From
                </label>
                <select
                    name="from"
                    id="from"
                    className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    required
                >
                    {data?.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="to"
                    className="block text-gray-700 font-bold mb-2"
                >
                    To
                </label>
                <select
                    name="to"
                    id="to"
                    className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    required
                >
                    {data?.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="amount"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Amount
                </label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="flex justify-between">
                <Link
                    to="/transactions"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Back
                </Link>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
