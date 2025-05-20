import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibrarianPanel = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showBookForm, setShowBookForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
    genre: '',
    available: true
  });
  const [formError, setFormError] = useState('');
  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8087/api/book/all');
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:8087/api/member/all');
        setMembers(res.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchBooks();
    fetchMembers();
  }, []);

const handleAddBook = async (e) => {
    e.preventDefault();
    setFormError('');
    // Basic validation
    if (!newBook.title || !newBook.author || !newBook.isbn || !newBook.publishedDate || !newBook.genre) {
      setFormError('Please fill all the fields.');
      return;
    }
    try {
      await axios.post(`http://localhost:8087/api/book/add/${librarianId}`, newBook);
      setShowBookForm(false);
      setNewBook({ title: '', author: '', isbn: '', publishedDate: '', genre: '', available: true });
    } catch (error) {
      setFormError('Failed to add book.');
      console.error('Error adding book:', error);
    }
  }
  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8087/api/book/delete/${id}`);
      let temp = [...books];
            temp = temp.filter(book => book.id !== id)
            setBooks(temp)
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  

  const [activeTab, setActiveTab] = useState('books');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)' }}>
      <div style={{ width: 220, background: '#f8f9fa', padding: '2rem 1rem', boxShadow: '2px 0 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '2rem', color: '#333', fontWeight: 700 }}>Dashboard</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            style={{
              background: activeTab === 'books' ? '#007bff' : '#fff',
              color: activeTab === 'books' ? '#fff' : '#333',
              border: '1px solid #007bff',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onClick={() => setActiveTab('books')}
          >
            Book Management
          </button>
          <button
            style={{
              background: activeTab === 'members' ? '#007bff' : '#fff',
              color: activeTab === 'members' ? '#fff' : '#333',
              border: '1px solid #007bff',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onClick={() => setActiveTab('members')}
          >
            Member Management
          </button>
          <button
            style={{
              background: activeTab === 'addbook' ? '#007bff' : '#fff',
              color: activeTab === 'addbook' ? '#fff' : '#333',
              border: '1px solid #007bff',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onClick={() => setActiveTab('addbook')}
          >
            Add Book
          </button>
        </div>
      </div>
      <div style={{ marginLeft: 220, flex: 1, padding: '40px 0' }}>
        <div className="container mt-5" style={{ maxWidth: '95vw', fontSize: '1.2rem' }}>
          <h1 className="mb-4" style={{ fontSize: '2.2rem', fontWeight: 700 }}>LIBRARIAN PANEL</h1>
          {activeTab === 'books' && (
            <div className="mb-4">
              <h5>Books Inventory</h5>
              <table className="container table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>ISBN</th>
                    <th>Published Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(book => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.publishedDate}</td>
                      <td>{book.genre}</td>
                      <td>{book.available ? 'Available' : 'Borrowed'}</td>
                      <td>
                        <button className="btn btn-sm btn-warning mx-1">Edit</button>
                        <button className="btn btn-sm btn-danger mx-1" onClick={() => deleteBook(book.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'members' && (
            <div>
              <h5>Members</h5>
              <table className="container table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.phoneNumber}</td>
                      <td>{member.address}</td>
                      <td>{member.joinDate}</td>
                      <td>
                        <button className="btn btn-sm btn-warning mx-1">Edit</button>
                        <button className="btn btn-sm btn-danger mx-1">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'addbook' && (
            <div className="card p-3 mb-4" style={{maxWidth: 600}}>
              <h5>Add New Book</h5>
              {formError && <div className="alert alert-danger py-1">{formError}</div>}
              <form onSubmit={handleAddBook}>
                <div className="mb-2">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Author</label>
                  <input type="text" className="form-control" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Genre</label>
                  <input type="text" className="form-control" value={newBook.genre} onChange={e => setNewBook({...newBook, genre: e.target.value})} />
                </div>
                <div className="mb-2">
                  <label className="form-label">ISBN</label>
                  <input type="text" className="form-control" value={newBook.isbn} onChange={e => setNewBook({...newBook, isbn: e.target.value})} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Published Date</label>
                  <input type="date" className="form-control" value={newBook.publishedDate} onChange={e => setNewBook({...newBook, publishedDate: e.target.value})} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={newBook.available ? 'available' : 'borrowed'} onChange={e => setNewBook({...newBook, available: e.target.value === 'available'})}>
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success me-2">Add Book</button>
                <button type="button" className="btn btn-secondary" onClick={()=> setShowBookForm(false)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibrarianPanel;
