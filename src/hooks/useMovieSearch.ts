import { searchMovies } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useMovieSearch(query: string) {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
    retry: false, // Ne pas réessayer en cas d'erreur
  });
}
