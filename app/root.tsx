import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import i18nServer, { localeCookie } from "./modules/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";
import styles from "./tailwind.css?url";
import { themeSessionResolver } from "./services/themes";
export const handle = { i18n: ["translation"] };
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
} from "remix-themes";
import RemixIntlProvider from "./context/remix-intl-provider";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  const { getTheme } = await themeSessionResolver(request);

  return json(
    { locale, theme: getTheme() },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
}

export function Root() {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const [theme] = useTheme();

  return (
    <html
      lang={loaderData?.locale ?? "en"}
      data-theme={theme ?? ""}
      className={loaderData?.theme ?? ""}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(loaderData?.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { locale, theme } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);

  return (
    <RemixIntlProvider locale={locale}>
      <ThemeProvider
        specifiedTheme={theme}
        themeAction="/action/set-theme"
        disableTransitionOnThemeChange={true}
      >
        <Root />
      </ThemeProvider>
    </RemixIntlProvider>
  );
}
