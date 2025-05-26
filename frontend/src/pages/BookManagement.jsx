import { useEffect, useState } from 'react';
import TopNavbar from '../components/TopNavbar';
import axios from 'axios';

const GENRES = [
  'Science Fiction', 'Biography', 'Romance', 'Fantasy', 'History', 'Mystery', 'Thriller', 'Non-fiction', 'Children', 'Other'
];

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const size = 10;
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: '', genre: '' });
  const [viewBook, setViewBook] = useState(null);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      // Sequential API call (only one here, but pattern matches your request)
      const res = await axios.get('http://localhost:8087/api/book/all');
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };
  


  const startEdit = (book) => {
    setEditId(book.id);
    setEditData({ title: book.title, genre: book.genre });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ title: '', genre: '' });
  };

  const saveEdit = async (book) => {
    try {
      await axios.put(`http://localhost:8087/api/book/update/${book.id}`, {
        ...book,
        title: editData.title,
        genre: editData.genre
      });
      setAlert('Book updated successfully!');
      setTimeout(() => setAlert(''), 2000);
      fetchBooks();
      cancelEdit();
    } catch (err) {
      setError('Failed to update book');
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`http://localhost:8087/api/book/delete/${id}`);
      setAlert('Book deleted successfully!');
      setTimeout(() => setAlert(''), 2000);
      fetchBooks();
    } catch (err) {
      setError('Cannot delete this book because it is currently borrowed or has borrowing records.');
    }
  };

  // Pagination logic
  const pagedBooks = books.slice((page - 1) * size, page * size);
  const totalPages = Math.ceil(books.length / size);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0eafc 0%,#1e90ff 100%)' }}>
      <TopNavbar />
      <div style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,144,255,0.08)', padding: '2.5rem' }}>
        <h2 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 24 }}>Book Management</h2>
        <button
          onClick={fetchBooks}
          disabled={loading}
          style={{
            marginBottom: 20,
            background: '#1e90ff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 24px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            float: 'right'
          }}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
        {alert && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: 8, marginBottom: 16 }}>{alert}</div>}
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.05)' }}>
          <thead>
            <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
              <th style={{ padding: '8px 12px' }}>ID</th>
              <th style={{ padding: '8px 12px' }}>Title</th>
              <th style={{ padding: '8px 12px' }}>Author</th>
              <th style={{ padding: '8px 12px' }}>ISBN</th>
              <th style={{ padding: '8px 12px' }}>Genre</th>
              <th style={{ padding: '8px 12px' }}>Published</th>
              <th style={{ padding: '8px 12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 24 }}>Loading...</td></tr>
            ) : pagedBooks.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 24 }}>No books found.</td></tr>
            ) : pagedBooks.map(book => (
              <tr key={book.id}>
                <td style={{ padding: '8px 12px' }}>{book.id}</td>
                <td style={{ padding: '8px 12px' }}>
                  {editId === book.id ? (
                    <input value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} style={{ width: 120 }} />
                  ) : book.title}
                </td>
                <td style={{ padding: '8px 12px' }}>{book.author}</td>
                <td style={{ padding: '8px 12px' }}>{book.isbn}</td>
                <td style={{ padding: '8px 12px' }}>
                  {editId === book.id ? (
                    <select value={editData.genre} onChange={e => setEditData({ ...editData, genre: e.target.value })} style={{ width: 120 }}>
                      {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  ) : book.genre}
                </td>
                <td style={{ padding: '8px 12px' }}>{book.publishedDate || '-'}</td>
                <td style={{ padding: '8px 12px', display: 'flex', gap: 8 }}>
                  <button onClick={() => setViewBook(book)} style={{ background: '#e0eafc', color: '#1e90ff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>View</button>
                  {editId === book.id ? (
                    <>
                      <button onClick={() => saveEdit(book)} style={{ background: '#1e90ff', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Save</button>
                      <button onClick={cancelEdit} style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(book)} style={{ background: '#ffe082', color: '#333', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Edit</button>
                  )}
                  <button onClick={() => deleteBook(book.id)} style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 32 }}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            style={{ padding: '6px 18px', borderRadius: 8, background: '#1e90ff', color: '#fff', border: 'none', fontWeight: 500, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={{ fontWeight: 500 }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            style={{ padding: '6px 18px', borderRadius: 8, background: '#1e90ff', color: '#fff', border: 'none', fontWeight: 500, cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
        {/* View Modal */}
        {viewBook && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 8px 32px rgba(30,144,255,0.10)' }}>
              <h3 style={{ color: '#1e90ff', fontWeight: 700, marginBottom: 16 }}>Book Details</h3>
              <div><b>ID:</b> {viewBook.id}</div>
              <div><b>Title:</b> {viewBook.title}</div>
              <div><b>Author:</b> {viewBook.author}</div>
              <div><b>ISBN:</b> {viewBook.isbn}</div>
              <div><b>Genre:</b> {viewBook.genre}</div>
              <div><b>Published:</b> {viewBook.publishedDate || '-'}</div>
              <div><b>Available:</b> {viewBook.available ? 'Yes' : 'No'}</div>
              <button onClick={() => setViewBook(null)} style={{ marginTop: 24, background: '#1e90ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 28px', fontWeight: 500, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookManagement;
