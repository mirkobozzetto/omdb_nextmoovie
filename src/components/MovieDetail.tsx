import { getMovieDetails } from "@/lib/api";
import type { MovieDetail } from "@/lib/schemas";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MovieDetailProps {
  imdbID: string;
}

export function MovieDetail({ imdbID }: MovieDetailProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const details = await getMovieDetails(imdbID);
        setMovie(details);
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [imdbID]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return null;

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4 font-bold text-2xl">{movie.Title}</h2>
      <div className="flex md:flex-row flex-col">
        <div className="mb-4 md:mb-0 md:w-1/3">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <Image
              src={movie.Poster}
              alt={`Poster for ${movie.Title}`}
              width={300}
              height={445}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          ) : (
            <div className="flex justify-center items-center bg-gray-200 w-[300px] h-[445px]">
              No poster available
            </div>
          )}
        </div>
        <div className="md:pl-4 md:w-2/3">
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Rated:</strong> {movie.Rated}
          </p>
          <p>
            <strong>Released:</strong> {movie.Released}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
          <p>
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <p>
            <strong>IMDb Rating:</strong> {movie.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
}
