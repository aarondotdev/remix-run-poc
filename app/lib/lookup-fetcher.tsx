import { useState, } from 'react';
import { useUserContext } from '@/context/user-provider';
import normalizer from './json-normalizer';

interface UseLookupFetcherOptions {
    headers?: Record<string, string>;
}

type LookupData = Record<string, any>;

export const useLookupFetcher = ({ headers }: UseLookupFetcherOptions = {}) => {
    const [lookupData, setLookupData] = useState<LookupData>({});
    const [loadingKeys, setLoadingKeys] = useState<Record<string, boolean>>({});
    const user = useUserContext()
    const [error, setError] = useState<string | undefined>();


    const fetchLookup = async (url: string, key: string) => {
        if (lookupData[key]) {
            return;
        }

        setLoadingKeys((prev) => ({ ...prev, [key]: true }));

        try {
            const response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.access_token}`,
                    ...headers
                }
            });

            if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);

            const data = await response.json();
            const normalizedData = normalizer(data);

            setLookupData((prevData) => ({
                ...prevData,
                [key]: normalizedData
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoadingKeys((prev) => ({ ...prev, [key]: false }));
        }
    };

    return {
        setLookupData,
        fetchLookup,
        lookupData,
        error,
        isLookupLoading: loadingKeys,
        setLoadingKeys,
        setError
    };
};
