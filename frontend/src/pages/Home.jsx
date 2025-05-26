
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)' }}>
      <div style={{ display: 'flex', gap: '3rem', padding: '3rem', background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px rgba(30,144,255,0.10)' }}>
        {/* Librarian Card */}
        <div style={{ padding: '2.5rem 2rem', background: '#e0eafc', borderRadius: 14, boxShadow: '0 2px 12px rgba(30,144,255,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 250 }}>
          <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1e90ff', marginBottom: 16 }}>Librarian</div>
          <div style={{ color: '#333', marginBottom: 28, textAlign: 'center' }}>Manage books, members, and inventory. Access the librarian dashboard and tools.</div>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ background: '#1e90ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px rgba(30,144,255,0.08)' }}
          >
            Librarian Login
          </button>
        </div>
        {/* Member Card */}
        <div style={{ padding: '2.5rem 2rem', background: '#e0eafc', borderRadius: 14, boxShadow: '0 2px 12px rgba(30,144,255,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 250 }}>
          <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#1e90ff', marginBottom: 16 }}>Member</div>
          <div style={{ color: '#333', marginBottom: 28, textAlign: 'center' }}>Browse, borrow, and reserve books. Track your library activity in the member portal.</div>
          <button
            onClick={() => navigate('/memberportal')}
            style={{ background: '#ffe082', color: '#333', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px rgba(30,144,255,0.08)' }}
          >
            Member Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
