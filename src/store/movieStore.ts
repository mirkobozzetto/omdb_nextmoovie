import { searchMovies, searchMoviesAdvanced } from "@/lib/api";
import { Movie } from "@/lib/schemas";
import { AdvancedSearchParams } from "@/types/types";
import { create } from "zustand";

interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  lastSearchParams: string | AdvancedSearchParams;
  search: (params: string | AdvancedSearchParams) => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  isLoading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  search: async (params) => {
    set({ isLoading: true, error: null, movies: [], currentPage: 1 });
    try {
      let result;
      if (typeof params === "string") {
        result = await searchMovies(params);
      } else {
        result = await searchMoviesAdvanced({ ...params, page: 1 });
      }
      if (result.Search) {
        set({
          movies: result.Search,
          isLoading: false,
          totalResults: parseInt(result.totalResults || "0"),
        });
      } else {
        set({
          error: result.Error || "No results found",
          isLoading: false,
          movies: [],
          totalResults: 0,
        });
      }
    } catch (err) {
      set({
        error: "Failed to fetch movies. Please try again.",
        isLoading: false,
        movies: [],
        totalResults: 0,
      });
    }
  },
  loadMore: async () => {
    const { movies, currentPage, isLoading, totalResults } = get();
    if (isLoading || movies.length >= totalResults) return;

    set({ isLoading: true });
    const nextPage = currentPage + 1;
    try {
      const result = await searchMoviesAdvanced({
        ...get().lastSearchParams,
        page: nextPage,
      });
      if (result.Search) {
        set({
          movies: [...movies, ...result.Search],
          isLoading: false,
          currentPage: nextPage,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      set({
        error: "Failed to load more movies. Please try again.",
        isLoading: false,
      });
    }
  },
}));
