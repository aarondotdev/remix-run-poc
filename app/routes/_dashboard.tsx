import React from 'react'
import { AppSidebar } from '../components/shared/app-sidebar'
import { Outlet } from '@remix-run/react'
import { SidebarProvider } from '~/components/ui/sidebar'

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