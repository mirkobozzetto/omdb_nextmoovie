import { AdvancedSearchParams } from "@/types/types";
import {
  MovieDetail,
  MovieDetailSchema,
  SearchResult,
  SearchResultSchema,
} from "./schemas";

export async function searchMovies(query: string): Promise<SearchResult> {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return SearchResultSchema.parse(data);
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetail> {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
  );
  const data = await response.json();
  return MovieDetailSchema.parse(data);
}

export async function searchMoviesAdvanced(
  params: AdvancedSearchParams & { page: number }
): Promise<SearchResult> {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const queryParams = new URLSearchParams({
    apikey: apiKey || "",
    s: params.title,
    page: params.page.toString(),
  });

  if (params.year) queryParams.append("y", params.year);
  if (params.type) queryParams.append("type", params.type);
  if (params.country) queryParams.append("country", params.country);

  const response = await fetch(`http://www.omdbapi.com/?${queryParams}`);
  const data = await response.json();
  return SearchResultSchema.parse(data);
}
