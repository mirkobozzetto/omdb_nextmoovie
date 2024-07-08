import { SearchResultSchema } from "./schemas";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export async function searchMovies(query: string) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return SearchResultSchema.parse(data);
}
