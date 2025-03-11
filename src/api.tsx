import axios from "axios";

export async function getDictionary(word: string) {
    try {
        const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}