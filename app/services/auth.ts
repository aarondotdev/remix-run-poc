import { Authenticator } from "remix-auth";
import { OAuth2Strategy, CodeChallengeMethod } from "remix-auth-oauth2";
import { API_BASE_URL } from "./actions";
import { json, SessionData } from "@remix-run/node";
import { User } from "./session";



export const authenticator = new Authenticator<User>();

authenticator.use(
  new OAuth2Strategy(
    {
      cookie: {
        name: "cage-oauth",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production" as any,
      }, // Optional, can also be an object with more options
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
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
      const res = await getUser(data)

      const user = {
        id: res.id,
        name: res.name,
        email: res.email
      }

      return {
        ...tokens,
        ...user
      }

    }
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  "cage-oauth"
);


export let getUser = async (tokens: SessionData) => {
  const res = await fetch(`${API_BASE_URL}/user`, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${tokens.access_token}`
    }
  })

  return await res.json()
}

export let getPermissions = async (tokens: SessionData) => {
  const res = await fetch(`${API_BASE_URL}/user/permissions`, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${tokens.access_token}`
    }
  })

  return await res.json()
}