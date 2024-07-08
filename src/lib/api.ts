import { SearchResultSchema } from "./schemas";

export async function searchMovies(query: string, apiKey: string) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return SearchResultSchema.parse(data);
}
