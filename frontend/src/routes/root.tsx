import { Link } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div className="flex justify-center items-center text-3xl mt-10">
                Tekever Challenge by Rafael Raimundo - 2024
            </div>
            <div className="flex justify-center items-center mt-[200px]">
                <div className="flex space-x-4">
                    <Link
                        to="/users"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Users
                    </Link>
                    <Link
                        to="/transactions"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Transactions
                    </Link>
                </div>
            </div>
        </>
    );
}
