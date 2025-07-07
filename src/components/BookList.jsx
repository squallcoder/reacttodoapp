import BookCard from './BookCard'

const BookList = ({ books, onBookClick, totalResults, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / 20)
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div className="book-list">
      <div className="results-header">
        <h2>Search Results</h2>
        <p>Found {totalResults.toLocaleString()} books</p>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard 
            key={book.key} 
            book={book} 
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            ← Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default BookList 