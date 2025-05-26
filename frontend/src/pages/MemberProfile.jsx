
import { useEffect, useState } from 'react';
import axios from 'axios';

const MemberProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded memberId as per your other member pages
    const memberId = 2;
    axios.get(`http://localhost:8087/api/member/profile/${memberId}`)
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)' }}>
      <div style={{ maxWidth: 420, width: '100%', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(30,144,255,0.12)', padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18,
            boxShadow: '0 2px 12px rgba(30,144,255,0.12)'
          }}>
            <span style={{ fontSize: 56, color: '#fff' }} role="img" aria-label="profile">👤</span>
          </div>
          <h2 style={{ color: '#185a9d', fontWeight: 700, marginBottom: 6, fontSize: 28 }}>{profile.name}</h2>
          <span style={{ color: '#888', fontSize: 16 }}>{profile.email}</span>
        </div>
        <div style={{ borderTop: '1px solid #e0eafc', paddingTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 22, color: '#1976d2', marginRight: 10 }} role="img" aria-label="phone">📞</span>
            <span style={{ color: '#333', fontWeight: 500 }}>Phone:</span>
            <span style={{ marginLeft: 8, color: '#444' }}>{profile.phoneNumber}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 22, color: '#1976d2', marginRight: 10 }} role="img" aria-label="address">🏠</span>
            <span style={{ color: '#333', fontWeight: 500 }}>Address:</span>
            <span style={{ marginLeft: 8, color: '#444' }}>{profile.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 22, color: '#1976d2', marginRight: 10 }} role="img" aria-label="calendar">📅</span>
            <span style={{ color: '#333', fontWeight: 500 }}>Join Date:</span>
            <span style={{ marginLeft: 8, color: '#444' }}>{profile.joinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
