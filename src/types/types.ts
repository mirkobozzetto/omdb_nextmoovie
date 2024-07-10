export interface AdvancedSearchParams {
  title: string;
  year?: string;
  type?: "movie" | "series" | "episode";
  country?: string;
  imdbRating?: string;
  resultsPerPage: number;
}
