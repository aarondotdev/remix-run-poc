import axios from 'axios';
import { GetRequestConfigType } from './resource-types';

export const fetchData = async (url: string, config?: GetRequestConfigType) => {
    try {
        const response = await axios({
            url,
            method: config?.method || 'GET',
            ...(config as any)
        });

        if (response.status !== 200) {
            throw new Error(
                `Request failed with status ${response.status}: ${response.statusText}`
            );
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data. `Please try again later.');
    }
};


export const getHeaders = (accessToken: string): GetRequestConfigType => ({
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    },
});