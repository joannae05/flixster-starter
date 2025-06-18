import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal";

function MovieList({ searchQuery, sortOption }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const api = `api_key=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    const fetchList = async () => {
      try {
        let thisURL;

        if (sortOption) {
          setPage(1);
          thisURL =
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&";
        } else if (searchQuery) {
          setPage(1);
          thisURL =
            "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&";
        } else {
          thisURL =
            "https://api.themoviedb.org/3/movie/now_playing?include_adult=false&language=en-US&";
        }

        const { data } = await axios.get(
          `${thisURL}${api}&sort_by=${sortOption}&page=${page}&query=${searchQuery}`
        );

        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prev) => [...prev, ...data.results]);
        }
      } catch (err) {
        console.error("Error fetching list: ", err);
      }
    };
    fetchList();
  }, [sortOption, searchQuery, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  // Modal Functionality
  const handleCardClick = async (movie) => {
    setShowModal(true);
    setSelectedMovie(null); // trigger the loading state and clear out any previous info
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?${api}`
      );
      setSelectedMovie(data);
    } catch (err) {
      console.error(`Error fetching ${movie.title}: `, err);
    }
  };

  // Close Modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="movie-list">
        {movies.map((m) => (
          // Looping through the fetched data and creating a MovieCard component for each individual movie
          <MovieCard
            key={m.id}
            title={m.title}
            imgPath={m.poster_path}
            rating={m.vote_average}
            onClick={() => handleCardClick(m)}
          />
        ))}
      </div>
      <button id="load-more-btn" onClick={loadMore}>
        Load More...
      </button>
      <MovieModal // Modal here so that its after all the movie card components
        show={showModal}
        onClose={handleClose}
        movie={selectedMovie}
      />
    </>
  );
}

export default MovieList;
