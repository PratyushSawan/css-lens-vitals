import axios from "axios";
import { useEffect, useState } from "react";

export default function Result({ url }: { url: string }) {
    const [loading, isLoading] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        isLoading(true);
        handleAnalyze(url);
    }, [url])

    const handleAnalyze = async (url: string) => {
        try {
            const responce = await axios.post('/api/analyze', { url: url })
            console.log(responce.data);
        } catch (err) {
            console.log(err)
        }
        isLoading(false);
    }

    return (
        <>
            {
                loading ?
                    (<div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-800">Analysis Result</h2>
                        <p className="text-gray-600 mt-2">Analyzing: {url}</p>
                        {/* Your actual result logic here */}
                    </div>) : (
                        <div className="bg-white shadow-lg rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-800">Analysed Result</h2>
                        </div>
                    )
            }
        </>

    );
}