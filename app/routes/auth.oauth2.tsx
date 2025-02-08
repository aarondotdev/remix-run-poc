// import { LoaderFunction, redirect } from "@remix-run/node";
// import { authenticator } from "~/services/auth";


// export let loader: LoaderFunction = async ({ request }) => {
//     console.log(request)
//     let user = await authenticator.authenticate("cage-oauth", request);

//     if (!user) {
//         return redirect("/login");
//     }
//     return redirect("/dashboard");
// };