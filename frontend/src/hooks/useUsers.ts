import { useQuery } from "react-query";
import { getUsers } from "../services/users";

export default function useUsers() {
    return useQuery("users", getUsers);
}
