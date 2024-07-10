"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieList } from "@/components/MovieList";
import { useMovieStore } from "@/store/movieStore";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { AdvancedSearchParams } from "@/types/types";
import { AdvancedSearch } from "./AdvancedSearch";
import { SearchBar } from "./SearchBar";

export function MovieSearch() {
  const search = useMovieStore((state) => state.search);
  const movies = useMovieStore((state) => state.movies);
  const isLoading = useMovieStore((state) => state.isLoading);
  const error = useMovieStore((state) => state.error);
  const [debouncedSearch] = useDebounce(search, 500);
  const [searchParams, setSearchParams] = useState<AdvancedSearchParams>({
    title: "",
    resultsPerPage: 10,
  });

  const handleSimpleSearch = (query: string) => {
    setSearchParams((prev) => ({ ...prev, title: query }));
    debouncedSearch({ ...searchParams, title: query });
  };

  const handleAdvancedSearch = (params: AdvancedSearchParams) => {
    setSearchParams(params);
    debouncedSearch(params);
  };

  return (
    <>
      <SearchBar onSearch={handleSimpleSearch} className="mb-6" />
      <AdvancedSearch onSearch={handleAdvancedSearch} className="mb-6" />
      {isLoading && <LoadingIndicator />}
      {error && <ErrorDisplay error={error} />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
