import { MovieDetail } from "@/components/MovieDetail";
import { Movie } from "@/lib/schemas";
import Image from "next/image";
import { useState } from "react";

interface MovieListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  return (
    <div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="flex flex-col p-4 border rounded-lg cursor-pointer"
            onClick={() => setSelectedMovieId(movie.imdbID)}
          >
            <h2 className="mb-2 font-bold text-xl">{movie.Title}</h2>
            {movie.Poster !== "N/A" ? (
              <Image
                src={movie.Poster}
                alt={`Poster for ${movie.Title}`}
                width={300}
                height={445}
                className="mb-2 object-cover"
              />
            ) : (
              <div className="flex justify-center items-center bg-gray-200 mb-2 w-full h-[445px]">
                No poster available
              </div>
            )}
            <p>
              <strong>Year:</strong> {movie.Year}
            </p>
            <p>
              <strong>Type:</strong> {movie.Type}
            </p>
          </div>
        ))}
      </div>
      {selectedMovieId && (
        <div className="mt-8">
          <h3 className="mb-4 font-bold text-2xl">Movie Details</h3>
          <MovieDetail imdbID={selectedMovieId} />
        </div>
      )}
    </div>
  );
}
