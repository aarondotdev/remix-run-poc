import React from "react";
import { AppSidebar } from "../components/shared/app-sidebar";
import {
  Outlet,
  ShouldRevalidateFunction,
  useLoaderData,
} from "@remix-run/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { getPermissions, getUser } from "@/services/auth";
import { getSession } from "@/services/session";
import { NuqsAdapter } from "nuqs/adapters/remix";
import UserProvider from "@/context/user-provider";
import { API_BASE_URL, authenticate } from "@/services/authenticate";
import EnvironmentProvider from "@/context/environment-provider";
import { Toaster } from "@/components/ui/toaster";

// export const shouldRevalidate: ShouldRevalidateFunction = ({
//   currentUrl,
//   nextUrl,
//   defaultShouldRevalidate,
// }) => {
//   // if (currentUrl.pathname !== nextUrl.pathname) return true;
//   if ( currentUrl.searchParams.get("session") !== nextUrl.searchParams.get("session")) return true;
//   return defaultShouldRevalidate;
// };

export const shouldRevalidate = () => false;

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = await authenticate(request, session);

  if (!user) {
    return redirect("/login");
  }

  const permissions = await getPermissions(user);
  const data = {
    ...user,
    permissions: permissions?.data.map((item: any) => item.name),
  };

  const env = {
    API_BASE_URL: API_BASE_URL,
  };

  return json(
    { data, env },
    {
      headers: {
        "Cache-Control": "public, max-age=3600", // Cache for an hour
      },
    }
  );
};

function layout() {
  const { data, env } = useLoaderData<typeof loader>();

  return (
    <NuqsAdapter>
      <Toaster />
      <UserProvider data={data}>
        <EnvironmentProvider data={env}>
          <SidebarProvider>
            <AppSidebar>
              <Outlet />
            </AppSidebar>
          </SidebarProvider>
        </EnvironmentProvider>
      </UserProvider>
    </NuqsAdapter>
  );
}

export default layout;
