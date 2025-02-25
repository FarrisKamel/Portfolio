import { useState, useEffect } from 'react';

const useFetchData = (url, useFallback) => { 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (useFallback){
                console.log("Fallback active, skipping fetch request");
                setLoading(false);
                return;                             // Stop fetching if fallback is active
            }
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch data');
                
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, useFallback]); // Re-fetch data if URL changes

    return { data, loading, error };
};

export default useFetchData;

