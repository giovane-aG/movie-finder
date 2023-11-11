const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=8d2082d";

export const getMovies = async (title?: string) => {
  const getMoviesUrl = title ? `${API_URL}&s=${title}` : `${API_URL}`;

  const moviesRequest = await fetch(getMoviesUrl);
  return moviesRequest.json();
};
