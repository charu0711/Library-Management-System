import { useEffect, useState } from 'react';
import axios from 'axios';


const MEMBER_ID = 2;

const MemberBorrowed = () => {
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState('');

  useEffect(() => {
    fetchBorrowed();
  }, []);

  const handleReturn = async (bookId, borrowingId) => {
    try {
      await axios.put(`http://localhost:8087/api/borrowing/return/${bookId}/${borrowingId}`);
      setAlert('Book returned successfully!');
      // Reload the page after a short delay to ensure catalog updates
      setTimeout(() => {
        setAlert('');
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError('Failed to return book.' + (err.response?.data?.message ? ' ' + err.response.data.message : ''));
    }
  };

  const fetchBorrowed = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:8087/api/borrowing/member/${MEMBER_ID}`);
      setBorrowed(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Failed to fetch borrowed books.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 24 }}>My Borrowed Books</h2>
      {alert && <div style={{ color: 'green', marginBottom: 12 }}>{alert}</div>}
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>Loading...</div>
      ) : borrowed.length === 0 ? (
        <div style={{ color: '#888' }}>No borrowed books.</div>
      ) : (
        <>
          {/* Active Borrowings */}
          {borrowed.filter(b => !b.returnDate).length > 0 && (
            <>
              <h3 style={{ color: '#388e3c', fontWeight: 600, marginTop: 16 }}>Currently Borrowed</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.05)' }}>
                <thead>
                  <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
                    <th style={{ padding: '8px 12px' }}>Title</th>
                    <th style={{ padding: '8px 12px' }}>Author</th>
                    <th style={{ padding: '8px 12px' }}>Borrowed Date</th>
                    <th style={{ padding: '8px 12px' }}>Due Date</th>
                    <th style={{ padding: '8px 12px' }}>Fine</th>
                    <th style={{ padding: '8px 12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowed.filter(b => !b.returnDate).map(b => (
                    <tr key={b.id}>
                      <td style={{ padding: '8px 12px' }}>{b.book.title}</td>
                      <td style={{ padding: '8px 12px' }}>{b.book.author}</td>
                      <td style={{ padding: '8px 12px' }}>{b.borrowingDate}</td>
                      <td style={{ padding: '8px 12px' }}>{b.dueDate}</td>
                      <td style={{ padding: '8px 12px' }}>{b.fineAmount !== null && b.fineAmount !== undefined ? `₹${b.fineAmount}` : '-'}</td>
                      <td style={{ padding: '8px 12px' }}>
                        <span style={{ background: '#ffb300', color: '#fff', borderRadius: 6, padding: '4px 12px', fontWeight: 500 }}>Not Returned</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Borrowing History */}
          {borrowed.filter(b => b.returnDate).length > 0 && (
            <>
              <h3 style={{ color: '#888', fontWeight: 600, marginTop: 32 }}>Borrowing History</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f9f9f9', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.03)' }}>
                <thead>
                  <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
                    <th style={{ padding: '8px 12px' }}>Title</th>
                    <th style={{ padding: '8px 12px' }}>Author</th>
                    <th style={{ padding: '8px 12px' }}>Borrowed Date</th>
                    <th style={{ padding: '8px 12px' }}>Due Date</th>
                    <th style={{ padding: '8px 12px' }}>Fine</th>
                    <th style={{ padding: '8px 12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowed.filter(b => b.returnDate).map(b => (
                    <tr key={b.id}>
                      <td style={{ padding: '8px 12px' }}>{b.book.title}</td>
                      <td style={{ padding: '8px 12px' }}>{b.book.author}</td>
                      <td style={{ padding: '8px 12px' }}>{b.borrowingDate}</td>
                      <td style={{ padding: '8px 12px' }}>{b.dueDate}</td>
                      <td style={{ padding: '8px 12px' }}>{b.fineAmount !== null && b.fineAmount !== undefined ? `₹${b.fineAmount}` : '-'}</td>
                      <td style={{ padding: '8px 12px' }}>
                        <span style={{ background: '#bdbdbd', color: '#fff', borderRadius: 6, padding: '4px 12px', fontWeight: 500 }}>Returned</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MemberBorrowed;
