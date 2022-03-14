import React, { useState, useEffect } from "react";
import MovieBox from "./components/MovieBox";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BeatLoader } from "react-spinners";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [releaseDates, setReleaseDates] = useState([]);

  for (let i = 0; i < movies.length; i++) {
    releaseDates.push(movies[i].release_date.slice(0, 4));
  }

  useEffect(() => {
    fetch("https://movie-task.vercel.app/api/popular?page=1")
      .then((res) => res.json())
      .then((movieData) => {
        setMovies(movieData.data.results);
        setLoading(true);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      const url = `https://movie-task.vercel.app/api/search?page=1&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.data.results);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  const filterByYearHandler = (e) => {
    let filteredMovies = movies.filter(
      (x) => e.target.value === x.release_date.slice(0, 4)
    );
    setMovies(filteredMovies);
    setReleaseDates(releaseDates);

    setLoading(true);
  };
  return (
    <>
      <NavBar
        filterByYearHandler={filterByYearHandler}
        releaseDates={releaseDates}
        query={query}
        changeHandler={changeHandler}
        searchMovie={searchMovie}
      />
      <div>
        {movies.length < 1 && (
          <div className="container text-center p-3">
            <h2 className="text-danger">!No movies found</h2>
            <a className="btn btn-md btn-secondary" href="/">
              Go to home page
            </a>
          </div>
        )}
        {loading ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox key={movieReq.id} {...movieReq} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <BeatLoader size="60" loading />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
