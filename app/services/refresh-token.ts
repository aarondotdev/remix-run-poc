export let refreshAccessToken = async (token) => {
    // if (process.env.NODE_ENV === "development") return token
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/token`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID
            } as { grant_type: string; refresh_token: string; client_id: string })
        });

        const refreshedTokens = await response.json();

        //console.log('UNIQUE RESPONSE', refreshedTokens);

        if (!response.ok) {
            throw refreshedTokens;
        }

        //console.log("Token refreshed successfully.")
        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Math.floor(Date.now() + 86400000), // expires_in is usually in seconds
            refreshToken: refreshedTokens.refresh_token
        };
    } catch (error) {
        console.error('Error refreshing access token', error);

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        };
    }
}
