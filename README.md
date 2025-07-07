# 📚 Book Search Application

A modern web application for searching and discovering books using the Internet Archive's Open Library APIs. Built with ReactJS frontend and Flask backend.

## ✨ Features

- **🔍 Advanced Book Search**: Search by title, author, subject, or genre
- **📖 Detailed Book Information**: View comprehensive book details including descriptions, excerpts, and author information
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **🔄 Real-time Search**: Instant search results with pagination
- **📚 Trending Books**: Discover popular books when no search is active
- **🎨 Modern UI**: Glassmorphism design with smooth animations
- **📖 Book Covers**: High-quality book cover images from Open Library
- **🔗 External Links**: Direct links to Open Library for more information

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with glassmorphism effects
- **Responsive Design** - Mobile-first approach

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Requests** - HTTP library for API calls
- **Open Library API** - Internet Archive's book database

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-with-flask
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Setup Python Virtual Environment**
   ```bash
   cd api
   python -m venv venv
   ```

4. **Activate Virtual Environment**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

5. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Flask Backend**
   ```bash
   # From the root directory
   npm run api
   ```
   The API will be available at `http://localhost:5000`

2. **Start the React Frontend**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📖 Usage Guide

### Searching for Books
1. **Basic Search**: Enter any book title, author name, or subject in the search bar
2. **Advanced Search**: Use specific terms like:
   - Author names: "J.K. Rowling", "Stephen King"
   - Genres: "science fiction", "mystery", "romance"
   - Subjects: "World War II", "quantum physics"
   - Series: "Harry Potter", "Lord of the Rings"

### Viewing Book Details
1. Click on any book card to view detailed information
2. View book covers, descriptions, and author information
3. Access external links to Open Library for more details

### Navigation
- Use the search bar to find books
- Click "Clear" to reset your search
- Use pagination to browse through search results
- Click "Back to Search" to return to the main view

## 🔧 API Endpoints

The Flask backend provides the following endpoints:

- `GET /api/search?q=<query>&page=<page>&limit=<limit>` - Search for books
- `GET /api/book/<book_id>` - Get detailed book information
- `GET /api/trending` - Get trending/popular books
- `GET /api/health` - Health check endpoint

## 🎨 Features in Detail

### Search Functionality
- **Real-time suggestions** based on common search terms
- **Pagination** for large result sets
- **Error handling** for failed requests
- **Loading states** for better UX

### Book Display
- **Grid layout** for search results
- **Card-based design** with hover effects
- **Cover image fallbacks** for missing covers
- **Subject tags** for easy categorization

### Detailed Book View
- **Comprehensive information** including descriptions and excerpts
- **Author details** when available
- **External links** to Open Library
- **Responsive design** for all screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Ensure Python virtual environment is activated
   - Check if all dependencies are installed: `pip install -r requirements.txt`
   - Verify port 5000 is not in use

2. **Frontend not connecting to backend**
   - Ensure Flask server is running on port 5000
   - Check browser console for CORS errors
   - Verify API endpoints are accessible

3. **Search not working**
   - Check internet connection (required for Open Library API)
   - Verify backend is running and accessible
   - Check browser console for errors

### Development Tips

- **Hot Reload**: Both frontend and backend support hot reloading
- **API Testing**: Test API endpoints directly at `http://localhost:5000/api/health`
- **Browser DevTools**: Use for debugging frontend issues
- **Flask Debug**: Backend runs in debug mode for detailed error messages

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Open Library** - For providing the comprehensive book database API
- **Internet Archive** - For maintaining the vast collection of books
- **React Team** - For the amazing frontend framework
- **Flask Team** - For the lightweight Python web framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Verify all dependencies are properly installed
4. Ensure both frontend and backend are running

---

**Happy Book Searching! 📚✨**
