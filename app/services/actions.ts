import { Session } from "@remix-run/node";

async function authenticate(
  request: Request,
  session: Session,
  headers = new Headers()
) {
  try {
    // get the auth data from the session
    let accessToken = session.get("accessToken");

    // if not found, redirect to login, this means the user is not even logged-in
    if (!accessToken) throw redirect("/login");

    // if expired throw an error (we can extends Error to create this)
    if (new Date(session.get("expirationDate")) < new Date()) {
      throw new AuthorizationError("Expired");
    }

    // if not expired, return the access token
    return accessToken;
  } catch (error) {
    // here, check if the error is an AuthorizationError (the one we throw above)
    if (error instanceof AuthorizationError) {
      // refresh the token somehow, this depends on the API you are using
      let { accessToken, refreshToken, expirationDate } = await refreshToken(
        session.get("refreshToken")
      );

      // update the session with the new values
      session.set("accessToken", accessToken);
      session.set("refreshToken", refreshToken);
      session.set("expirationDate", expirationDate);

      // commit the session and append the Set-Cookie header
      headers.append("Set-Cookie", await commitSession(session));

      // redirect to the same URL if the request was a GET (loader)
      if (request.method === "GET") throw redirect(request.url, { headers });

      // return the access token so you can use it in your action
      return accessToken;
    }

    // throw again any unexpected error that could've happened
    throw error;
  }
}

export let loader: LoaderFunction = async ({ request }) => {
  // read the session
  let session = await getSession(request);
  // authenticate the request and get the accessToken back
  let accessToken = await authenticate(request, session);
  // do something with the token
  let data = await getSomeData(accessToken);
  // and return the response
  return json(data);
};
