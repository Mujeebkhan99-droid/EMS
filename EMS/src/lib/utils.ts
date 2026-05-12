import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn (Class Name) utility function:
 * Ye function Tailwind classes ko merge karta hy aur 
 * conflicts (e.g., 'p-2' vs 'p-4') ko sahi se handle karta hy.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Currency Formatter:
 * Salary records ko '$5,000' ki tarah format karny ke liye.
 */
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Date Formatter:
 * Database ki date ko readable banany ke liye.
 */
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}