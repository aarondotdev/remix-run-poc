import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useTheme } from "remix-themes";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { authenticator } from "~/services/auth";
import { getSession, commitSession } from "~/services/session";
import BetrnkLogoLight from "~/assets/logo/betrnk-logo-light@2x.png";
import BetrnkLogoDark from "~/assets/logo/betrnk-logo-dark@2x.png";
import BackgroundImage from "~/assets/images/bg.png";

export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("user")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/dashboard");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export let action: ActionFunction = async ({ request }) => {
  let user = await authenticator.authenticate("betrnk-oauth", request);
  if (user) return redirect("/dashboard");
};

function login() {
  const [theme, setTheme, { definedBy }] = useTheme();

  return (
    <div className="relative grid h-screen place-content-center">
      <img
        src={BackgroundImage}
        alt={"bg"}
        className="absolute left-0 top-0 z-1 h-screen w-full object-cover"
      />

      <div
        className={cn(
          "z-10 mx-4 w-[auto] rounded-[50px] px-4 py-10 text-center duration-300 ease-in-out sm:w-[400px] sm:border sm:border-[#dbdbdb]/5 sm:shadow-[0px_0px_15px_0px_rgba(0,0,0,0.10)] md:p-10 ",
          theme === "dark" ? "sm:bg-black" : "sm:bg-white"
        )}
      >
        <div className="">
          {theme === "dark" ? (
            <img
              src={BetrnkLogoLight}
              alt="Betrnk Logo"
              className="mx-auto w-[130px] pb-6 duration-300 ease-in-out"
            />
          ) : (
            <img
              src={BetrnkLogoDark}
              alt="Betrnk Logo"
              className="mx-auto w-[130px] pb-6 duration-300 ease-in-out"
            />
          )}
          <Form method="post">
            <Button
              type="submit"
              variant={"conicGradient"}
              className="ml-auto w-full max-w-[300px]"
            >
              Login
            </Button>
          </Form>
          <p className="mt-9 text-sm duration-300 ease-in-out md:text-base">
            By clicking continue, you agree to our
          </p>
          <p>
            <Link
              to="/terms"
              className=" text-sm text-primary duration-300 ease-in-out hover:text-primary/80 md:text-base"
            >
              Terms of Service
            </Link>
            <span className="text-sm text-black duration-300 ease-in-out md:text-base">
              {" "}
              and{" "}
            </span>
            <Link
              to="/privacy"
              className="text-sm text-primary duration-300 ease-in-out hover:text-primary/80 md:text-base"
            >
              Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default login;
