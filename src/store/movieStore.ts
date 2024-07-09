import { searchMovies } from "@/lib/api";
import { Movie } from "@/lib/schemas";
import { create } from "zustand";

interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  isLoading: false,
  error: null,
  search: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const result = await searchMovies(query);
      if (result.Search) {
        set({ movies: result.Search, isLoading: false });
      } else {
        set({
          error: result.Error || "No results found",
          isLoading: false,
          movies: [],
        });
      }
    } catch (err) {
      set({
        error: "Failed to fetch movies. Please try again.",
        isLoading: false,
        movies: [],
      });
    }
  },
}));
