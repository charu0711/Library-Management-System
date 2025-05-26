const MemberDashboard = () => {
  return (
    <div>
      <h2 style={{ color: '#1e90ff', fontWeight: 700, marginBottom: 20 }}>Welcome to the Member Portal</h2>
      <div style={{ fontSize: 18, marginBottom: 24, color: '#444' }}>
        Here you can search, borrow, and reserve books, and track your library activities.
      </div>
      <div style={{ background: '#f5faff', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px rgba(30,144,255,0.07)', color: '#333' }}>
        <h3 style={{ color: '#1e90ff', fontWeight: 600, marginBottom: 12 }}>Library Book Borrowing Rules</h3>
        <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 16 }}>
          <li>Members can borrow up to <b>3 books</b> at a time.</li>
          <li>The borrowing period for each book is <b>14 days</b>.</li>
          <li>Books must be returned on or before the due date to avoid fines.</li>
          <li>Overdue books incur a fine of <b>₹10 per day</b>.</li>
          <li>Books can be reserved if they are currently borrowed by someone else.</li>
          <li>Reserved books must be collected within <b>3 days</b> of notification, or the reservation will be cancelled.</li>
          <li>Members are responsible for any damage or loss of borrowed books.</li>
        </ul>
      </div>
    </div>
  );
};

export default MemberDashboard;
