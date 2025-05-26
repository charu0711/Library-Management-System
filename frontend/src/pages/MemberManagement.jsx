import  { useEffect, useState } from 'react';
import TopNavbar from '../components/TopNavbar';
import axios from 'axios';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const size = 10;
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ email: '', phoneNumber: '', address: '' });
  const [viewMember, setViewMember] = useState(null);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    setError("");
    try {
      // Sequential API call (only one here, but pattern matches your request)
      const res = await axios.get('http://localhost:8087/api/member/all');
      setMembers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };


  const startEdit = (member) => {
    setEditId(member.id);
    setEditData({ email: member.email, phoneNumber: member.phoneNumber, address: member.address });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ email: '', phoneNumber: '', address: '' });
  };

  const saveEdit = async (member) => {
    try {
      await axios.put(`http://localhost:8087/api/member/update/${member.id}`, {
        ...member,
        email: editData.email,
        phoneNumber: editData.phoneNumber,
        address: editData.address
      });
      setAlert('Member updated successfully!');
      setTimeout(() => setAlert(''), 2000);
      fetchMembers();
      cancelEdit();
    } catch (err) {
      setError('Failed to update member');
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`http://localhost:8087/api/member/delete/${id}`);
      setAlert('Member deleted successfully!');
      setTimeout(() => setAlert(''), 2000);
      fetchMembers();
    } catch (err) {
      setError('Failed to delete member');
    }
  };

  // Pagination logic
  const pagedMembers = members.slice((page - 1) * size, page * size);
  const totalPages = Math.ceil(members.length / size);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0eafc 0%,#1e90ff 100%)' }}>
      <TopNavbar />
      <div style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,144,255,0.08)', padding: '2.5rem' }}>
        <h2 style={{ fontWeight: 700, color: '#1e90ff', marginBottom: 24 }}>Member Management</h2>
        {alert && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: 8, marginBottom: 16 }}>{alert}</div>}
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(30,144,255,0.05)' }}>
          <thead>
            <tr style={{ background: '#f5faff', color: '#1e90ff', fontWeight: 600 }}>
              <th style={{ padding: '8px 12px' }}>ID</th>
              <th style={{ padding: '8px 12px' }}>Name</th>
              <th style={{ padding: '8px 12px' }}>Email</th>
              <th style={{ padding: '8px 12px' }}>Phone</th>
              <th style={{ padding: '8px 12px' }}>Address</th>
              <th style={{ padding: '8px 12px' }}>Join Date</th>
              <th style={{ padding: '8px 12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 24 }}>Loading...</td></tr>
            ) : pagedMembers.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 24 }}>No members found.</td></tr>
            ) : pagedMembers.map(member => (
              <tr key={member.id}>
                <td style={{ padding: '8px 12px' }}>{member.id}</td>
                <td style={{ padding: '8px 12px' }}>{member.name}</td>
                <td style={{ padding: '8px 12px' }}>
                  {editId === member.id ? (
                    <input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} style={{ width: 140 }} />
                  ) : member.email}
                </td>
                <td style={{ padding: '8px 12px' }}>
                  {editId === member.id ? (
                    <input value={editData.phoneNumber} onChange={e => setEditData({ ...editData, phoneNumber: e.target.value })} style={{ width: 120 }} />
                  ) : member.phoneNumber}
                </td>
                <td style={{ padding: '8px 12px' }}>
                  {editId === member.id ? (
                    <input value={editData.address} onChange={e => setEditData({ ...editData, address: e.target.value })} style={{ width: 160 }} />
                  ) : member.address}
                </td>
                <td style={{ padding: '8px 12px' }}>{member.joinDate || '-'}</td>
                <td style={{ padding: '8px 12px', display: 'flex', gap: 8 }}>
                  <button onClick={() => setViewMember(member)} style={{ background: '#e0eafc', color: '#1e90ff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>View</button>
                  {editId === member.id ? (
                    <>
                      <button onClick={() => saveEdit(member)} style={{ background: '#1e90ff', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Save</button>
                      <button onClick={cancelEdit} style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(member)} style={{ background: '#ffe082', color: '#333', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Edit</button>
                  )}
                  <button onClick={() => deleteMember(member.id)} style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>Delete</button>
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
        {viewMember && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 8px 32px rgba(30,144,255,0.10)' }}>
              <h3 style={{ color: '#1e90ff', fontWeight: 700, marginBottom: 16 }}>Member Details</h3>
              <div><b>ID:</b> {viewMember.id}</div>
              <div><b>Name:</b> {viewMember.name}</div>
              <div><b>Email:</b> {viewMember.email}</div>
              <div><b>Phone:</b> {viewMember.phoneNumber}</div>
              <div><b>Address:</b> {viewMember.address}</div>
              <div><b>Join Date:</b> {viewMember.joinDate || '-'}</div>
              <button onClick={() => setViewMember(null)} style={{ marginTop: 24, background: '#1e90ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 28px', fontWeight: 500, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberManagement;
