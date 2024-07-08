"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MovieList } from "@/components/MovieList";
import { SearchBar } from "@/components/SearchBar";
import { useApiKey } from "@/hooks/useApiKey";
import { useMovieStore } from "@/store/movieStore";

export default function Home() {
  const apiKey = useApiKey();
  const search = useMovieStore((state) => state.search);

  const handleSearch = (query: string) => {
    if (apiKey) {
      search(query, apiKey);
    }
  };

  return (
    <main className="mx-auto p-4 container">
      <SearchBar onSearch={handleSearch} />
      <LoadingIndicator />
      <ErrorDisplay />
      <MovieList />
    </main>
  );
}
