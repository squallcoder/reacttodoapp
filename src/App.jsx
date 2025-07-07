import { useState, useEffect } from 'react'
import './App.css'
import BookSearch from './components/BookSearch'
import BookList from './components/BookList'
import TrendingBooks from './components/TrendingBooks'

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const searchBooks = async (query, page = 1) => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=20`)
      const data = await response.json()
      
      if (response.ok) {
        setSearchResults(data.books)
        setTotalResults(data.total)
        setCurrentPage(page)
        setSearchQuery(query)
      } else {
        setError(data.error || 'Failed to search books')
      }
    } catch (err) {
      setError('Failed to connect to the server')
    } finally {
      setLoading(false)
    }
  }



  const clearSearch = () => {
    setSearchResults([])
    setSearchQuery('')
    setTotalResults(0)
    setCurrentPage(1)
    setError(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Search</h1>
        <p>Discover millions of books from the Internet Archive's Open Library</p>
      </header>

      <main className="App-main">
        <BookSearch onSearch={searchBooks} onClear={clearSearch} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching for books...</p>
          </div>
        )}

        {searchResults.length > 0 ? (
          <BookList 
            books={searchResults}
            totalResults={totalResults}
            currentPage={currentPage}
            onPageChange={(page) => searchBooks(searchQuery, page)}
          />
        ) : !loading && !error && (
          <TrendingBooks />
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">Open Library</a></p>
      </footer>
    </div>
  )
}

export default App