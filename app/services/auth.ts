import { OAuth2Strategy, CodeChallengeMethod } from "remix-auth-oauth2";

export const authenticator = new Authenticator<User>();

authenticator.use(
  new OAuth2Strategy(
    {
      cookie: "cage-oauth", // Optional, can also be an object with more options
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      //   clientSecret: CLIENT_SECRET,

      authorizationEndpoint: "https://provider.com/oauth2/authorize",
      tokenEndpoint: "https://provider.com/oauth2/token",
      redirectURI: "https://example.app/auth/callback",

      tokenRevocationEndpoint: "https://provider.com/oauth2/revoke", // optional

      scopes: ["openid", "email", "profile"], // optional
      codeChallengeMethod: CodeChallengeMethod.S256, // optional
    },
    async ({ tokens, request }) => {
      // here you can use the params above to get the user and return it
      // what you do inside this and how you find the user is up to you
      return await getUser(tokens, request);
    }
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  "provider-name"
);
