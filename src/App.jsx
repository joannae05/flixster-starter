import { useState } from 'react'
import './App.css'
import MovieList from './data/Components/MovieList/MovieList'
import Header from './data/Components/Header/Header'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (newValue) => {
        setSearchQuery(newValue);
        console.log(newValue)
    }

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery}/>
      <MovieList searchQuery={searchQuery}/>
    </div>
  )
}

export default App
