import { useState } from 'react'

const BookSearch = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    onClear()
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    
    // Generate simple suggestions based on input
    if (value.length > 2) {
      const commonTerms = [
        'fiction', 'non-fiction', 'science', 'history', 'romance',
        'mystery', 'fantasy', 'biography', 'philosophy', 'poetry',
        'children', 'young adult', 'classic', 'modern', 'contemporary'
      ]
      
      const filtered = commonTerms.filter(term => 
        term.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    setSuggestions([])
    onSearch(suggestion)
  }

  return (
    <div className="book-search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for books, authors, or subjects..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍 Search
          </button>
          {query && (
            <button type="button" onClick={handleClear} className="clear-button">
              ✕ Clear
            </button>
          )}
        </div>
        
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>
      
      <div className="search-tips">
        <p>💡 Search tips:</p>
        <ul>
          <li>Try searching by author name (e.g., "J.K. Rowling")</li>
          <li>Search by genre (e.g., "science fiction", "mystery")</li>
          <li>Use specific subjects (e.g., "World War II", "quantum physics")</li>
          <li>Search by book title or series name</li>
        </ul>
      </div>
    </div>
  )
}

export default BookSearch 