import { useMovieStore } from "@/store/movieStore";

export function MovieList() {
  const movies = useMovieStore((state) => state.movies);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          {movie.Title} ({movie.Year})
        </li>
      ))}
    </ul>
  );
}
