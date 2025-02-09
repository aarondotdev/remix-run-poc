import React from 'react'
import { AppSidebar } from '../components/shared/app-sidebar'
import { Outlet, useLoaderData } from '@remix-run/react'
import { SidebarProvider } from '~/components/ui/sidebar'
import { json, LoaderFunction, redirect } from '@remix-run/node';
import { getPermissions, getUser } from '~/services/auth';
import { getSession } from '~/services/session';
import { NuqsAdapter } from 'nuqs/adapters/remix'
import UserProvider from '~/context/user-provider';

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const user = session.get("user");
    if (!user) {
        return redirect("/login");
    }

    const permissions = await getPermissions(user)
    const data = {
        ...user,
        permissions: permissions?.data.map((item: any) => item.name)
    }
    return json({ data });
};

function layout() {
    const { data } = useLoaderData<typeof loader>()

    return (
        <NuqsAdapter>
            <UserProvider data={data} >
                <SidebarProvider>
                    <AppSidebar>
                        <Outlet />
                    </AppSidebar>
                </SidebarProvider>
            </UserProvider>
        </NuqsAdapter>
    )
}

export default layout