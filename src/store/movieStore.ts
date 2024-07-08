import { searchMovies } from "@/lib/api";
import { Movie } from "@/lib/schemas";
import { create } from "zustand";

interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  search: (query: string, apiKey: string) => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  isLoading: false,
  error: null,
  search: async (query, apiKey) => {
    set({ isLoading: true, error: null });
    try {
      const result = await searchMovies(query, apiKey);
      set({ movies: result.Search, isLoading: false });
    } catch (err) {
      set({
        error: "Failed to fetch movies. Please try again.",
        isLoading: false,
      });
    }
  },
}));
