import  { useEffect, useState } from 'react';
import axios from 'axios';
import TopNavbar from '../components/TopNavbar';


const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch total books count
        const booksCountRes = await axios.get('http://localhost:8087/api/book/count');
        setTotalBooks(booksCountRes.data.count || 0);
      } catch (err) {
        setError('Failed to fetch total books.');
      }

      try {
        // Fetch total members count
        const membersCountRes = await axios.get('http://localhost:8087/api/member/count');
        setTotalMembers(membersCountRes.data.count || 0);
      } catch (err) {
        setError('Failed to fetch total members.');
      }

      try {
        // Fetch recent books
        const recentBooksRes = await axios.get('http://localhost:8087/api/book/recent?limit=5');
        setRecentBooks(Array.isArray(recentBooksRes.data) ? recentBooksRes.data : []);
      } catch (err) {
        setError('Failed to fetch recent books.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)' }}>
      <TopNavbar />
      <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,144,255,0.08)', padding: '2.5rem' }}>
        <div style={{ background: '#e0eafc', borderRadius: 14, padding: '1.5rem 2rem', textAlign: 'center', marginBottom: 32, fontSize: '1.25rem', fontWeight: 600, color: '#1e90ff', boxShadow: '0 2px 12px rgba(30,144,255,0.07)' }}>
          Welcome <span style={{ color: '#222' }}>Charulatha</span> <span style={{ color: '#666', fontWeight: 400 }}>(Librarian)</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: 32, justifyContent: 'center' }}>
          <div style={{ flex: 1, background: '#e0eafc', borderRadius: 14, padding: '2rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(30,144,255,0.07)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1e90ff' }}>{loading ? '...' : totalBooks}</div>
            <div style={{ fontSize: '1.15rem', color: '#333', marginTop: 8 }}>Total Books</div>
          </div>
          <div style={{ flex: 1, background: '#e0eafc', borderRadius: 14, padding: '2rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(30,144,255,0.07)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1e90ff' }}>{loading ? '...' : totalMembers}</div>
            <div style={{ fontSize: '1.15rem', color: '#333', marginTop: 8 }}>Total Members</div>
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 16 }}>Recently Added Books</h3>
          {recentBooks.length === 0 ? (
            <div style={{ color: '#888' }}>No recent books found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.05)' }}>
              <thead>
                <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
                  <th style={{ padding: '8px 12px' }}>Title</th>
                  <th style={{ padding: '8px 12px' }}>Author</th>
                  <th style={{ padding: '8px 12px' }}>Genre</th>
                  <th style={{ padding: '8px 12px' }}>Published Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBooks.map(book => (
                  <tr key={book.id}>
                    <td style={{ padding: '8px 12px' }}>{book.title}</td>
                    <td style={{ padding: '8px 12px' }}>{book.author}</td>
                    <td style={{ padding: '8px 12px' }}>{book.genre}</td>
                    <td style={{ padding: '8px 12px' }}>{book.publishedDate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      </div>
    </div>
  );
};

export default Dashboard;
