import { useEffect, useState } from 'react';
import axios from 'axios';

const MEMBER_ID = 2;

const MemberCatalog = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [availability, setAvailability] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');
  const [reservedBooks, setReservedBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchReserved();
    fetchBorrowed();
  }, []);

  const fetchBorrowed = async () => {
    try {
      const res = await axios.get(`http://localhost:8087/api/borrowing/member/${MEMBER_ID}`);
      if (Array.isArray(res.data)) {
        // Only include books with active borrowings (returnDate is null)
        setBorrowedBooks(res.data.filter(b => !b.returnDate).map(b => b.book.id));
      } else {
        setBorrowedBooks([]);
      }
    } catch (err) {
      setBorrowedBooks([]);
    }
  };


  const fetchReserved = async () => {
    try {
      const res = await axios.get(`http://localhost:8087/api/borrowing/reservedBy/${MEMBER_ID}`); // Update this line if your backend endpoint changes
      if (Array.isArray(res.data)) {
        setReservedBooks(res.data.map(r => r.book.id));
      } else {
        setReservedBooks([]);
      }
    } catch (err) {
      setError('Failed to fetch reserved books.' + (err.response?.data?.message ? ' ' + err.response.data.message : ''));
      setReservedBooks([]);
    }
  };


  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:8087/api/book/all');
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(`http://localhost:8087/api/borrowing/borrow/${bookId}/${MEMBER_ID}`);
      setBorrowedBooks(prev => [...prev, bookId]); // Optimistic update
      setAlert('Book borrowed successfully!');
      fetchBooks();
      if (typeof fetchReserved === 'function') fetchReserved();
      setTimeout(() => setAlert(''), 2000);
    } catch (err) {
      setError('Failed to borrow book.' + (err.response?.data?.message ? ' ' + err.response.data.message : ''));
    }
  };

  const handleReserve = async (bookId) => {
    try {
      await axios.post(`http://localhost:8087/api/borrowing/assignReserve/${MEMBER_ID}/${bookId}`);
      setAlert('Book reserved successfully!');
      fetchReserved();
      setTimeout(() => setAlert(''), 2000);
    } catch (err) {
      setError('Failed to reserve book.');
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = search === '' || book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === '' || book.genre === genre;
    const matchesAvailability = availability === '' || (availability === 'available' ? book.available : !book.available);
    return matchesSearch && matchesGenre && matchesAvailability;
  });

  const genres = Array.from(new Set(books.map(b => b.genre)));

  return (
    <div>
      <h2 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 24 }}>Book Catalog</h2>
      {alert && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: 8, marginBottom: 16 }}>{alert}</div>}
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
        <input placeholder="Search by title or author" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 2, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
        <select value={genre} onChange={e => setGenre(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="">All Genres</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={availability} onChange={e => setAvailability(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
        <button
          onClick={() => { setSearch(''); setGenre(''); setAvailability(''); }}
          disabled={search === '' && genre === '' && availability === ''}
          style={{
            padding: '8px 18px',
            borderRadius: 6,
            border: 'none',
            background: (search === '' && genre === '' && availability === '') ? '#ccc' : '#e57373',
            color: '#fff',
            fontWeight: 600,
            cursor: (search === '' && genre === '' && availability === '') ? 'not-allowed' : 'pointer',
            marginLeft: 8
          }}
        >
          Clear
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.05)' }}>
        <thead>
          <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
            <th style={{ padding: '8px 12px' }}>Title</th>
            <th style={{ padding: '8px 12px' }}>Author</th>
            <th style={{ padding: '8px 12px' }}>Genre</th>
            <th style={{ padding: '8px 12px' }}>Published</th>
            <th style={{ padding: '8px 12px' }}>Availability</th>
            <th style={{ padding: '8px 12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>Loading...</td></tr>
          ) : filteredBooks.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>No books found.</td></tr>
          ) : filteredBooks.map(book => (
            <tr key={book.id}>
              <td style={{ padding: '8px 12px' }}>{book.title}</td>
              <td style={{ padding: '8px 12px' }}>{book.author}</td>
              <td style={{ padding: '8px 12px' }}>{book.genre}</td>
              <td style={{ padding: '8px 12px' }}>{book.publishedDate || '-'}</td>
              <td style={{ padding: '8px 12px' }}>{book.available ? 'Available' : 'Borrowed'}</td>
              <td style={{ padding: '8px 12px', display: 'flex', gap: 8 }}>
                {book.available ? (
                  <button onClick={() => handleBorrow(book.id)} style={{ background: '#1e90ff', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Borrow</button>
                ) : borrowedBooks.includes(book.id) ? (
                  <span style={{ background: '#b2dfdb', color: '#333', borderRadius: 6, padding: '4px 12px', fontWeight: 500 }}>Borrowed</span>
                ) : reservedBooks.includes(book.id) ? (
                  <span style={{ background: '#ffe082', color: '#333', borderRadius: 6, padding: '4px 12px', fontWeight: 500 }}>Reserved/Queued</span>
                ) : (
                  <button onClick={() => handleReserve(book.id)} style={{ background: '#ffe082', color: '#333', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Reserve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberCatalog;
