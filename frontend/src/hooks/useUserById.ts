import { useQuery } from "react-query";
import { getUser } from "../services/users";

export default function useUserById(id: number) {
    return useQuery(["user", id], () => getUser(id));
}
