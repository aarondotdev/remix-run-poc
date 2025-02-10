import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import lodash from "lodash";

const { isNil } = lodash;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayValueOrDash(value: string | number) {
  return isNil(value) ? "-" : value;
}
