import { useQuery } from "react-query";
import { getTransactions } from "../services/transactions";

export default function useTransactions() {
    return useQuery("transactions", getTransactions);
}
