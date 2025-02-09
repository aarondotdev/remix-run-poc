import React from 'react'
import { AppSidebar } from '../components/shared/app-sidebar'
import { Outlet } from '@remix-run/react'
import { SidebarProvider } from '~/components/ui/sidebar'
import { json, LoaderFunction, redirect } from '@remix-run/node';
import { authenticator, getUser } from '~/services/auth';
import { getSession } from '~/services/session';
import { authenticate } from '~/services/actions';

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const user = session.get("user");
    if (!user) {
        return redirect("/login");
    }
    
    return json({ user });
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