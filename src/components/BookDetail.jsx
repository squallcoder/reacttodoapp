const BookDetail = ({ book, onBack }) => {
  const getCoverUrl = (coverId, size = 'L') => {
    if (!coverId) return null
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
  }

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author'
    return authors.map(author => author.author?.name || author.name || author).join(', ')
  }

  const formatDate = (date) => {
    if (!date) return 'Unknown'
    return new Date(date).getFullYear()
  }

  const formatDescription = (description) => {
    if (!description) return 'No description available.'
    
    // Handle both string and object descriptions
    if (typeof description === 'string') {
      return description
    } else if (description.value) {
      return description.value
    } else if (description.type === '/type/text') {
      return description.value || 'No description available.'
    }
    
    return 'No description available.'
  }

  return (
    <div className="book-detail">
      <button onClick={onBack} className="back-button">
        ← Back to Search
      </button>

      <div className="book-detail-content">
        <div className="book-detail-header">
          <div className="book-detail-cover">
            {book.covers && book.covers.length > 0 ? (
              <img 
                src={getCoverUrl(book.covers[0])} 
                alt={book.title}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div className="book-cover-placeholder large">
              📚
            </div>
          </div>

          <div className="book-detail-info">
            <h1 className="book-detail-title">{book.title}</h1>
            
            {book.authors && book.authors.length > 0 && (
              <p className="book-detail-author">
                by {formatAuthors(book.authors)}
              </p>
            )}

            <div className="book-detail-meta">
              {book.first_publish_date && (
                <p><strong>First Published:</strong> {formatDate(book.first_publish_date)}</p>
              )}
              
              {book.number_of_pages_median && (
                <p><strong>Pages:</strong> {book.number_of_pages_median}</p>
              )}

              {book.languages && book.languages.length > 0 && (
                <p><strong>Languages:</strong> {book.languages.join(', ')}</p>
              )}
            </div>

            {book.author_info && (
              <div className="author-info">
                <h3>About the Author</h3>
                <p>{book.author_info.name}</p>
                {book.author_info.bio && (
                  <p>{book.author_info.bio.value || book.author_info.bio}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="book-detail-body">
          <div className="book-description">
            <h3>Description</h3>
            <p>{formatDescription(book.description)}</p>
          </div>

          {book.subjects && book.subjects.length > 0 && (
            <div className="book-subjects">
              <h3>Subjects</h3>
              <div className="subjects-grid">
                {book.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {book.excerpts && book.excerpts.length > 0 && (
            <div className="book-excerpts">
              <h3>Excerpts</h3>
              {book.excerpts.map((excerpt, index) => (
                <blockquote key={index} className="excerpt">
                  <p>{excerpt.excerpt}</p>
                  {excerpt.author && <cite>— {excerpt.author}</cite>}
                </blockquote>
              ))}
            </div>
          )}

          <div className="book-actions">
            <a 
              href={`https://openlibrary.org${book.key}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button primary"
            >
              View on Open Library
            </a>
            
            {book.covers && book.covers.length > 0 && (
              <a 
                href={getCoverUrl(book.covers[0], 'L')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-button"
              >
                View Cover
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail 