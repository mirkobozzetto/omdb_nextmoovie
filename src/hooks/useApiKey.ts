export function useApiKey() {
  return process.env.NEXT_PUBLIC_OMDB_API_KEY || "";
}
