import { LoaderFunction, redirect } from '@remix-run/node';
import React from 'react'
import { authenticator } from '~/services/auth';

// export let loader: LoaderFunction = async ({ request }) => {
//     let user = await authenticator.authenticate("cage-oauth", request);
//     if (user) return redirect("/dashboard"); // Redirect if user is logged in
//     return null;
// };

function Login() {
    return (
        <div>Login</div>
    )
}

export default Login