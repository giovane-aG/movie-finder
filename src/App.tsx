import "./App.css";
import { getMovies } from "./apis/omdb-api.ts";
import MovieCard from "./components/MovieCard.tsx";
import moviesReducer from "./reducers/app.reducer.ts";
import SearchIcon from "./search.svg";

import React, { useEffect, useState, useReducer, useMemo } from "react";

function App() {
  let firstRender: boolean = true;
  const [movies, dispatch] = useReducer(moviesReducer, []);
  const [searchTerm, setSearchTerm] = useState<string>("Batman");

  const processorWorkoutSession = () => {
    console.time(processorWorkoutSession.name);
    const result = Array(10000000)
      .fill(Math.random())
      .reduce((prev, current) => prev + current, 0);
    console.timeEnd(processorWorkoutSession.name);

    return result;
  };
  const memoizedValue = useMemo(() => processorWorkoutSession, []);

  const updateSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchMovies = async (title?: string) => {
    firstRender = false;
    const movies = await getMovies(title);
    dispatch({
      type: "setMovies",
      movies: movies.Search,
    });
  };

  useEffect(() => {
    if (firstRender) {
      console.log(movies.length);
      searchMovies("Batman");
      processorWorkoutSession();
    }
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
