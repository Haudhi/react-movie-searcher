import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=1d2af9fb42878a6373f11d9e9ea0149f&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="App" onSubmit={search}>
        <h1>React Movie Searcher</h1>
        <input className="input" type="text" placeholder="type here" value={query} onChange={(e) => setQuery(e.target.value)} required />
        <button type="submit">search</button>
      </form>
      <div className="card-list">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="img" />
            <div className="details">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
