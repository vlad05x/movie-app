import React from "react";
import "../globals.css";

interface MovieProps {
  movie: {
    kinopoiskId: number;
    nameRu: string;
    nameOriginal: string;
    posterUrl: string;
    description: string;
    year: number;
  };
}

const MovieCard: React.FC<MovieProps> = ({ movie }) => {
    console.log("Poster URL:", movie.posterUrl);
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={movie.posterUrl}
        alt={movie.nameRu}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-1">{movie.nameRu}</h2>
        <h3 className="text-md text-gray-500 italic mb-2">
          {movie.nameOriginal}
        </h3>
        <div className="text-sm text-gray-700 font-medium">
          <span className="text-gray-900">Год выпуска:</span> {movie.year}
        </div>
        <p className="text-gray-600 text-sm mb-3">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
