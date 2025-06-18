import { useState } from "react";
import "./App.css";
import MovieList from "./data/Components/MovieList/MovieList";
import Header from "./data/Components/Header/Header";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearchQuery = (newValue) => {
    setSearchQuery(newValue);
    console.log(newValue);
  };

  const handleSortOption = (newValue) => {
    setSortOption(newValue);
    console.log(newValue);
  };

  return (
    <div className="App">
      <Header
        setSearchQuery={handleSearchQuery}
        setSortOption={handleSortOption}
      />
      <MovieList searchQuery={searchQuery} sortOption={sortOption} />
      <footer>
        <p>&copy; 2023 Music Playlist Explorer. Joanna Echeveri Porras.</p>
      </footer>
    </div>
  );
};

export default App;
