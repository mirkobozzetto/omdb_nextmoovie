import { getMovieDetails } from "@/lib/api";
import { Movie } from "@/lib/schemas";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  const [movieDetails, setMovieDetails] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    movies.forEach((movie) => {
      getMovieDetails(movie.imdbID).then((details) => {
        setMovieDetails((prev) => ({ ...prev, [movie.imdbID]: details }));
      });
    });
  }, [movies]);

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => {
        const details = movieDetails[movie.imdbID];
        return (
          <div
            key={movie.imdbID}
            className="flex flex-col shadow-md p-4 border rounded-lg"
          >
            <h2 className="mb-3 font-bold text-xl">{movie.Title}</h2>
            <div className="relative mb-3 w-full aspect-[2/3]">
              {movie.Poster !== "N/A" ? (
                <Image
                  src={movie.Poster}
                  alt={`Poster for ${movie.Title}`}
                  fill
                  className="rounded-md object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-200 rounded-md w-full h-full">
                  No poster available
                </div>
              )}
            </div>
            <p>
              <strong>Year:</strong> {movie.Year}
            </p>
            <p>
              <strong>Type:</strong> {movie.Type}
            </p>
            {details && (
              <>
                <p>
                  <strong>Genre:</strong> {details.Genre}
                </p>
                <p>
                  <strong>Director:</strong> {details.Director}
                </p>
                <p>
                  <strong>Actors:</strong> {details.Actors}
                </p>
                <p>
                  <strong>Language:</strong> {details.Language}
                </p>
                <p className="mt-2">
                  <strong>Plot:</strong> {details.Plot}
                </p>
                <p className="mt-2">
                  <strong>IMDb Rating:</strong> {details.imdbRating}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
