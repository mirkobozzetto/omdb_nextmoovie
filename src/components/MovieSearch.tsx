"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieList } from "@/components/MovieList";
import { SearchBar } from "@/components/SearchBar";
import { useMovieStore } from "@/store/movieStore";
import { useDebounce } from "use-debounce";

export function MovieSearch() {
  const search = useMovieStore((state) => state.search);
  const movies = useMovieStore((state) => state.movies);
  const isLoading = useMovieStore((state) => state.isLoading);
  const error = useMovieStore((state) => state.error);
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearch = (data: { query: string; limit?: string }) => {
    if (data.query.trim()) {
      debouncedSearch(data.query);
    }
  };

  return (
    <>
      <SearchBar
        onSearch={(query) => handleSearch({ query })}
        className="mb-6"
      />
      {/* <SearchForm onSearch={handleSearch} className="mb-6" /> */}

      {isLoading && <LoadingIndicator />}
      {error && <ErrorDisplay error={error} />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
