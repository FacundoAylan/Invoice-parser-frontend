const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!VITE_API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined.");
}

const VITE_PROD_ENV: string = import.meta.env.VITE_PROD_ENV;
const VITE_API_BASE_URL_PROD: string = import.meta.env.VITE_API_BASE_URL_PROD;

if (VITE_PROD_ENV === "production" && !VITE_API_BASE_URL_PROD) {
  throw new Error("VITE_API_BASE_URL_PROD is not defined.");
}

export const API_URL =
  VITE_PROD_ENV === "production" ? VITE_API_BASE_URL_PROD : VITE_API_BASE_URL;
