import { z } from "zod";

export const MovieSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Poster: z.string(),
});

export const SearchResultSchema = z.object({
  Search: z.array(MovieSchema).optional(),
  totalResults: z.string().optional(),
  Response: z.string(),
  Error: z.string().optional(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;
