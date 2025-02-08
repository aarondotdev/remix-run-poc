import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { authenticator } from "~/services/auth";


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