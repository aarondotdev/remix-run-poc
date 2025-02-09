import { json, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react'
import { getSession } from '~/services/session';

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const data = session.get("user");

    if (!data) {
        return redirect("/login");
    }

    return json({ data });
};


function dashboard() {
    const { data } = useLoaderData<typeof loader>();
    return <></>;
}

export default dashboard