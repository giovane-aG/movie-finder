const initialState = [];

const moviesReducer = (movies: [], action: any) => {
  switch (action.type) {
    case "setMovies":
      if (action?.movies?.length) return action.movies;
      return initialState;
  }
};

export default moviesReducer;
