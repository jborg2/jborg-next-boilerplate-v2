import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const copyToClipboard = (text: string): void => {
  navigator?.clipboard && navigator.clipboard.writeText(text);
};

export const getHost = (subdomain?: string, forceProduction?: boolean) => {
  const host =
    forceProduction || process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_APP_HOSTNAME
      : 'localhost:3000';
  return subdomain ? `${subdomain}.${host}` : host;
};

export const getOrigin = (subdomain?: string, forceProduction?: boolean) => {
  const hostWithMaybeSubdomain = getHost(subdomain, forceProduction);
  const schema =
    forceProduction || process.env.NODE_ENV === 'production'
      ? 'https://'
      : 'http://';
  return `${schema}${hostWithMaybeSubdomain}`;
};

export const timeout = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};