import React from 'react'
import { AppSidebar } from '../components/shared/app-sidebar'
import { Outlet } from '@remix-run/react'
import { SidebarProvider } from '~/components/ui/sidebar'
import { LoaderFunction, redirect } from '@remix-run/node';
import { authenticator, getUser } from '~/services/auth';
import { getSession } from '~/services/session';
import { authenticate } from '~/services/actions';


export let loader: LoaderFunction = async ({ request }) => {

    let session = await getSession(request);
    let accessToken = await authenticate(request, session);
    let user = getUser(accessToken, request)

    if (!user) {
        return redirect("/login");
    }
    return redirect("/dashboard");
};

function layout() {
    return (
        <SidebarProvider>
            <AppSidebar>
                <Outlet />
            </AppSidebar>
        </SidebarProvider>
    )
}

export default layout