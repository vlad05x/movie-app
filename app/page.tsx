"use client";
import { useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import "./globals.css";

interface Movie {
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrl: string;
  description: string;
  year: number;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortType, setSortType] = useState<'name' | 'year'>('name');

  const searchMovies = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiKey = "5e6c0efe-3e25-42c4-96dc-9716c9d67793";
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=${query}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'X-API-KEY': apiKey,
        },
      });

      const moviesWithNumberYear: Movie[] = response.data.items.map((movie: {
        kinopoiskId: number;
        nameRu: string;
        nameOriginal: string;
        posterUrl: string;
        description: string;
        year: string;
      }) => ({
        ...movie,
        year: parseInt(movie.year, 10),
      }));

      setMovies(moviesWithNumberYear);
    } catch (error) {
      console.error("Ошибка поиска фильмов", error);
    }
  };

  const sortMovies = (movies: Movie[]): Movie[] => {
    if (sortType === 'name') {
      return movies.sort((a: Movie, b: Movie) => a.nameRu.localeCompare(b.nameRu));
    } else if (sortType === 'year') {
      return movies.sort((a: Movie, b: Movie) => b.year - a.year);
    }
    return movies;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Поиск фильмов</h1>

        <form onSubmit={searchMovies} className="flex justify-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введите название фильма"
            className="border border-gray-300 p-3 rounded-l-lg w-full max-w-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Искать
          </button>
        </form>

        <div className="flex justify-center mb-6 space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="name"
              checked={sortType === 'name'}
              onChange={() => setSortType('name')}
              className="mr-2"
            />
            По названию
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="year"
              checked={sortType === 'year'}
              onChange={() => setSortType('year')}
              className="mr-2"
            />
            По году выпуска
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortMovies(movies).map((movie) => (
            <MovieCard key={movie.kinopoiskId} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
