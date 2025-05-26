import React, { useEffect, useState } from 'react';
import TopNavbar from '../components/TopNavbar';
import axios from 'axios';

const LibrarianBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get('http://localhost:8087/api/borrowing/all');
      setBorrowings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch borrowings");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (bookId, borrowingId) => {
    if (!window.confirm('Mark this book as returned?')) return;
    try {
      await axios.put(`http://localhost:8087/api/borrowing/return/${bookId}/${borrowingId}`);
      setAlert('Book marked as returned!');
      fetchBorrowings();
      setTimeout(() => setAlert(''), 2000);
    } catch (err) {
      setError('Failed to return book.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0eafc 0%,#1e90ff 100%)' }}>
      <TopNavbar />
      <div style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,144,255,0.08)', padding: '2.5rem' }}>
        <h2 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 24 }}>All Borrowings</h2>
        {alert && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: 8, marginBottom: 16 }}>{alert}</div>}
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 24 }}>Loading...</div>
        ) : borrowings.length === 0 ? (
          <div style={{ color: '#888' }}>No borrowings found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.05)' }}>
            <thead>
              <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
                <th style={{ padding: '8px 12px' }}>Borrowing ID</th>
                <th style={{ padding: '8px 12px' }}>Book Title</th>
                <th style={{ padding: '8px 12px' }}>Member Name</th>
                <th style={{ padding: '8px 12px' }}>Borrowed Date</th>
                <th style={{ padding: '8px 12px' }}>Due Date</th>
                <th style={{ padding: '8px 12px' }}>Returned</th>
                <th style={{ padding: '8px 12px' }}>Fine Amount</th>
                <th style={{ padding: '8px 12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.map(b => (
                <tr key={b.id}>
                  <td style={{ padding: '8px 12px' }}>{b.id}</td>
                  <td style={{ padding: '8px 12px' }}>{b.book?.title || '-'}</td>
                  <td style={{ padding: '8px 12px' }}>{b.member?.name || '-'}</td>
                  <td style={{ padding: '8px 12px' }}>{b.borrowingDate || '-'}</td>
                  <td style={{ padding: '8px 12px' }}>{b.dueDate || '-'}</td>
                  <td style={{ padding: '8px 12px' }}>{b.returnDate ? 'Yes' : 'No'}</td>
                  <td style={{ padding: '8px 12px' }}>{b.fineAmount ? `₹${b.fineAmount}` : '-'}</td>
                  <td style={{ padding: '8px 12px' }}>
                    {!b.returnDate ? (
                      <button onClick={() => handleReturn(b.book.id, b.id)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 16px', cursor: 'pointer', fontWeight: 600 }}>
  Mark as Returned
</button>
                    ) : (
                      <span style={{ background: '#2e7d32', color: '#fff', borderRadius: 6, padding: '4px 16px', fontWeight: 700 }}>
  Returned!
</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LibrarianBorrowings;
