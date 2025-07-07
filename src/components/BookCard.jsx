const BookCard = ({ book, onClick }) => {
  const getCoverUrl = (coverId) => {
    if (!coverId) return null
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
  }

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author'
    return authors.join(', ')
  }

  const formatYear = (year) => {
    if (!year) return 'Unknown Year'
    return year.toString()
  }

  const handleCardClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Open Internet Archive page in new tab
    const openLibraryUrl = `https://openlibrary.org${book.key}`
    window.open(openLibraryUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div 
      className="book-card" 
      onClick={handleCardClick}
      title="Click to view on Internet Archive"
    >
      <div className="book-cover">
        {book.cover_i ? (
          <img 
            src={getCoverUrl(book.cover_i)} 
            alt={book.title}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div className="book-cover-placeholder">
          📚
        </div>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{formatAuthors(book.author_name)}</p>
        <p className="book-year">{formatYear(book.first_publish_year)}</p>
        
        {book.number_of_pages_median && (
          <p className="book-pages">{book.number_of_pages_median} pages</p>
        )}
        
        {book.edition_count && (
          <p className="book-editions">{book.edition_count} edition{book.edition_count !== 1 ? 's' : ''}</p>
        )}
        
        {book.subject && book.subject.length > 0 && (
          <div className="book-subjects">
            {book.subject.slice(0, 3).map((subject, index) => (
              <span key={index} className="subject-tag">
                {subject}
              </span>
            ))}
            {book.subject.length > 3 && (
              <span className="subject-tag more">+{book.subject.length - 3} more</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookCard 