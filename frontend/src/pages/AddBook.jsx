import React, { useState } from 'react';
import TopNavbar from '../components/TopNavbar';
import axios from 'axios';

const GENRES = [
  'Science Fiction', 'Biography', 'Romance', 'Fantasy', 'History', 'Mystery', 'Thriller', 'Non-fiction', 'Children', 'Other'
];

const AddBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: GENRES[0],
    publishedDate: '',
    available: true
  });
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAlert("");
    try {
      // Use librarianId=1 as a placeholder, adjust as needed
      // Sequential API call (only one here, but pattern matches your request)
      await axios.post('http://localhost:8087/api/book/add/1', form);
      setAlert('Book added successfully!');
      setForm({ title: '', author: '', isbn: '', genre: GENRES[0], publishedDate: '', available: true });
      setTimeout(() => setAlert(''), 2000);
    } catch (err) {
      setError('Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0eafc 0%,#1e90ff 100%)' }}>
      <TopNavbar />
      <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,144,255,0.08)', padding: '2.5rem' }}>
        <h2 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 24 }}>Add Book</h2>
        {alert && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: 8, marginBottom: 16 }}>{alert}</div>}
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>Title:</label><br />
            <input name="title" value={form.title} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>Author:</label><br />
            <input name="author" value={form.author} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>ISBN:</label><br />
            <input name="isbn" value={form.isbn} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>Genre:</label><br />
            <select name="genre" value={form.genre} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 500 }}>Published Date:</label><br />
            <input name="publishedDate" value={form.publishedDate} onChange={handleChange} type="date" required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 500 }}>Available:</label>
            <input name="available" type="checkbox" checked={form.available} onChange={handleChange} style={{ marginLeft: 12 }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#1e90ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 17, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
