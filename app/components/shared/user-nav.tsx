"use client";
import { Form, Link, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserIcon } from "lucide-react";
import { useUserContext } from "~/context/user-provider";

export function UserNav() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/token/revoke", {
        method: "POST",
      });
    } catch {
    } finally {
    }
    setIsLoading(false);
  };

  const user = useUserContext();
  const submit = useSubmit();
  const handleLogout = () => {
    submit(null, { method: "post", action: "/auth/logout" });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            {user?.user?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/profile">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/">
                Landing Page
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuSeparator />

          <Form method="post" action="/auth/logout">
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </Form>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
