import React from "react";
import ReactDOM from "react-dom";
import './MovieCard.css';

function MovieCard({title, img, rating}) {
    return (
        <>
            <div className="card">
                <img className="card-img" src={img} />
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