import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const backendUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : import.meta.env.VITE_BACKEND_LOCALHOST;