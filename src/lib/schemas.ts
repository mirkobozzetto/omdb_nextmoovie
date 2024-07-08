import { z } from "zod";

export const MovieSchema = z.object({
  Title: z.string(),
  Year: z.number(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Poster: z.string(),
  Metascore: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  imdbID: z.string(),
  Type: z.string(),
});

export const SearchResultSchema = z.object({
  Search: z.array(MovieSchema),
  totalResults: z.number(),
  Response: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;
