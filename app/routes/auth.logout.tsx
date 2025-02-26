import { ActionFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "@/services/session";

export let action: ActionFunction = async ({ request }) => {
    let session = await getSession(request.headers.get("Cookie"));
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
};