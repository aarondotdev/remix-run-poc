import { Authenticator } from "remix-auth";
import { OAuth2Strategy, CodeChallengeMethod } from "remix-auth-oauth2";
import { API_BASE_URL } from "./actions";
import { json } from "@remix-run/node";

interface User {
  name: string
}

export const authenticator = new Authenticator<User>();

authenticator.use(
  new OAuth2Strategy(
    {
      cookie: {
        name: "cage-oauth",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      }, // Optional, can also be an object with more options
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      //   clientSecret: CLIENT_SECRET,

      authorizationEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/authorize/?prompt=login`,
      tokenEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/token`,
      redirectURI: `${process.env.NEXT_PUBLIC_WEBCLIENT_URL}/auth/oauth2`,
      tokenRevocationEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/token/revoke`, // optional
      // scopes: ["openid", "email", "profile"], // optional
      codeChallengeMethod: CodeChallengeMethod.S256, // optional
    },
    async ({ tokens, request }) => {


      const { data } = tokens
      // here you can use the params above to get the user and return it
      // what you do inside this and how you find the user is up to you
      const res = await getUser(data, request)
      console.log("profile", res)

      const user = await res.json()

      return {
        ...user,
        ...tokens
      }

      // return {
      //   ...tokens,
      //   res
      // }

    }
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  "cage-oauth"
);


export let getUser = async (tokens, request) => {
  const res = await fetch(`${API_BASE_URL}/user`, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${tokens.accessToken}`
    }
  })

  return json(res)
}