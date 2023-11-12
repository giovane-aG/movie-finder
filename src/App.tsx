import "./App.css";
import { getMovies } from "./apis/omdb-api.ts";
import MovieCard from "./components/MovieCard.tsx";
import moviesReducer from "./reducers/app.reducer.ts";
import SearchIcon from "./search.svg";

import React, { useEffect, useState, useReducer } from "react";

function App() {
  const [movies, dispatch] = useReducer(moviesReducer, []);
  const [searchTerm, setSearchTerm] = useState<string>("Batman");

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchMovies = async (title?: string) => {
    const movies = await getMovies(title);
    dispatch({
      type: "setMovies",
      movies: movies.Search,
    });
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={updateSearchTerm}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <div className="container">
        {movies?.length ? (
          movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
