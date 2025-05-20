import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberDashboard = () => {
  const [borrowed, setBorrowed] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [fines, setFines] = useState(0);
  const memberId = 1; // Replace with actual logged-in member ID

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      // Fetch borrowed books using borrowing API
      const borrowedRes = await axios.get(`http://localhost:8080/api/borrowing/member/${memberId}`);
      setBorrowed(borrowedRes.data);
      // Reserved books (if you have a reservation API, otherwise keep as is)
      const reservedRes = await axios.get(`http://localhost:8080/api/members/${memberId}/reserved`);
      setReserved(reservedRes.data);
      // Fines (if you have a fines API, otherwise keep as is)
      const finesRes = await axios.get(`http://localhost:8080/api/members/${memberId}/fines`);
      setFines(finesRes.data);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  // Return book handler
  const returnBook = async (bookId, borrowingId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/borrowing/${bookId}/${borrowingId}`);
      alert(`Book returned. Fine: ₹${res.data}`);
      fetchMemberData();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };


  return (
    <div style={{ display: 'flex' }}>
      <LeftSidebar />
      <div style={{ marginLeft: 200, flex: 1 }}>
        <h2>Member Dashboard</h2>
      <div className="mb-4">
        <h5>Borrowed Books</h5>
        <ul className="list-group">
          {borrowed.length === 0 && <li className="list-group-item">None</li>}
          {borrowed.map(borrowing => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={borrowing.id}>
              <span>
                {borrowing.book.title} (Due: {borrowing.dueDate})
              </span>
              <button className="btn btn-sm btn-success" onClick={() => returnBook(borrowing.book.id, borrowing.id)}>
                Return
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h5>Reserved Books</h5>
        <ul className="list-group">
          {reserved.length === 0 && <li className="list-group-item">None</li>}
          {reserved.map(book => (
            <li className="list-group-item" key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Fines</h5>
        <div className="alert alert-warning">Total Due: ₹{fines}</div>
      </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
