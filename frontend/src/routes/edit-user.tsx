import { useParams, useNavigate, Link } from "react-router-dom";
import { useReducer, useEffect } from "react";
import { UserUpdate } from "../types/user";
import { updateUser } from "../services/users";
import useUserById from "../hooks/useUserById";

const initialState = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    balance: 0,
};

function reducer(state: any, action: any) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload,
            };
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };
        default:
            return state;
    }
}

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useUserById(parseInt(id!));

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (data) {
            dispatch({ type: "SET_USER", payload: data });
        }
    }, [data]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const userupdate: UserUpdate = {
            name: state.name,
            surname: state.surname,
            email: state.email,
            phone: state.phone,
            balance: state.balance,
        };

        await updateUser(parseInt(id!), userupdate);
        navigate("/users");
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: "UPDATE_FIELD",
            field: event.target.id,
            value: event.target.value,
        });
    }

    return (
        <form
            className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
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
                        value={state.name}
                        onChange={handleChange}
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
                        value={state.surname}
                        onChange={handleChange}
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
                        value={state.email}
                        onChange={handleChange}
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
                        value={state.phone}
                        onChange={handleChange}
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
                        value={state.balance}
                        onChange={handleChange}
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
                    Save Changes
                </button>
            </div>
        </form>
    );
}
