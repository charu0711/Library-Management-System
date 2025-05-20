import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [available, setAvailable] = useState('');

  useEffect(() => {
    // Fetch all books on mount
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/book/all'); // Updated URL as per backend
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Filter/search logic (can be improved with backend support)
  const filteredBooks = books.filter(book =>
    (search === '' || book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())) &&
    (genre === '' || book.genre === genre) &&
    (available === '' || (available === 'yes' ? book.isAvailable : !book.isAvailable))
  );

  return (
    <div style={{ display: 'flex' }}>
      <LeftSidebar />
      <div style={{ marginLeft: 200, flex: 1 }}>
        <h2>Book Catalog</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Search by title or author" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">All Genres</option>
            {/* Add more genres as needed */}
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={available} onChange={e => setAvailable(e.target.value)}>
            <option value="">All</option>
            <option value="yes">Available</option>
            <option value="no">Not Available</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100" onClick={fetchBooks}>Refresh</button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.isAvailable ? 'Available' : 'Borrowed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Catalog;
