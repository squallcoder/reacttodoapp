from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

# Open Library API base URL
OPEN_LIBRARY_BASE_URL = "https://openlibrary.org"

@app.route('/api/search', methods=['GET'])
def search_books():
    """Search for books using Open Library API"""
    query = request.args.get('q', '')
    page = request.args.get('page', 1)
    limit = request.args.get('limit', 20)
    
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    
    try:
        # Search books using Open Library API
        search_url = f"{OPEN_LIBRARY_BASE_URL}/search.json"
        params = {
            'q': query,
            'page': page,
            'limit': limit
        }
        
        response = requests.get(search_url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        # Process and format the results
        books = []
        for doc in data.get('docs', []):
            book = {
                'key': doc.get('key'),
                'title': doc.get('title'),
                'author_name': doc.get('author_name', []),
                'first_publish_year': doc.get('first_publish_year'),
                'cover_i': doc.get('cover_i'),
                'edition_count': doc.get('edition_count'),
                'number_of_pages_median': doc.get('number_of_pages_median'),
                'isbn': doc.get('isbn', []),
                'language': doc.get('language', []),
                'subject': doc.get('subject', [])
            }
            books.append(book)
        
        return jsonify({
            'books': books,
            'total': data.get('numFound', 0),
            'page': page,
            'limit': limit
        })
        
    except requests.RequestException as e:
        return jsonify({'error': f'Failed to fetch data from Open Library API: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/book/<book_id>', methods=['GET'])
def get_book_details(book_id):
    """Get detailed information about a specific book"""
    try:
        # Clean the book_id - remove leading slash if present
        if book_id.startswith('/'):
            book_id = book_id[1:]
        
        # Get book details from Open Library API
        book_url = f"{OPEN_LIBRARY_BASE_URL}/{book_id}.json"
        response = requests.get(book_url)
        response.raise_for_status()
        
        book_data = response.json()
        
        # Get author information if available
        author_info = None
        if book_data.get('authors'):
            author_key = book_data['authors'][0]['author']['key']
            author_url = f"{OPEN_LIBRARY_BASE_URL}{author_key}.json"
            author_response = requests.get(author_url)
            if author_response.status_code == 200:
                author_info = author_response.json()
        
        # Format the response
        book_details = {
            'key': book_data.get('key'),
            'title': book_data.get('title'),
            'description': book_data.get('description'),
            'first_publish_date': book_data.get('first_publish_date'),
            'number_of_pages_median': book_data.get('number_of_pages_median'),
            'subjects': book_data.get('subjects', []),
            'authors': book_data.get('authors', []),
            'author_info': author_info,
            'covers': book_data.get('covers', []),
            'languages': book_data.get('languages', []),
            'excerpts': book_data.get('excerpts', [])
        }
        
        return jsonify(book_details)
        
    except requests.RequestException as e:
        return jsonify({'error': f'Failed to fetch book details: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/trending', methods=['GET'])
def get_trending_books():
    """Get trending or popular books"""
    try:
        # Get trending books (using a popular search)
        search_url = f"{OPEN_LIBRARY_BASE_URL}/search.json"
        params = {
            'q': 'subject:fiction',
            'sort': 'rating desc',
            'limit': 5
        }
        
        response = requests.get(search_url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        books = []
        for doc in data.get('docs', []):
            book = {
                'key': doc.get('key'),
                'title': doc.get('title'),
                'author_name': doc.get('author_name', []),
                'first_publish_year': doc.get('first_publish_year'),
                'cover_i': doc.get('cover_i'),
                'rating_average': doc.get('rating_average'),
                'ratings_count': doc.get('ratings_count')
            }
            books.append(book)
        
        return jsonify({'books': books})
        
    except requests.RequestException as e:
        return jsonify({'error': f'Failed to fetch trending books: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Book Search API is running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)