import { type ActionFunction, redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const language = formData.get("language");

  if (typeof language !== "string") {
    return redirect("/");
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await i18nCookie.serialize(language),
    },
  });
};
