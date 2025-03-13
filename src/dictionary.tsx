import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import GetDictionary from "./api/api.tsx";
import GetImage from "./api/img.tsx";
import {WordData} from "./api/types.ts";

function Dictionary() {
    const [word, setWord] = useState("");

    const {data: wordData, isLoading: isWordLoading, isError: isWordError, error: wordError} = useQuery<WordData>({
        queryKey: ["wordData", word],
        queryFn: () => GetDictionary(word),
        enabled: word.length > 0,
    });


    const {data: imageData, isLoading: isImageLoading, isError: isImageError, error: imageError} = useQuery({
        queryKey: ["imageData", word],
        queryFn: () => GetImage(word),
        enabled: word.length > 0,
    });

    return (
        <section>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-xl">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">Visual Dictionary</h1>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                        <input
                            type="text"
                            value={word}
                            className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter a word"
                            onChange={(e) => setWord(e.target.value)}
                        />
                        <button
                            className="px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition duration-300"
                        >
                            Search
                        </button>
                    </div>
                    {isWordLoading && <p className="text-gray-400">Loading...</p>}
                    {isWordError && <p className="text-red-500">{wordError?.message}</p>}
                    {isImageLoading && <p className="text-gray-400">Loading image...</p>}
                    {isImageError && <p className="text-red-500">{imageError?.message}</p>}

                    {wordData && imageData && (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-medium text-gray-300">Meaning:</h2>
                                <p className="text-gray-400">
                                    {wordData.meanings[0]?.definitions[0]?.definition || "No meaning found"}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-medium text-gray-300">Related Words:</h2>
                                <ul className="list-disc pl-5 text-gray-400">
                                    {wordData.meanings[0]?.synonyms?.length > 0 ? (
                                        wordData.meanings[0].synonyms.map((synonym: string) => (
                                            <li key={synonym}>{synonym}</li>
                                        ))
                                    ) : (
                                        <li>No related words found</li>
                                    )}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-medium text-gray-300">Image:</h2>
                                <img
                                    src={imageData?.urls?.regular}
                                    alt="Word related image"
                                    className="rounded-lg shadow-md w-full h-auto"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Dictionary;
