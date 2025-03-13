export interface Definition {
    definition: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
}

export interface WordData {
    word: string;
    meanings: Meaning[];
} 