import { useMovieStore } from "@/store/movieStore";

export function LoadingIndicator() {
  const isLoading = useMovieStore((state) => state.isLoading);

  if (!isLoading) return null;
  return <p>Loading...</p>;
}
