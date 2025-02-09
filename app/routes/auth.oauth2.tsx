import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator, getUser } from "~/services/auth";
import { commitSession, getSession } from "~/services/session";




export const loader: LoaderFunction = async ({ request }) => {
    try {
        // Authenticate user using Remix Auth (this handles OAuth callback)
        const { data: tokens } = await authenticator.authenticate("cage-oauth", request);

        // Get current session
        const session = await getSession(request.headers.get("Cookie"));
        const { data: userData } = await getUser(tokens as any)

        console.log("get user response", userData)

        const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email
        }

        const userDetails = {
            ...tokens,
            user
        }

        // Store user data in session
        session.set("user", { ...userDetails } as any);

        return redirect("/dashboard", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch (error) {
        console.error("OAuth Callback Error:", error);
        return redirect("/login");
    }
};
