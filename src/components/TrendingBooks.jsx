import { useState, useEffect } from 'react'
import BookCard from './BookCard'

const TrendingBooks = ({ onBookClick }) => {
  const [trendingBooks, setTrendingBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/trending')
        const data = await response.json()
        
        if (response.ok) {
          setTrendingBooks(data.books)
        } else {
          setError(data.error || 'Failed to fetch trending books')
        }
      } catch (err) {
        setError('Failed to connect to the server')
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingBooks()
  }, [])

  if (loading) {
    return (
      <div className="trending-books">
        <h2>📚 Trending Books</h2>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading trending books...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="trending-books">
        <h2>📚 Trending Books</h2>
        <div className="error-message">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="trending-books">
      <h2>📚 Trending Books</h2>
      <p>Discover popular books from the Open Library collection</p>
      
      <div className="books-grid">
        {trendingBooks.map((book) => (
          <BookCard 
            key={book.key} 
            book={book} 
          />
        ))}
      </div>
      
      <div className="trending-info">
        <p>
          💡 <strong>Tip:</strong> Use the search bar above to find specific books, authors, or subjects. 
          You can search by title, author name, genre, or any topic that interests you!
        </p>
      </div>
    </div>
  )
}

export default TrendingBooks 