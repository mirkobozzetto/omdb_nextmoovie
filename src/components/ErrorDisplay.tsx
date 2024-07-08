import { useMovieStore } from "@/store/movieStore";

export function ErrorDisplay() {
  const error = useMovieStore((state) => state.error);

  if (!error) return null;
  return <p className="text-red-500">{error}</p>;
}
