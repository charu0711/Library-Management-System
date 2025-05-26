import { useEffect, useState } from 'react';
import axios from 'axios';


const MEMBER_ID = 2;

const MemberReserved = () => {
  const [reserved, setReserved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReserved();
  }, []);

  const fetchReserved = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:8087/api/borrowing/reservedBy/${MEMBER_ID}`);
      setReserved(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Failed to fetch reserved books.');
    } finally {
      setLoading(false);
    }
  };
  // Expose fetchReserved globally for MemberCatalog to call after borrow
  window.fetchReserved = fetchReserved;

  return (
    <div>
      <h2 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 24 }}>My Reserved Books</h2>
      <button
        onClick={fetchReserved}
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
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 24 }}>Loading...</div>
        ) : reserved.length === 0 ? (
          <div style={{ color: '#888' }}>No reserved books.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.05)' }}>
            <thead>
              <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
                <th style={{ padding: '8px 12px' }}>Title</th>
                <th style={{ padding: '8px 12px' }}>Author</th>
                <th style={{ padding: '8px 12px' }}>Reservation Date</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {reserved.map(b => (
                <tr key={b.id}>
                  <td style={{ padding: '8px 12px' }}>{b.book.title}</td>
                  <td style={{ padding: '8px 12px' }}>{b.book.author}</td>
                  <td style={{ padding: '8px 12px' }}>{b.reservationDate || '-'}</td>
                  <td style={{ padding: '8px 12px' }}>{!b.reserved && !b.reservedMember ? 'Allocated' : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
};

export default MemberReserved;
