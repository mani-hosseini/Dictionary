import axios from "axios";
import { WordData } from "./types";

async function GetDictionary(word: string): Promise<WordData> {
    try {
        const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return data[0];
    } catch (error) {
        throw new Error('Failed to fetch word data');
    }
}

export default GetDictionary;