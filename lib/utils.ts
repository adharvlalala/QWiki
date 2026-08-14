import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — robust Tailwind class merging utility.
 * Combines clsx (conditional logic) with tailwind-merge (conflict resolution).
 * Essential for glassmorphism components where static Tailwind classes must
 * co-exist with dynamic Framer Motion state classes without conflicts.
 *
 * @example
 * cn("bg-white/80 backdrop-blur-xl", isActive && "border-cyan-400", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * formatDate — formats a date into a readable string using JetBrains Mono style
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

/**
 * slugify — converts a title string to a URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * truncate — truncates text to a given character limit with ellipsis
 */
export function truncate(text: string, limit = 160): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).replace(/\s+\S*$/, "") + "…";
}

/**
 * readingTime — estimates reading time in minutes
 */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * getURL — retrieves the correct site URL for Supabase redirects
 */
export function getURL(): string {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    process?.env?.VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to not have a trailing `/`.
  url = url.endsWith('/') ? url.slice(0, -1) : url;
  
  return url;
}
