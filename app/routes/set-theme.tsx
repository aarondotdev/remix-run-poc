import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "@/services/themes";

export const action = createThemeAction(themeSessionResolver);
