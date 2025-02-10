"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenuSkeleton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "~/components/ui/sidebar";
import { Link } from "@remix-run/react";
import { Separator } from "~/components/ui/separator";
import { NavMain } from "./nav-main";
import { navItems } from "./nav-items";
import { UserNav } from "./user-nav";
import { cn } from "~/lib/utils";
import BetrnkLogoMini from "~/assets/logo/betrnk-logo-mini.png";
import BetrnkTextLogoLight from "~/assets/logo/betrnk-logo-text-white.png";
import BetrnkTextLogoDark from "~/assets/logo/betrnk-logo-text-black.png";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();

  return (
    <React.Fragment>
      <Sidebar
        collapsible="icon"
        className="!bg-gradient-to-bl !from-[hsl(var(--sidebar-gradient-start))] !to-[hsl(var(--sidebar-gradient-end))]"
      >
        <SidebarHeader>
          <div className="hidden md:block">
            <Link to="/dashboard" className="flex items-start gap-x-2">
              <img
                src={BetrnkLogoMini}
                alt="Betrnk logo"
                width={50}
                height={50}
                className="h-auto w-[30px]"
              />

              {open && (
                <>
                  <img
                    src={BetrnkTextLogoLight}
                    alt="Betrnk logo"
                    className={cn("h-auto w-[80px] dark:block hidden")}
                  />
                  <img
                    src={BetrnkTextLogoDark}
                    alt="Betrnk logo"
                    className={cn("h-auto w-[80px] dark:hidden block")}
                  />
                </>
              )}
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent className="overflow-x-hidden">
          <NavMain navItems={navItems} />
        </SidebarContent>
        <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div className="flex items-center gap-1 px-4">
            <UserNav />
          </div>
        </header>
        {children}
      </SidebarInset>
    </React.Fragment>
  );
}
