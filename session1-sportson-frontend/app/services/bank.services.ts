import { fetchAPI } from "../lib/api";
import { Bank } from "../types";

export const getAllBank = async (): Promise<Bank[]> => {
    const res = await fetchAPI<Bank[]>("/banks");
    return res;
}