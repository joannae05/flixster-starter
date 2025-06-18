import React from "react";
import ReactDOM from "react-dom";
import './MovieCard.css';

function MovieCard({title, imgPath, rating, onClick}) {
    return (
        <>
            <div className="card" onClick={onClick}>
                {imgPath ? (
                    <img className="card-img" src={`https://image.tmdb.org/t/p/w500${imgPath}`} alt={title} />
                ) :(
                    <img className="card-img" src="src/assets/poster_not_available.png" alt={title} />
                )}
                <h2>
                    {title}
                </h2>
                <p className="card-rating">
                    Rating: {rating}
                </p>
            </div>
        </>
    );
}

export default MovieCard;