import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { authenticator } from "~/services/auth";
import { getSession, commitSession } from "~/services/session";



export let loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    if (session.has("user")) {
        // Redirect to the home page if they are already signed in.
        return redirect("/dashboard");
    }

    const data = { error: session.get("error") };

    return json(data, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export let action: ActionFunction = async ({ request }) => {
    let user = await authenticator.authenticate("cage-oauth", request);
    if (user) return redirect("/dashboard");
};

function login() {
    return (
        <div>
            <Form method="post">
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default login