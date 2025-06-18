import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./MovieModal.css";

const MovieModal = ({show, onClose, movie}) => {
    const [trailerKey, setTrailerKey] = useState(null);
    const api = `api_key=${import.meta.env.VITE_API_KEY}`;

    // Fetch videos for movie
    useEffect(() => {
        if (!movie) return;

        const fetchVid = async () => {
            try {
                const videoDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?${api}`);
                const trailer = videoDetails.data.results.find(
                    (vid) => vid.type === "Trailer" && vid.site === "YouTube");
                setTrailerKey(trailer?.key || null);
            } catch (err) {
                console.error("Error fetching trailer: ", err);
            }
        };
        fetchVid();
    }, [movie]);

    if (!show) return null; // make sure a modal has been clicked
    if (!movie) { // make sure the movie info has been updated
        return <p>Loading...</p>;
    }
    return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>&times;</button>
            <div className="inner-modal">
                <h1 className="title">{movie.title}</h1>
                <div className="modal-body">
                    {movie.backdrop_path ? (
                        <img className="modal-img" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                    ) :(
                        <img className="modal-img" src="src/assets/backdrop_not_available.webp" alt={movie.title} />
                    )}
                    <div className="modal-details">
                        <p className="run-time">
                            <strong>Run Time</strong><br />{movie.runtime} minutes
                        </p>
                        <p>
                            <strong>Genres</strong><br />
                            {movie.genres.map((g) => g.name).join(", ")}    
                        </p> 
                        <p className="release-date">
                            <strong>Release Date</strong><br />{movie.release_date}
                        </p>
                    </div>
                    <div className="overview">
                        <p className="overview-name">
                            <strong>Overview</strong>
                        </p>
                        {movie.overview ? (
                            <p className="overview-content">
                                {movie.overview}
                            </p>
                        ) : (
                            <p className="overview-content">
                                No outline available
                            </p>
                        )}
                        
                    </div>
                    <div className="trailer">
                        <h3>Trailer</h3>
                        {trailerKey ? ( // checks if theres a trailerkey available
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                    ) : (
                    <p>No trailer available</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default MovieModal;