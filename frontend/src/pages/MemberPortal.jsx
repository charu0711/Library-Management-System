import { Outlet, NavLink } from 'react-router-dom';
import MemberNavbar from '../components/MemberNavbar';

const MemberPortal = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0eafc 0%,#1e90ff 100%)' }}>
      <MemberNavbar />
      <div style={{ maxWidth: 1100, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,144,255,0.08)', padding: '2.5rem' }}>

        <Outlet />
      </div>
    </div>
  );
};

export default MemberPortal;
