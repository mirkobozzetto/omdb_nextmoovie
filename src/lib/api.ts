import {
  MovieDetail,
  MovieDetailSchema,
  SearchResult,
  SearchResultSchema,
} from "./schemas";

// export async function searchMovies(query: string): Promise<SearchResult> {
//   const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
//   const response = await fetch(
//     `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
//   );
//   const data = await response.json();
//   return SearchResultSchema.parse(data);
// }

export async function searchMovies(
  query: string,
  limit?: number
): Promise<SearchResult> {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
    query
  )}`;
  if (limit) {
    url += `&page=1&type=movie&limit=${limit}`; // Note: OMDB API might not support 'limit' directly
  }
  const response = await fetch(url);
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
