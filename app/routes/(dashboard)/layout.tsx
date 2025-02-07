import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useMatches } from "@remix-run/react";
import { Sidebar, SidebarProvider } from "~/components/ui/sidebar";
import { authenticator } from "~/services/auth";
import { AppSidebar } from "./components/app-sidebar";
import { Button } from "~/components/ui/button";

export let loader: LoaderFunction = async ({ request }) => {
    console.log(request)
    let user = await authenticator.authenticate("cage-oauth", request);

    if (!user) {
        return redirect("/login");
    }
    return redirect("/dashboard");
};

export default function DashboardLayout() {
    return (

        <>

            <AppSidebar>
                <Button onClick={(() => console.log("test"))}>Test</Button>
                <Outlet />
            </AppSidebar>
        </>

    );
}