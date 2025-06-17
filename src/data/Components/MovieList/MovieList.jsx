import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import './MovieList.css';
import MovieCard from "../MovieCard/MovieCard";

function MovieList({searchQuery}) {
        const [movies, setMovies] = useState([]);
        const [page, setPage] = useState(1);
        const [selectedMovie, setSelectedMovie] = useState(null);
        const [showModal, setShowModal] = useState(false);
        const [url, setURL] = useState("https://api.themoviedb.org/3/movie/now_playing?include_adult=false&")
        // let baseURL = "https://api.themoviedb.org/3/movie/now_playing?"
        const api = `api_key=${import.meta.env.VITE_API_KEY}`

        // Fetching movie data from the TMDb API, the [] makes sure it calls once only on initial rendering
        useEffect(() => {
            const fetchList = async () => { try {
                                                const { data } = await axios.get(`${url}${api}`);
                                                setMovies(data.results);
                                                console.log(data.results);
                                            } catch (err) {
                                                console.error("Error fetching list: ", err);}};
            fetchList();
        }, []);

        // Load more functionality
        useEffect(() => {
            const fetchList = async () => { try {
                                                const { data } = await axios.get(`${url}${api}&page=${page}`);
                                                setMovies([...movies, ...data.results]);
                                                console.log(data.results);
                                            } catch (err) {
                                                console.error("Error fetching list: ", err);}};
            fetchList();
        }, [page]);

        const loadMore = () => {
            setPage(page + 1);
        }

        // Search functionality
        useEffect(() => {
            const fetchList = async () => { try {
                                                let thisURL;
                                                if (!searchQuery) {
                                                    thisURL = "https://api.themoviedb.org/3/movie/now_playing?include_adult=false&";
                                                } else {
                                                    thisURL = "https://api.themoviedb.org/3/search/movie?include_adult=false&";
                                                }
                                                setURL(thisURL);
                                                const { data } = await axios.get(`${thisURL}${api}&query=${searchQuery}`);
                                                setMovies(data.results);
                                                console.log(data.results);
                                            } catch (err) {
                                                console.error("Error fetching list: ", err);}};
            fetchList();
        }, [searchQuery]);

        // clear button


        // //2 when card clicked, fetch details & open modal
        // const handleCardClick = async (name) => {
        //     setShowModal(true);
        //     setSelectedPokemon(null); //trigger the loading state
        //     try {
        //     const { data } = await axios.get(
        //         `https://pokeapi.co/api/v2/pokemon/${name}`
        //     );
        //     setSelectedPokemon(data);
        //     } catch (err) {
        //     console.error(`Error fetching ${name}: `, err);
        //     }
        // };

        // //3 close modal
        // const handleClose = () => {
        //     setShowModal(false);
        //     setSelectedPokemon(null);
        // };

        return (
            <>
                <div className="movie-list">
                    {movies.map((m) => (
                    // Looping through the fetched data and creating a MovieCard component for each individual movie
                    <MovieCard
                        key={m.id}
                        title={m.title} 
                        img={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                        rating={m.vote_average}
                        // onClick={() => handleCardClick(p.name)}
                    />
                    ))}
                </div>
                <button id="load-more-btn" onClick={loadMore}>Load More...</button>
        </>
    );
}

export default MovieList;