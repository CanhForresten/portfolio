import { useState, useEffect } from "react";
import "./App.css";
import Søg from "./komponenter/søg";
import Spinner from "./komponenter/Spinner";
import MovieCard from "./komponenter/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input to prevent API call on every key press
  useDebounce(() => setDebouncedSearch(search), 500, [search]);

  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      console.log(`Fetching movies from: ${endpoint}`);
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("No movies found");
      }
      const data = await response.json();
      console.log('API response data:', data);

      if (data.results.length === 0) {
        setErrorMessage("No movies found");
        setMovies([]);
        return;
      }

      setMovies(data.results || []);
    } catch (error) {
      console.error(error);
      setErrorMessage("No movies found. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Debounced search:', debouncedSearch);
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero" />
            <h1>
              Find <span className="text-gradient">film</span> du vil nyde uden
              besvær
            </h1>
          </header>
          <Søg search={search} setSearch={setSearch} />
          <section className="all-movies">
            <h2 className="mt-[20px]">Alle Film</h2>
            {loading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;